from langchain_community.embeddings.fastembed import FastEmbedEmbeddings

_embeddings = None

def get_embeddings() -> FastEmbedEmbeddings:
    global _embeddings
    if _embeddings is None:
        _embeddings = FastEmbedEmbeddings(model_name="BAAI/bge-small-en-v1.5")
    return _embeddings

def warmup_embeddings():
    emb = get_embeddings()
    emb.embed_query("warmup")
    print("✅ Embedding model ready")
