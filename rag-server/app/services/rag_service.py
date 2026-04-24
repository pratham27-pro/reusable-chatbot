from langchain_pinecone import PineconeVectorStore
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document
from pinecone import Pinecone
from app.services.embeddings import get_embeddings
from app.core.config import settings

def get_pinecone_client() -> Pinecone:
    return Pinecone(api_key=settings.pinecone_api_key.get_secret_value())

def get_vectorstore(collection_id: str = "default") -> PineconeVectorStore:
    pc = get_pinecone_client()
    index = pc.Index(
        name=settings.pinecone_index_name,
        host=settings.pinecone_host,
    )
    return PineconeVectorStore(
        index=index,
        embedding=get_embeddings(),
        namespace=collection_id,   # ← collection_id maps to Pinecone namespace
    )

def ingest_document(file_bytes: bytes, filename: str, collection_id: str = "default") -> int:
    try:
        text = file_bytes.decode("utf-8")
    except UnicodeDecodeError:
        text = file_bytes.decode("latin-1")

    print(f"📄 {filename}: {len(text)} characters extracted")

    if not text.strip():
        print("⚠️ Empty file — nothing to ingest")
        return 0

    splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    docs = [Document(page_content=text, metadata={"source": filename})]
    chunks = splitter.split_documents(docs)

    print(f"🔪 Split into {len(chunks)} chunks")

    vectorstore = get_vectorstore(collection_id)
    vectorstore.add_documents(chunks)

    print(f"✅ Upserted {len(chunks)} chunks to namespace '{collection_id}'")
    return len(chunks)

def ingest_text(text: str, source: str = "inline", collection_id: str = "default") -> int:
    splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    docs = [Document(page_content=text, metadata={"source": source})]
    chunks = splitter.split_documents(docs)
    vectorstore = get_vectorstore(collection_id)
    vectorstore.add_documents(chunks)
    return len(chunks)

def is_collection_empty(collection_id: str = "default") -> bool:
    try:
        pc = get_pinecone_client()
        index = pc.Index(
            name=settings.pinecone_index_name,
            host=settings.pinecone_host,
        )
        stats = index.describe_index_stats()
        namespace_stats = stats.namespaces.get(collection_id)
        return namespace_stats is None or namespace_stats.vector_count == 0
    except Exception:
        return True

def retrieve_context(query: str, collection_id: str = "default", k: int = 4) -> str:
    vectorstore = get_vectorstore(collection_id)
    docs = vectorstore.similarity_search(query, k=k)
    return "\n\n".join([d.page_content for d in docs])
