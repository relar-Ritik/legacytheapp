from fastapi import APIRouter, Body
from fastapi.responses import JSONResponse
import faiss
import json
import numpy as np
import markdown
from openai import OpenAI
import os
from typing import List, Dict, Any
router = APIRouter()

# ==== Load everything once ====
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


HIGH_INDEX_FILE = "./conversation_embeddings/high_quality.index"
LOW_INDEX_FILE = "./conversation_embeddings/low_quality.index"
HIGH_TEXTS_FILE = "./conversation_embeddings/high_texts.json"
LOW_TEXTS_FILE = "./conversation_embeddings/low_texts.json"

# Load FAISS indexes
high_index = faiss.read_index(HIGH_INDEX_FILE)
low_index = faiss.read_index(LOW_INDEX_FILE)

# Load texts
with open(HIGH_TEXTS_FILE, "r", encoding="utf-8") as f:
    high_texts = json.load(f)

with open(LOW_TEXTS_FILE, "r", encoding="utf-8") as f:
    low_texts = json.load(f)

# ==== Helper functions ====

def embed_query(text):
    response = client.embeddings.create(
        input=text,
        model="text-embedding-3-small"
    )
    return np.array(response.data[0].embedding, dtype=np.float32)

def search_conversations(user_query, k=1):
    query_embedding = embed_query(user_query).reshape(1, -1)

    # Search top k in both indexes
    _, high_idxs = high_index.search(query_embedding, k)
    _, low_idxs = low_index.search(query_embedding, k)

    high_results = [high_texts[i] for i in high_idxs[0]]
    low_results = [low_texts[i] for i in low_idxs[0]]

    return high_results, low_results

def format_message_history(message_history: List[Dict[str, Any]]) -> str:
    """Convert message history to a single text string for embedding."""
    formatted_text = ""
    for message in message_history:
        role = message.get("role", "")
        content = message.get("content", "")
        formatted_text += f"{role}: {content}\n"
    return formatted_text.strip()


# ==== API Route ====

@router.post("/examples")
async def get_examples(request: Dict[str, Any] = Body(...)):
    message_history = request.get("history", [])
    query_text = format_message_history(message_history)
    
    high, low = search_conversations(query_text)

    # Return JSON response with camelCase keys and array values
    return {
        "highQuality": high,
        "lowQuality": low
    }
