from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from app.services.rag_service import ingest_document

router = APIRouter()

MAX_FILE_SIZE = 2 * 1024 * 1024  # 2MB

@router.post("/upload-doc")
async def upload_document(
    file: UploadFile = File(...),
    collection_id: str = Form(default="default"),
) -> dict[str, str]:
    filename = file.filename
    if not filename:
        raise HTTPException(status_code=400, detail="No filename provided")

    if not filename.endswith((".pdf", ".docx")):
        raise HTTPException(status_code=400, detail="Only PDF and DOCX supported")

    content = await file.read()

    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(status_code=413, detail="File too large. Max 2MB.")

    chunks = ingest_document(content, filename, collection_id)
    return {"message": f"Ingested {chunks} chunks", "collection_id": collection_id}
