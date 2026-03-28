from langchain_community.vectorstores import Chroma
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader, Docx2txtLoader
from langchain_core.documents import Document
from app.services.embeddings import get_embeddings
from app.core.config import settings
import tempfile, os


def get_vectorstore(collection_id: str = "default"):
    embeddings = get_embeddings()
    if settings.chroma_in_memory:
        return Chroma(collection_name=collection_id, embedding_function=embeddings)
    return Chroma(
        collection_name=collection_id,
        persist_directory=settings.chroma_persist_dir,
        embedding_function=embeddings,
    )


def ingest_document(file_bytes: bytes, filename: str, collection_id: str = "default") -> int:
    suffix = ".pdf" if filename.endswith(".pdf") else ".docx"
    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
        tmp.write(file_bytes)
        tmp_path = tmp.name
    try:
        loader = PyPDFLoader(tmp_path) if suffix == ".pdf" else Docx2txtLoader(tmp_path)
        docs = loader.load()
    finally:
        os.unlink(tmp_path)
    splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    chunks = splitter.split_documents(docs)
    vectorstore = get_vectorstore(collection_id)
    vectorstore.add_documents(chunks)
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
        vectorstore = get_vectorstore(collection_id)
        return vectorstore._collection.count() == 0
    except Exception:
        return True


def retrieve_context(query: str, collection_id: str = "default", k: int = 4) -> str:
    vectorstore = get_vectorstore(collection_id)
    docs = vectorstore.similarity_search(query, k=k)
    return "\n\n".join([d.page_content for d in docs])
