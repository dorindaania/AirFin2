from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import os
from dotenv import load_dotenv
import logging

# Load Hugging Face token from .env
load_dotenv()
HF_TOKEN = os.getenv("HUGGINGFACE_TOKEN")

# Configure logging
logging.basicConfig(level=logging.INFO)

# Hugging Face model endpoint (small + reliable)
API_URL = "https://api-inference.huggingface.co/models/google/flan-t5-base"
HEADERS = {
    "Authorization": f"Bearer {HF_TOKEN}",
    "Content-Type": "application/json"
}

# FastAPI app instance
app = FastAPI()

# Enable CORS for React or any frontend at localhost:3000
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Input schema
class ChatRequest(BaseModel):
    question: str

# Query Hugging Face model
def query_model(prompt: str):
    try:
        response = requests.post(API_URL, headers=HEADERS, json={"inputs": prompt})
        logging.info(f"Model raw response: {response.text}")

        if response.status_code != 200:
            return {"answer": f"Error: Hugging Face API returned {response.status_code}"}

        data = response.json()
        if isinstance(data, list) and "generated_text" in data[0]:
            return {"answer": data[0]["generated_text"].strip()}
        elif isinstance(data, dict) and "generated_text" in data:
            return {"answer": data["generated_text"].strip()}
        elif "error" in data:
            return {"answer": f"Error from model: {data['error']}"}
        else:
            return {"answer": "Model returned an unexpected format."}

    except Exception as e:
        logging.exception("Exception while querying Hugging Face:")
        return {"answer": f"Exception occurred: {str(e)}"}

# POST endpoint for chatbot
@app.post("/chat")
async def financial_chat(req: ChatRequest):
    prompt = f"Answer this financial question clearly and accurately: {req.question}"
    return query_model(prompt)
