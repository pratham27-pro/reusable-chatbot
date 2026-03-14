from langchain_community.embeddings import HuggingFaceEmbeddings

# Free local embeddings - no API key needed
embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)
