from langchain_groq import ChatGroq
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage, BaseMessage
from pydantic import SecretStr
from app.core.config import settings

llm = ChatGroq(
    api_key=SecretStr(settings.groq_api_key),
    model="llama-3.3-70b-versatile",  # fix 1: `model` not `model_name`
    temperature=0.5
)

def get_llm_response(message: str, context: str, system_prompt: str, history: list) -> str:
    sys_content = system_prompt or "You are a helpful assistant."
    if context:
        sys_content += f"\n\nUse this context to answer:\n{context}"

    msgs: list[BaseMessage] = [SystemMessage(content=sys_content)]  # fix 2: typed as list[BaseMessage]
    for h in history[-6:]:
        if h["role"] == "user":
            msgs.append(HumanMessage(content=h["content"]))
        else:
            msgs.append(AIMessage(content=h["content"]))
    msgs.append(HumanMessage(content=message))

    response = llm.invoke(msgs)
    return str(response.content)  # fix 3: cast to str
