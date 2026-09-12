from pathlib import Path
import pandas as pd

project_root = Path(__file__).resolve().parents[1]

languages = {
    "hindi": project_root / "dataset" / "downloads" / "1781715680033-cv-corpus-26.0-2026-06-12-hi" / "cv-corpus-26.0-2026-06-12" / "hi",
    "marathi": project_root / "dataset" / "downloads" / "1781715701827-cv-corpus-26.0-2026-06-12-mr" / "cv-corpus-26.0-2026-06-12" / "mr",
    "telugu": project_root / "dataset" / "downloads" / "1781705178557-cv-corpus-26.0-2026-06-12-te" / "cv-corpus-26.0-2026-06-12" / "te",
}

output_dir = project_root / "dataset" / "metadata"
output_dir.mkdir(parents=True, exist_ok=True)

for language, folder in languages.items():
    tsv_path = folder / "validated.tsv"

    df = pd.read_csv(tsv_path, sep="\t")
    df = df[["client_id", "path", "sentence"]]

    output_file = output_dir / f"{language}_metadata.csv"
    df.to_csv(output_file, index=False)

    print(f"Saved {output_file.name} ({len(df)} rows)")