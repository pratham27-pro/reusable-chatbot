from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.rag_service import ingest_document

router = APIRouter()

@router.post("/upload-doc")
async def upload_document(file: UploadFile = File(...)):
    filename = file.filename
    if not filename or not filename.endswith((".pdf", ".docx")):
        raise HTTPException(400, "Only PDF and DOCX files supported")
    content = await file.read()
    chunks = ingest_document(content, filename)
    return {"message": f"Ingested {chunks} chunks from {filename}"}
