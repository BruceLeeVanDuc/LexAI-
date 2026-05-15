from typing import List, Optional, Literal
from pydantic import BaseModel, Field


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str


class RagRequest(BaseModel):
    question: str = Field(..., description="Câu hỏi của người dùng")
    history: Optional[List[ChatMessage]] = Field(
        default=None,
        description="Lịch sử hội thoại (tùy chọn)",
    )
    top_k: int = Field(default=5, ge=1, le=20, description="Số chunks lấy về")


class Citation(BaseModel):
    law_name: str = Field(..., description="Tên văn bản luật")
    chapter: str = Field("0", description="Số chương")
    section: str = Field("0", description="Số mục")
    article: str = Field("0", description="Số điều")
    source_file: str = Field("", description="Tên file nguồn")


class RetrievedChunk(BaseModel):
    content: str
    metadata: dict


class RagResponse(BaseModel):
    answer: str
    citations: List[Citation] = []
    retrieved_chunks: List[RetrievedChunk] = []
    latency_ms: int
