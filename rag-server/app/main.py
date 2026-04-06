from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.services.embeddings import warmup_embeddings
from app.services.rag_service import ingest_text, is_collection_empty
import os

KNOWLEDGE_FILE = os.path.join(os.path.dirname(__file__), "..", "chatkit_knowledge.md")
COLLECTION_ID = "default"

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Runs synchronously — server doesn't open port until both steps complete
    print("⏳ Loading embedding model...")
    warmup_embeddings()  # blocks until model is downloaded and cached

    print("⏳ Checking Pinecone knowledge base...")
    if is_collection_empty(COLLECTION_ID):
        try:
            with open(KNOWLEDGE_FILE, "r", encoding="utf-8") as f:
                text = f.read()
            chunks = ingest_text(text, source="chatkit_knowledge.md", collection_id=COLLECTION_ID)
            print(f"✅ Ingested knowledge base: {chunks} chunks")
        except Exception as e:
            print(f"⚠️ Knowledge base ingestion failed: {e}")
    else:
        print("✅ Already in Pinecone, skipping ingestion")

    yield  # ← server opens port and accepts requests only after this point

app = FastAPI(title="ChatBot RAG Server", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok"}

from app.api import chat, documents
app.include_router(chat.router)
app.include_router(documents.router)
