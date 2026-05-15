import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AiClientService } from '../ai-client/ai-client.service';
import { SessionsService } from '../sessions/sessions.service';
import { SendMessageDto } from './dto/send-message.dto';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly ai: AiClientService,
    private readonly sessions: SessionsService,
  ) {}

  async sendMessage(dto: SendMessageDto, userId: number) {
    // 1. Lấy hoặc tạo session
    let sessionId = dto.sessionId;
    if (!sessionId) {
      const newSession = await this.sessions.create(dto.question.slice(0, 60), userId);
      sessionId = newSession.id;
    } else {
      // Kiểm tra session thuộc về user này
      await this.sessions.assertOwner(sessionId, userId);
    }

    // 2. Lưu câu hỏi của user
    const userMsg = await this.prisma.message.create({
      data: { sessionId, role: 'user', content: dto.question },
    });

    // 3. Gọi AI service — chỉ gửi câu hỏi, không gửi history
    const start = Date.now();
    const ragRes = await this.ai.rag({
      question: dto.question,
    });
    const latencyMs = Date.now() - start;

    // 5. Lưu câu trả lời của assistant
    const assistantMsg = await this.prisma.message.create({
      data: {
        sessionId,
        role: 'assistant',
        content: ragRes.answer,
        citations: JSON.stringify(ragRes.citations),
        latencyMs,
      },
    });

    // 6. Update session timestamp
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
}
