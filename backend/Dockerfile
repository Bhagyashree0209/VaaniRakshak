FROM python:3.11-slim

WORKDIR /app

# Install system dependency
RUN apt-get update && apt-get install -y ffmpeg && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend
COPY backend/ .

# Copy AASIST project
COPY aasist ./aasist

# Copy trained model
COPY VaaniRakshak_Epoch100_Backup ./VaaniRakshak_Epoch100_Backup

# Copy frontend public demo dataset
COPY frontend/public ./frontend/public

EXPOSE 8000

CMD ["sh","-c","uvicorn app:app --host 0.0.0.0 --port ${PORT:-8080}"]