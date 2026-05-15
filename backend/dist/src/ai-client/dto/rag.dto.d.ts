export interface RagChatMessage {
    role: 'user' | 'assistant';
    content: string;
}
export interface RagRequest {
    question: string;
    history?: RagChatMessage[];
    top_k?: number;
}
export interface Citation {
    law_name: string;
    chapter: string;
    section: string;
    article: string;
    source_file: string;
}
export interface RetrievedChunk {
    content: string;
    metadata: Record<string, any>;
}
export interface RagResponse {
    answer: string;
    citations: Citation[];
    retrieved_chunks: RetrievedChunk[];
    latency_ms: number;
}
