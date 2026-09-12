
import pandas as pd
import shutil
from pathlib import Path

project_root = Path(__file__).resolve().parent.parent

languages = {
    "hindi": {
        "count": 40,
        "csv": project_root / "dataset" / "splits" / "hindi_train.csv",
        "clips": project_root / "dataset" / "downloads" /
                 "1781715680033-cv-corpus-26.0-2026-06-12-hi" /
                 "cv-corpus-26.0-2026-06-12" / "hi" / "clips"
    },

    "marathi": {
        "count": 35,
        "csv": project_root / "dataset" / "splits" / "marathi_train.csv",
        "clips": project_root / "dataset" / "downloads" /
                 "1781715701827-cv-corpus-26.0-2026-06-12-mr" /
                 "cv-corpus-26.0-2026-06-12" / "mr" / "clips"
    },

    "telugu": {
        "count": 25,
        "csv": project_root / "dataset" / "splits" / "telugu_train.csv",
        "clips": project_root / "dataset" / "downloads" /
                 "1781705178557-cv-corpus-26.0-2026-06-12-te" /
                 "cv-corpus-26.0-2026-06-12" / "te" / "clips"
    }
}
subset_root = project_root / "dataset" / "subset"

for language, info in languages.items():
    df = pd.read_csv(info["csv"]).head(info["count"])
    destination = subset_root / language
    destination.mkdir(parents=True, exist_ok=True)

    copied = 0

    for filename in df["path"]:
        source_file = info["clips"] / filename
        destination_file = destination / filename

        if source_file.exists():
            shutil.copy2(source_file, destination_file)
            copied += 1

    print(f"{language.capitalize()}: Copied {copied} files")

print("\nDone! Your 100-audio subset is ready.")