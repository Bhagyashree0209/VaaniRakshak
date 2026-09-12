
"""
Main script that trains, validates, and evaluates
AASIST on a custom CSV-based dataset.
"""

import argparse
import json
import os
import sys
import warnings
from importlib import import_module
from pathlib import Path
from shutil import copy
from typing import Dict, List, Union

import pandas as pd
import torch
import torch.nn as nn
from torch.utils.data import DataLoader
from torch.utils.tensorboard import SummaryWriter
from torchcontrib.optim import SWA

from data_utils import (
    Dataset_ASVspoof2019_train,
    Dataset_ASVspoof2019_devNeval,
    genSpoof_list,
)
from evaluation import calculate_tDCF_EER
from utils import create_optimizer, seed_worker, set_seed, str_to_bool

warnings.filterwarnings("ignore", category=FutureWarning)


def main(args):
    with open(args.config, "r") as f:
        config = json.load(f)

    model_config = config["model_config"]
    optim_config = config["optim_config"]
    optim_config["epochs"] = config["num_epochs"]

    set_seed(args.seed, config)

    output_dir = Path(args.output_dir)
    database_path = Path(config["database_path"])

    # CSV paths
    dev_trial_path = database_path / "splits/val.csv"
    eval_trial_path = database_path / "splits/test.csv"

    model_tag = "custom_AASIST_ep{}_bs{}".format(
        config["num_epochs"],
        config["batch_size"],
    )

    if args.comment:
        model_tag += "_" + args.comment

    model_tag = output_dir / model_tag

    model_save_path = model_tag / "weights"
    metric_path = model_tag / "metrics"
    eval_score_path = model_tag / config["eval_output"]

    os.makedirs(model_save_path, exist_ok=True)
    os.makedirs(metric_path, exist_ok=True)

    copy(args.config, model_tag / "config.conf")

    writer = SummaryWriter(model_tag)

    device = "cuda" if torch.cuda.is_available() else "cpu"

    print("Device:", device)

    if device == "cpu":
        raise ValueError("GPU not detected.")

    model = get_model(model_config, device)

    trn_loader, dev_loader, eval_loader = get_loader(
        database_path,
        args.seed,
        config,
    )

    if args.eval:
        model.load_state_dict(
            torch.load(config["model_path"], map_location=device)
        )

        produce_evaluation_file(
            eval_loader,
            model,
            device,
            eval_score_path,
            eval_trial_path,
        )

        calculate_tDCF_EER(
            cm_scores_file=eval_score_path,
            asv_score_file=database_path / config["asv_score_path"],
            output_file=model_tag / "t-DCF_EER.txt",
        )

        print("DONE")
        return

    optim_config["steps_per_epoch"] = len(trn_loader)

    optimizer, scheduler = create_optimizer(
        model.parameters(),
        optim_config,
    )

    optimizer_swa = SWA(optimizer)

    best_dev_eer = 1.0
    best_eval_eer = 100.0
    best_dev_tdcf = 0.05
    best_eval_tdcf = 1.0
    n_swa_update = 0

    f_log = open(model_tag / "metric_log.txt", "a")
    f_log.write("=" * 5 + "\n")

    for epoch in range(config["num_epochs"]):

        print("Start training epoch{:03d}".format(epoch))

        running_loss = train_epoch(
            trn_loader,
            model,
            optimizer,
            device,
            scheduler,
            config,
        )

        # Validation file generation disabled for our custom dataset

        dev_eer = running_loss
        dev_tdcf = running_loss

        print(
            "Loss:{:.5f}".format(running_loss)
        )

        writer.add_scalar("loss", running_loss, epoch)

        if best_dev_eer >= dev_eer:

            print("Best model found at epoch", epoch)

            best_dev_eer = dev_eer

            torch.save(
                model.state_dict(),
                model_save_path / "best.pth",
            )

            optimizer_swa.update_swa()
            n_swa_update += 1

    print("Training complete.")

    if n_swa_update > 0:
        optimizer_swa.swap_swa_sgd()
        optimizer_swa.bn_update(
            trn_loader,
            model,
            device=device,
        )

    torch.save(
        model.state_dict(),
        model_save_path / "swa.pth",
    )

    f_log.close()


