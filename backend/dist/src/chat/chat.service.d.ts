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
    sendMessage(dto: SendMessageDto, userId: number): Promise<{
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
}
