import numpy as np
import pandas as pd
import soundfile as sf
import torch
from torch import Tensor
from torch.utils.data import Dataset

__author__ = "Hemlata Tak, Jee-weon Jung"
__email__ = "tak@eurecom.fr, jeeweon.jung@navercorp.com"


# ----------------------------------------------------
# Read our custom CSV splits (train.csv, val.csv, test.csv)
# ----------------------------------------------------
def genSpoof_list(csv_path, is_train=False, is_eval=False):
    df = pd.read_csv(csv_path)

    file_list = df["path"].tolist()

    if is_eval:
        return file_list

    labels = {row["path"]: int(row["label"]) for _, row in df.iterrows()}
    return labels, file_list


# ----------------------------------------------------
# Padding functions
# ----------------------------------------------------
def pad(x, max_len=64600):
    x_len = x.shape[0]

    if x_len == 0:
        return np.zeros(max_len, dtype=np.float32)

    if x_len >= max_len:
        return x[:max_len]

    num_repeats = int(max_len / x_len) + 1
    return np.tile(x, num_repeats)[:max_len]


def pad_random(x, max_len=64600):
    x_len = x.shape[0]

    if x_len == 0:
        return np.zeros(max_len, dtype=np.float32)

    if x_len >= max_len:
        start = np.random.randint(0, x_len - max_len + 1)
        return x[start:start + max_len]

    num_repeats = int(max_len / x_len) + 1
    return np.tile(x, num_repeats)[:max_len]


# ----------------------------------------------------
# Training Dataset
# ----------------------------------------------------
class Dataset_ASVspoof2019_train(Dataset):
    def __init__(self, list_IDs, labels, base_dir):
        self.list_IDs = list_IDs
        self.labels = labels
        self.base_dir = base_dir
        self.cut = 64600

    def __len__(self):
        return len(self.list_IDs)

    def __getitem__(self, index):
        key = self.list_IDs[index]

        audio_path = self.base_dir / key
        x, _ = sf.read(str(audio_path))

        x = pad_random(x, self.cut)
        x = Tensor(x)

        y = self.labels[key]
        return x, y


# ----------------------------------------------------
# Validation / Test Dataset
# ----------------------------------------------------
class Dataset_ASVspoof2019_devNeval(Dataset):
    def __init__(self, list_IDs, base_dir):
        self.list_IDs = list_IDs
        self.base_dir = base_dir
        self.cut = 64600

    def __len__(self):
        return len(self.list_IDs)

    def __getitem__(self, index):
        key = self.list_IDs[index]

        audio_path = self.base_dir / key
        x, _ = sf.read(str(audio_path))

        x = pad(x, self.cut)
        x = Tensor(x)

        return x, key