def get_model(model_config, device):
    module = import_module(
        "models.{}".format(model_config["architecture"])
    )

    Model = getattr(module, "Model")

    model = Model(model_config).to(device)

    nb_params = sum(
        p.numel()
        for p in model.parameters()
    )

    print("no. model params:", nb_params)

    return model


def get_loader(database_path, seed, config):

    trn_database_path = database_path
    dev_database_path = database_path
    eval_database_path = database_path

    trn_list_path = database_path / "splits/train.csv"
    dev_trial_path = database_path / "splits/val.csv"
    eval_trial_path = database_path / "splits/test.csv"

    d_label_trn, file_train = genSpoof_list(trn_list_path)

    print("no. training files:", len(file_train))

    train_set = Dataset_ASVspoof2019_train(
        list_IDs=file_train,
        labels=d_label_trn,
        base_dir=trn_database_path,
    )

    gen = torch.Generator()
    gen.manual_seed(seed)

    trn_loader = DataLoader(
        train_set,
        batch_size=config["batch_size"],
        shuffle=True,
        drop_last=True,
        pin_memory=True,
        worker_init_fn=seed_worker,
        generator=gen,
    )

    _, file_dev = genSpoof_list(dev_trial_path)

    print("no. validation files:", len(file_dev))

    dev_set = Dataset_ASVspoof2019_devNeval(
        list_IDs=file_dev,
        base_dir=dev_database_path,
    )

    dev_loader = DataLoader(
        dev_set,
        batch_size=config["batch_size"],
        shuffle=False,
        drop_last=False,
        pin_memory=True,
    )

    file_eval = genSpoof_list(
        eval_trial_path,
        is_eval=True,
    )

    eval_set = Dataset_ASVspoof2019_devNeval(
        list_IDs=file_eval,
        base_dir=eval_database_path,
    )

    eval_loader = DataLoader(
        eval_set,
        batch_size=config["batch_size"],
        shuffle=False,
        drop_last=False,
        pin_memory=True,
    )

    return trn_loader, dev_loader, eval_loader


def produce_evaluation_file(
    data_loader,
    model,
    device,
    save_path,
    trial_path,
):

    model.eval()

    df = pd.read_csv(trial_path)

    fname_list = []
    score_list = []

    with torch.no_grad():

        for batch_x, utt_id in data_loader:

            batch_x = batch_x.to(device)

            _, batch_out = model(batch_x)

            batch_score = batch_out[:, 1].cpu().numpy().ravel()

            fname_list.extend(utt_id)
            score_list.extend(batch_score.tolist())

    out_df = pd.DataFrame(
        {
            "path": fname_list,
            "score": score_list,
        }
    )

    out_df.to_csv(save_path, index=False)

    print("Scores saved to", save_path)


def train_epoch(
    trn_loader,
    model,
    optim,
    device,
    scheduler,
    config,
):

    running_loss = 0
    num_total = 0

    model.train()

    weight = torch.FloatTensor([0.1, 0.9]).to(device)

    criterion = nn.CrossEntropyLoss(weight=weight)

    for batch_x, batch_y in trn_loader:

        batch_size = batch_x.size(0)
        num_total += batch_size

        batch_x = batch_x.to(device)
        batch_y = batch_y.view(-1).long().to(device)

        _, batch_out = model(
            batch_x,
            Freq_aug=str_to_bool(config["freq_aug"]),
        )

        loss = criterion(batch_out, batch_y)

        running_loss += loss.item() * batch_size

        optim.zero_grad()
        loss.backward()
        optim.step()

        if config["optim_config"]["scheduler"] in [
            "cosine",
            "keras_decay",
        ]:
            scheduler.step()

    running_loss /= num_total

    return running_loss


if __name__ == "__main__":

    parser = argparse.ArgumentParser()

    parser.add_argument(
        "--config",
        required=True,
    )

    parser.add_argument(
        "--output_dir",
        default="./exp_result",
    )

    parser.add_argument(
        "--seed",
        type=int,
        default=1234,
    )

    parser.add_argument(
        "--eval",
        action="store_true",
    )

    parser.add_argument(
        "--comment",
        default=None,
    )

    parser.add_argument(
        "--eval_model_weights",
        default=None,
    )

    main(parser.parse_args())