from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from categorize import router as categorize_router
from examples import router as examples_router
from advice import router as advice_router
from chat import router as chat_router
from summarization import router as summarization_router
from database import Base, engine
from logging_middleware import DBLoggingMiddleware
import os

# Load environment
DATABASE_URL = os.getenv("DATABASE_URL")

print("Starting FastAPI...")

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI()


# Middlewares
app.add_middleware(DBLoggingMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(categorize_router, prefix="/api")
app.include_router(examples_router, prefix="/api")
app.include_router(advice_router, prefix="/api")
app.include_router(chat_router, prefix="/api")
app.include_router(summarization_router, prefix="/api")

# Optional root route
@app.get("/")
def read_root():
    return {"message": "FastAPI backend is running"}

@app.get("/health")
@app.head("/health")
def health_check():
    return {"status": "healthy"}
