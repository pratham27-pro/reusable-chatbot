from pydantic import SecretStr
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    groq_api_key: SecretStr
    pinecone_api_key: SecretStr
    pinecone_index_name: str = "reusbale-chatbot"
    pinecone_host: str = ""          # ← the host URL Pinecone gave you

    class Config:
        env_file = ".env"

settings = Settings()
