"""
Test RAG pipeline trực tiếp, không cần chạy FastAPI.
Cách dùng: python -m test_rag
"""
import json
from api.rag_chain import run_rag


def main():
    cau_hoi_test = [
        "Mức đóng bảo hiểm xã hội bắt buộc là bao nhiêu?",
        "Người lao động được nghỉ phép năm bao nhiêu ngày?",
        "Thu nhập bao nhiêu thì phải đóng thuế thu nhập cá nhân?",
    ]

    for q in cau_hoi_test:
        print("=" * 70)
        print(f"Q: {q}")
        print("-" * 70)
        result = run_rag(question=q, top_k=5)

        print(f"A: {result['answer']}\n")

        print("Citations:")
        for c in result["citations"]:
            print(f"  - {c.law_name} | Điều {c.article} | {c.source_file}")

        print("\nChunks retrieved:")
        for i, ch in enumerate(result["retrieved_chunks"], 1):
            preview = ch.content[:120].replace("\n", " ")
            print(f"  [{i}] {ch.metadata.get('source', '?')} — Điều {ch.metadata.get('article', '?')}: {preview}...")

        print()


if __name__ == "__main__":
    main()
