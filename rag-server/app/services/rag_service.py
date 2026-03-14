from langchain_community.vectorstores import Chroma
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader, Docx2txtLoader
from app.services.embeddings import embeddings
from app.core.config import settings
import tempfile, os

def get_vectorstore():
    return Chroma(
        persist_directory=settings.chroma_persist_dir,
        embedding_function=embeddings
    )

def ingest_document(file_bytes: bytes, filename: str) -> int:
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

    vectorstore = get_vectorstore()
    vectorstore.add_documents(chunks)
    return len(chunks)

def retrieve_context(query: str, k: int = 4) -> str:
    vectorstore = get_vectorstore()
    docs = vectorstore.similarity_search(query, k=k)
    return "\n\n".join([d.page_content for d in docs])
