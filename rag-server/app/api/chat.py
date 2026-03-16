from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from app.services.rag_service import retrieve_context
from app.services.llm_service import get_llm_response

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    system_prompt: Optional[str] = None
    history: Optional[list] = []
    use_knowledge_base: Optional[bool] = True

@router.post("/chat")
async def chat(req: ChatRequest):
    context = ""
    if req.use_knowledge_base:
        context = retrieve_context(req.message)
    response = get_llm_response(req.message, context, req.system_prompt or "", req.history or [])
    return {"response": response}
