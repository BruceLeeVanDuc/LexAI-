import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { RagRequest, RagResponse } from './dto/rag.dto';
export declare class AiClientService {
    private readonly http;
    private readonly config;
    private readonly logger;
    private readonly aiUrl;
    private readonly timeoutMs;
    constructor(http: HttpService, config: ConfigService);
    rag(req: RagRequest, provider?: 'gemini' | 'groq'): Promise<RagResponse>;
    health(): Promise<any>;
}
