from pydantic import SecretStr
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    groq_api_key: SecretStr
    pinecone_api_key: SecretStr
    pinecone_index_name: str = "reusable-chatbot"
    pinecone_host: str

    class Config:
        env_file = ".env"

settings = Settings()
