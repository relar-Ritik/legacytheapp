import os
import json
import numpy as np
import faiss
from tqdm import tqdm
from openai import OpenAI
import os

# ==== CONFIGURATION ====

# Set your OpenAI API key
api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key)
# Folder paths
TRANSCRIPTS_FOLDER = "./HighLowQualityCounseling/transcripts"

# Output files
HIGH_INDEX_FILE = "./conversation_embeddings/high_quality.index"
LOW_INDEX_FILE = "./conversation_embeddings/low_quality.index"
HIGH_TEXTS_FILE = "./conversation_embeddings/high_texts.json"
LOW_TEXTS_FILE = "./conversation_embeddings/low_texts.json"

# OpenAI embedding model
EMBEDDING_MODEL = "text-embedding-3-small"

# ==== EMBEDDING FUNCTION ====

def embed_texts(texts):
    """Embed a list of texts using OpenAI embeddings."""
    embeddings = []
    for text in tqdm(texts, desc="Embedding texts"):
        response = client.embeddings.create(
            input=text,
            model=EMBEDDING_MODEL
        )
        embeddings.append(np.array(response.data[0].embedding, dtype=np.float32))
    return np.array(embeddings)

# ==== LOAD CONVERSATIONS ====

def load_conversations(folder_path, prefix):
    """Load all .txt files from a folder."""
    conversations = []
    files = sorted([f for f in os.listdir(folder_path) if f.startswith(prefix)])
    for filename in files:
        with open(os.path.join(folder_path, filename), "r", encoding="utf-8") as f:
            conversations.append(f.read())
    return conversations

# ==== MAIN SCRIPT ====

def main():
    # Load conversations
    print("Loading high-quality conversations...")
    high_texts = load_conversations(TRANSCRIPTS_FOLDER, "high_")
    
    print("Loading low-quality conversations...")
    low_texts = load_conversations(TRANSCRIPTS_FOLDER, "low_")

    # Embed conversations
    print("Embedding high-quality conversations...")
    high_embeddings = embed_texts(high_texts)

    print("Embedding low-quality conversations...")
    low_embeddings = embed_texts(low_texts)

    # Build FAISS indexes
    print("Building FAISS indexes...")
    dimension = high_embeddings.shape[1]
    high_index = faiss.IndexFlatL2(dimension)
    low_index = faiss.IndexFlatL2(dimension)

    high_index.add(high_embeddings)
    low_index.add(low_embeddings)

    # Save indexes
    print("Saving FAISS indexes...")
    faiss.write_index(high_index, HIGH_INDEX_FILE)
    faiss.write_index(low_index, LOW_INDEX_FILE)

    # Save conversation texts
    print("Saving conversation texts...")
    with open(HIGH_TEXTS_FILE, "w", encoding="utf-8") as f:
        json.dump(high_texts, f, ensure_ascii=False, indent=2)

    with open(LOW_TEXTS_FILE, "w", encoding="utf-8") as f:
        json.dump(low_texts, f, ensure_ascii=False, indent=2)

    print("All done ✅")

if __name__ == "__main__":
    main()
