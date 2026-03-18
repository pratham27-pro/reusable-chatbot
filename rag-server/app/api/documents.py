from fastapi import APIRouter, File, Form, HTTPException, UploadFile

from app.services.rag_service import ingest_document

router = APIRouter()


@router.post("/upload-doc")
async def upload_document(
    file: UploadFile = File(...),
    collection_id: str = Form(default="default"),
) -> dict[str, str]:
    filename = file.filename
    if not filename:
        raise HTTPException(status_code=400, detail="No filename provided")

    if not filename.endswith((".pdf", ".docx")):
        raise HTTPException(status_code=400, detail="Only PDF and DOCX files supported")

    content = await file.read()
    chunks = ingest_document(content, filename, collection_id)
    return {"message": f"Ingested {chunks} chunks", "collection_id": collection_id}
