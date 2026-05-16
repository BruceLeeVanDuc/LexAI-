import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { RagRequest, RagResponse } from './dto/rag.dto';

@Injectable()
export class AiClientService {
  private readonly logger = new Logger(AiClientService.name);
  private readonly aiUrl: string;
  private readonly timeoutMs: number;

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {
    this.aiUrl = this.config.get<string>('AI_SERVICE_URL', 'http://localhost:8000');
    this.timeoutMs = Number(this.config.get('AI_SERVICE_TIMEOUT_MS', 60000));
  }

  async rag(
    req: RagRequest,
    provider: 'gemini' | 'groq' = 'gemini',
  ): Promise<RagResponse> {
    const path = provider === 'groq' ? '/rag/groq' : '/rag/gemini';
    try {
      const { data } = await firstValueFrom(
        this.http.post<RagResponse>(`${this.aiUrl}${path}`, req, {
          timeout: this.timeoutMs,
        }),
      );
      return data;
    } catch (err: any) {
      this.logger.error(`AI service [${provider}] lỗi: ${err.message}`, err.stack);
      throw new ServiceUnavailableException('AI service không phản hồi');
    }
  }

  async health(): Promise<any> {
    try {
      const { data } = await firstValueFrom(
        this.http.get(`${this.aiUrl}/health`, { timeout: 5000 }),
      );
      return data;
    } catch (err: any) {
      return { status: 'unreachable', error: err.message };
    }
  }
}
