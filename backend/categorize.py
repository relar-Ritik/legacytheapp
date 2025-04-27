from fastapi import APIRouter, Form, Body
from fastapi.responses import HTMLResponse, JSONResponse
import torch
from transformers import AutoModelForSequenceClassification, AutoTokenizer

#CONFIG
MODEL_DIR = "model_weights/roberta_classification"
MODEL_NAME = "microsoft/deberta-v3-small"
MAX_LENGTH = 256


model = AutoModelForSequenceClassification.from_pretrained(MODEL_DIR)
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model.eval()


router = APIRouter()

@router.post("/categorize")
async def categorize_question(question: str = Body(..., embed=True)):
    print("Question:", question)
    inputs = tokenizer(question, return_tensors="pt", truncation=True, padding=True, max_length=MAX_LENGTH)
    with torch.no_grad():
        outputs = model(**inputs)
    logits = outputs.logits
    prediction = torch.argmax(logits, dim=-1).item()
    label = model.config.id2label[prediction]
    
    return {"category": label, "response": "Hi, looks like you are dealing with a " + label + " issue. How can I help you today?"}