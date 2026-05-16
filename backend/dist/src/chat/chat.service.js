"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ChatService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const ai_client_service_1 = require("../ai-client/ai-client.service");
const sessions_service_1 = require("../sessions/sessions.service");
let ChatService = ChatService_1 = class ChatService {
    prisma;
    ai;
    sessions;
    logger = new common_1.Logger(ChatService_1.name);
    constructor(prisma, ai, sessions) {
        this.prisma = prisma;
        this.ai = ai;
        this.sessions = sessions;
    }
    async sendMessage(dto, userId) {
        let sessionId = dto.sessionId;
        if (!sessionId) {
            const newSession = await this.sessions.create(dto.question.slice(0, 60), userId);
            sessionId = newSession.id;
        }
        else {
            await this.sessions.assertOwner(sessionId, userId);
        }
        const userMsg = await this.prisma.message.create({
            data: { sessionId, role: 'user', content: dto.question },
        });
        const provider = dto.provider ?? 'gemini';
        const start = Date.now();
        const ragRes = await this.ai.rag({ question: dto.question }, provider);
        const latencyMs = Date.now() - start;
        const assistantMsg = await this.prisma.message.create({
            data: {
                sessionId,
                role: 'assistant',
                content: ragRes.answer,
                citations: JSON.stringify(ragRes.citations),
                latencyMs,
            },
        });
        await this.sessions.touch(sessionId);
        return {
            sessionId,
            userMessage: userMsg,
            assistantMessage: {
                ...assistantMsg,
                citations: ragRes.citations,
            },
            retrievedChunks: ragRes.retrieved_chunks,
        };
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = ChatService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        ai_client_service_1.AiClientService,
        sessions_service_1.SessionsService])
], ChatService);
//# sourceMappingURL=chat.service.js.map