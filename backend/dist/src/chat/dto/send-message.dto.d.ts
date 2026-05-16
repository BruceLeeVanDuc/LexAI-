export type LlmProvider = 'gemini' | 'groq';
export declare class SendMessageDto {
    question: string;
    sessionId?: number;
    provider?: LlmProvider;
}
