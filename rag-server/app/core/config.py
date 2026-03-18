from pydantic import SecretStr
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    groq_api_key: SecretStr
    chroma_persist_dir: str = "./chroma_db"
    chroma_in_memory: bool = False

    class Config:
        env_file = ".env"

settings = Settings()
