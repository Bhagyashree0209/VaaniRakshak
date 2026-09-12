# VaaniRakshak – AI Voice Clone Detection

> **Protect Every Voice Before You Trust It.**

VaaniRakshak is an AI-powered voice clone detection system that identifies whether an uploaded audio clip is **Real** or **AI-Generated (Cloned)** using the **AASIST (Audio Anti-Spoofing using Integrated Spectro-Temporal Graph Attention Networks)** deep learning model.

Built with a modern **Next.js frontend**, **FastAPI backend**, and deployed using **Vercel** and **Railway**, the project provides a clean, responsive interface for real-time voice authenticity analysis.

## Live Demo

**Frontend (Vercel):** https://vaani-rakshak.vercel.app

## Features

* Upload audio files for AI voice clone detection
* Supports WAV, MP3, FLAC, and OGG formats
* Real-time prediction with confidence score
* Modern responsive UI with animations
* FastAPI inference API
* Railway deployment for backend
* Vercel deployment for frontend
* Built on the AASIST anti-spoofing model

## Tech Stack

| Layer           | Technology                      |
| --------------- | ------------------------------- |
| Frontend        | Next.js 15, React, TypeScript   |
| Styling         | Tailwind CSS                    |
| Backend         | FastAPI, Uvicorn                |
| AI Model        | AASIST                          |
| ML Libraries    | PyTorch, Librosa, NumPy, Pandas |
| Deployment      | Vercel + Railway                |
| Version Control | Git & GitHub                    |

## Project Structure

```text
VaaniRakshak/
├── frontend/                 # Next.js frontend
│   ├── app/
│   ├── components/
│   ├── hooks/
│   └── public/
│
├── backend/                  # FastAPI backend
│   ├── app.py
│   ├── inference.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── aasist/                   # AASIST implementation
│   ├── models/
│   ├── checkpoints/
│   ├── config/
│   └── dataset/
│
├── VaaniRakshak_Epoch100_Backup/   # Trained model weights
├── dataset/
├── scripts/
└── docs/
```

## How It Works

1. User uploads an audio file.
2. Next.js sends the file to the FastAPI backend.
3. The backend preprocesses the audio.
4. The AASIST model extracts spectro-temporal features.
5. The model predicts whether the voice is **Real** or **Cloned**.
6. The prediction and confidence score are displayed instantly.

## Local Setup

### Prerequisites

* Node.js
* Python 3.11
* Git

### Clone the Repository

```bash
git clone https://github.com/Bhagyashree0209/VaaniRakshak.git
cd VaaniRakshak
```

### Backend Setup

```bash
cd backend

pip install -r requirements.txt

uvicorn app:app --reload
```

Backend runs at:

```text
http://127.0.0.1:8000
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```text
http://localhost:3000
```

## Environment Variables

### Frontend (Vercel)

```env
NEXT_PUBLIC_API_URL=https://your-railway-backend-url.up.railway.app
```

## API Endpoint

### POST `/analyze-clip`

Upload an audio file for prediction.

**Request**

* `multipart/form-data`
* Field: `file`

**Response**

```json
{
  "prediction": "Real",
  "confidence": 99.2,
  "filename": "sample.wav"
}
```

## Model

VaaniRakshak uses **AASIST**, a state-of-the-art anti-spoofing architecture designed for detecting synthetic speech through spectro-temporal graph attention mechanisms.

The trained Epoch-100 model is integrated into the FastAPI backend for inference.

## Deployment

| Service     | Platform |
| ----------- | -------- |
| Frontend    | Vercel   |
| Backend     | Railway  |
| Source Code | GitHub   |

## Future Improvements

* Live microphone detection
* Batch audio analysis
* Explainable AI visualizations
* Expanded multilingual dataset
* User authentication and history

## Team

Developed as an AI Voice Clone Detection project by the VaaniRakshak team.

## License

This project is intended for educational and research purposes.
