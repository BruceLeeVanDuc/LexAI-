import { PrismaService } from '../prisma/prisma.service';
import { AiClientService } from '../ai-client/ai-client.service';
import { SessionsService } from '../sessions/sessions.service';
import { SendMessageDto } from './dto/send-message.dto';
export declare class ChatService {
    private readonly prisma;
    private readonly ai;
    private readonly sessions;
    private readonly logger;
    constructor(prisma: PrismaService, ai: AiClientService, sessions: SessionsService);
    sendMessage(dto: SendMessageDto, userId: string): Promise<{
        sessionId: string;
        userMessage: {
            id: string;
            role: string;
            createdAt: Date;
            sessionId: string;
            content: string;
            citations: string | null;
            tokensUsed: number | null;
            latencyMs: number | null;
        };
        assistantMessage: {
            citations: import("../ai-client/dto/rag.dto").Citation[];
            id: string;
            role: string;
            createdAt: Date;
            sessionId: string;
            content: string;
            tokensUsed: number | null;
            latencyMs: number | null;
        };
        retrievedChunks: import("../ai-client/dto/rag.dto").RetrievedChunk[];
    }>;
}
