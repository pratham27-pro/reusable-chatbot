from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="ChatBot RAG Server")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # lock this down in production
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health(): return {"status": "ok"}

from app.api import chat, documents
app.include_router(chat.router)
app.include_router(documents.router)
