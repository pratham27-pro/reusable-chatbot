from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.services.rag_service import ingest_text, is_collection_empty
import asyncio
import os

KNOWLEDGE_FILE = os.path.join(os.path.dirname(__file__), "..", "chatkit_knowledge.md")
COLLECTION_ID = "default"

def _ingest_knowledge_base():
    if is_collection_empty(COLLECTION_ID):
        try:
            with open(KNOWLEDGE_FILE, "r", encoding="utf-8") as f:
                text = f.read()
            chunks = ingest_text(text, source="chatkit_knowledge.md", collection_id=COLLECTION_ID)
            print(f"✅ Ingested chatkit knowledge base: {chunks} chunks")
        except Exception as e:
            print(f"⚠️ Failed to ingest knowledge base: {e}")
    else:
        print("✅ Knowledge base already loaded in Pinecone, skipping")

@asynccontextmanager
async def lifespan(app: FastAPI):
    loop = asyncio.get_event_loop()
    loop.run_in_executor(None, _ingest_knowledge_base)
    yield

app = FastAPI(title="ChatBot RAG Server", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health(): return {"status": "ok"}

from app.api import chat, documents
app.include_router(chat.router)
app.include_router(documents.router)
