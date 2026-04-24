from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from app.services.rag_service import ingest_document

router = APIRouter()

MAX_FILE_SIZE = 2 * 1024 * 1024  # 2MB

@router.post("/upload-doc")
async def upload_document(
    file: UploadFile = File(...),
    collection_id: str = Form(default="default"),
) -> dict[str, str]:
    filename = file.filename or ""

    if not filename:
        raise HTTPException(status_code=400, detail="No filename provided")

    if not filename.endswith(".txt"):
        raise HTTPException(
            status_code=415,
            detail="Only .txt files are supported. Convert your document to plain text first."
        )

    content = await file.read()

    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(status_code=413, detail="File too large. Max size is 2MB.")

    if not content.strip():
        raise HTTPException(status_code=400, detail="File is empty.")

    chunks = ingest_document(content, filename, collection_id)

    if chunks == 0:
        raise HTTPException(status_code=422, detail="No content could be extracted from the file.")

    return {"message": f"Ingested {chunks} chunks", "collection_id": collection_id}
