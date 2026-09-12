
"""
VaaniRakshak - AASIST Training Script
Prototype Version (100-audio dataset)

This script will:
1. Load the train/validation splits.
2. Fine-tune the AASIST model.
3. Save the best model checkpoint.
"""

from pathlib import Path
import torch

# --------------------
# Project Paths
# --------------------

PROJECT_ROOT = Path(__file__).resolve().parent.parent

REAL_DIR = PROJECT_ROOT / "dataset" / "real_16k"
CLONED_DIR = PROJECT_ROOT / "dataset" / "cloned_16k"
SPLITS_DIR = PROJECT_ROOT / "dataset" / "splits"

CHECKPOINT_DIR = PROJECT_ROOT / "aasist" / "checkpoints"
LOG_DIR = PROJECT_ROOT / "aasist" / "logs"

CHECKPOINT_DIR.mkdir(parents=True, exist_ok=True)
LOG_DIR.mkdir(parents=True, exist_ok=True)

# --------------------
# Device
# --------------------

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

print(f"Using device: {DEVICE}")


# --------------------
# Prototype Training Configuration
# --------------------

CONFIG = {
    "sample_rate": 16000,
    "batch_size": 8,
    "epochs": 5,
    "learning_rate": 1e-4,
    "num_classes": 2,
}

print("\nTraining Configuration")
print("----------------------")
for key, value in CONFIG.items():
    print(f"{key}: {value}")