from fastapi import FastAPI, UploadFile, File, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import os
import shutil
import asyncio

from inference import predict_audio

app = FastAPI(title="VaaniRakshak API", version="1.0")

# -----------------------------
# CORS
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# -----------------------------
# Health Check
# -----------------------------
@app.get("/")
def home():
    return {
        "message": "VaaniRakshak Backend is Running",
        "status": "healthy",
    }


# -----------------------------
# Upload Analysis
# -----------------------------
@app.post("/analyze-clip")
async def analyze_clip(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = predict_audio(file_path)
    return result


# -----------------------------
# Live Call Demo (Simulation)
# -----------------------------
@app.websocket("/ws/live")
async def live_websocket(websocket: WebSocket):
    await websocket.accept()

    dummy_scores = [12, 28, 47, 63, 81, 94]

    try:
        for score in dummy_scores:

            if score < 35:
                decision = "Proceed"
            elif score < 70:
                decision = "Call Back"
            else:
                decision = "Escalate"

            await websocket.send_json(
                {
                    "confidence": score,
                    "decision": decision,
                }
            )

            await asyncio.sleep(2)

    except WebSocketDisconnect:
        print("Live demo disconnected.")

    finally:
        await websocket.close()