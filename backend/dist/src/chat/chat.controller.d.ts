import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/send-message.dto';
import { AiClientService } from '../ai-client/ai-client.service';
import type { AuthUser } from '../auth/current-user.decorator';
export declare class ChatController {
    private readonly chat;
    private readonly ai;
    constructor(chat: ChatService, ai: AiClientService);
    sendMessage(dto: SendMessageDto, user: AuthUser): Promise<{
        sessionId: number;
        userMessage: {
            id: number;
            role: string;
            createdAt: Date;
            sessionId: number;
            content: string;
            citations: string | null;
            tokensUsed: number | null;
            latencyMs: number | null;
        };
        assistantMessage: {
            citations: import("../ai-client/dto/rag.dto").Citation[];
            id: number;
            role: string;
            createdAt: Date;
            sessionId: number;
            content: string;
            tokensUsed: number | null;
            latencyMs: number | null;
        };
        retrievedChunks: import("../ai-client/dto/rag.dto").RetrievedChunk[];
    }>;
    health(): Promise<{
        backend: string;
        ai: any;
    }>;
}
