from typing import AsyncIterator, Literal

from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from langchain_core.messages import AIMessage, HumanMessage, SystemMessage
from langchain_groq import ChatGroq
from pydantic import BaseModel

from app.core.config import settings
from app.services.rag_service import retrieve_context

router = APIRouter()


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str


class ChatRequest(BaseModel):
    message: str
    system_prompt: str = ""
    history: list[ChatMessage] = []
    use_knowledge_base: bool = True
    collection_id: str = "default"


@router.post("/chat")
async def chat(req: ChatRequest) -> StreamingResponse:
    context = ""
    if req.use_knowledge_base:
        context = retrieve_context(req.message, req.collection_id)

    sys_content = req.system_prompt or "You are a helpful assistant."
    if context:
        sys_content += f"\n\nUse the following context to answer:\n{context}"

    msgs: list[SystemMessage | HumanMessage | AIMessage] = [
        SystemMessage(content=sys_content)
    ]
    for h in req.history[-10:]:
        msgs.append(
            HumanMessage(content=h.content)
            if h.role == "user"
            else AIMessage(content=h.content)
        )
    msgs.append(HumanMessage(content=req.message))

    llm = ChatGroq(
        api_key=settings.groq_api_key,
        model="llama-3.3-70b-versatile",
        temperature=0.5,
        streaming=True,
    )

    async def token_generator() -> AsyncIterator[str]:
        async for chunk in llm.astream(msgs):
            if chunk.content and isinstance(chunk.content, str):
                yield chunk.content

    return StreamingResponse(token_generator(), media_type="text/plain")
