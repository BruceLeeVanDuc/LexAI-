from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_core.documents import Document
from config.config import CHROMA_PATH, COLLECTION_NAME, EMBEDDING_MODEL


def get_vectorstore():
    embedding_fn = HuggingFaceEmbeddings(model_name=EMBEDDING_MODEL)
    return Chroma(
        persist_directory=CHROMA_PATH,
        embedding_function=embedding_fn,
        collection_name=COLLECTION_NAME,
    )


def add_chunks_to_db(chunks: list[Document]):
    if not chunks:
        print("Không có chunk nào để thêm.")
        return

    vectordb = get_vectorstore()

    # E5 yêu cầu prefix "passage:" khi lưu document
    docs_to_add = [
        Document(
            page_content=f"passage: {c.page_content}",
            metadata=c.metadata,
        )
        for c in chunks
    ]

    # ID gồm source + chapter + section + article + counter
    # (văn bản pháp luật VN hay lặp "Điều X" ở phụ lục → cần counter)
    seen_count = {}
    ids = []
    for c in chunks:
        base = (
            f"{c.metadata.get('source', 'unknown')}"
            f"__c{c.metadata.get('chapter', '0')}"
            f"__s{c.metadata.get('section', '0')}"
            f"__d{c.metadata.get('article', '0')}"
        )
        seen_count[base] = seen_count.get(base, 0) + 1
        if seen_count[base] > 1:
            ids.append(f"{base}__{seen_count[base]}")
        else:
            ids.append(base)

    vectordb.add_documents(documents=docs_to_add, ids=ids)
    print(f"Đã thêm/cập nhật {len(chunks)} chunks vào ChromaDB.")
