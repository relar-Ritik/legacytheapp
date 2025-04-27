from fastapi import APIRouter, Body, Request
from fastapi.responses import JSONResponse
import json
import os
from openai import OpenAI
from typing import List, Dict, Any

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

router = APIRouter()

@router.post("/chat")
async def chat(request: Request):
    # Print raw request body for debugging
    body = await request.body()
    print(f"Raw request body: {body}")
    
    try:
        # Parse the JSON manually
        data = json.loads(body)
        print(f"Parsed request data: {data}")
        
        message = data.get("message", "")
        category = data.get("category", "")
        history = data.get("history", [])
        
        print(f"Extracted message: {message}, category: {category}")
        print(f"Chat history length: {len(history)}")
        print(f"History: {history}")
        
        # Create a system prompt based on the category
        system_prompt = f"""You are an AI assistant providing guidance to a mental health counselor about how to respond to their patient.
        The patient's issue is related to the category: {category}.
        The counselor is describing their patient's situation and seeking advice on how to approach it.
        The first question is copy pasted from the patient's message.
        Provide professional recommendations for the counselor on:
        - How to frame responses to the patient
        - Therapeutic approaches that might be helpful for this category of issue
        - Questions the counselor might ask to better understand the patient's situation
        - Potential resources or techniques to suggest to the patient
        
        Focus on evidence-based approaches while being empathetic and supportive.
        Avoid making specific diagnoses or suggesting medications.
        Keep responses concise, to the point, and professional in tone."""
        
        # Prepare messages for the API call
        messages = [{"role": "system", "content": system_prompt}]
        
        # Add chat history - converting from {id, content, sender, timestamp} format
        for entry in history:
            if isinstance(entry, dict) and "sender" in entry and "content" in entry:
                role = "user" if entry.get("sender") == "user" else "assistant"
                messages.append({"role": role, "content": entry.get("content", "")})
        
        # Add the current message
        messages.append({"role": "user", "content": message})
        
        print(f"Sending {len(messages)} messages to OpenAI")
        
        # Call OpenAI API
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            max_tokens=500,
            temperature=0.7
        )
        
        # Extract the assistant's response
        ai_response = response.choices[0].message.content
        
        return {"response": ai_response, "category": category}
    except Exception as e:
        print(f"Error processing request: {str(e)}")
        return JSONResponse(
            status_code=400,
            content={"error": f"Bad request: {str(e)}"}
        ) 