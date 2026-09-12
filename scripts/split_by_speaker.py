from pathlib import Path
import pandas as pd
import random

random.seed(42)

project_root = Path(__file__).resolve().parents[1]

metadata_dir = project_root / "dataset" / "metadata"
output_dir = project_root / "dataset" / "splits"
output_dir.mkdir(parents=True, exist_ok=True)

languages = ["hindi", "marathi", "telugu"]

for language in languages:
    df = pd.read_csv(metadata_dir / f"{language}_metadata.csv")

    speakers = df["client_id"].dropna().unique().tolist()
    random.shuffle(speakers)

    total = len(speakers)

    train_end = int(total * 0.8)
    val_end = int(total * 0.9)

    train_speakers = set(speakers[:train_end])
    val_speakers = set(speakers[train_end:val_end])
    test_speakers = set(speakers[val_end:])

    train_df = df[df["client_id"].isin(train_speakers)]
    val_df = df[df["client_id"].isin(val_speakers)]
    test_df = df[df["client_id"].isin(test_speakers)]

    train_df.to_csv(output_dir / f"{language}_train.csv", index=False)
    val_df.to_csv(output_dir / f"{language}_val.csv", index=False)
    test_df.to_csv(output_dir / f"{language}_test.csv", index=False)

    print(f"\n{language.upper()}")
    print(f" Train speakers: {len(train_speakers)}")
    print(f" Validation speakers: {len(val_speakers)}")
    print(f" Test speakers: {len(test_speakers)}")
    print(f" Train clips: {len(train_df)}")
    print(f" Validation clips: {len(val_df)}")
    print(f" Test clips: {len(test_df)}")