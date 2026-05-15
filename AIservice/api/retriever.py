from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings

from config.config import CHROMA_PATH, COLLECTION_NAME, EMBEDDING_MODEL


_vectorstore = None


def get_vectorstore() -> Chroma:
    """Singleton — chỉ load model E5 một lần."""
    global _vectorstore
    if _vectorstore is None:
        embeddings = HuggingFaceEmbeddings(model_name=EMBEDDING_MODEL)
        _vectorstore = Chroma(
            persist_directory=CHROMA_PATH,
            embedding_function=embeddings,
            collection_name=COLLECTION_NAME,
        )
    return _vectorstore


def retrieve(question: str, top_k: int = 5):
    """
    Retrieve chunks from ChromaDB.
    E5 model yêu cầu "query: " prefix khi search (vì lúc lưu đã có "passage: ").
    """
    vectorstore = get_vectorstore()
    prefixed_query = f"query: {question}"
    return vectorstore.similarity_search(prefixed_query, k=top_k)
