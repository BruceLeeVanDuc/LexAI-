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
var AiClientService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiClientService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
let AiClientService = AiClientService_1 = class AiClientService {
    http;
    config;
    logger = new common_1.Logger(AiClientService_1.name);
    aiUrl;
    timeoutMs;
    constructor(http, config) {
        this.http = http;
        this.config = config;
        this.aiUrl = this.config.get('AI_SERVICE_URL', 'http://localhost:8000');
        this.timeoutMs = Number(this.config.get('AI_SERVICE_TIMEOUT_MS', 60000));
    }
    async rag(req, provider = 'gemini') {
        const path = provider === 'groq' ? '/rag/groq' : '/rag/gemini';
        try {
            const { data } = await (0, rxjs_1.firstValueFrom)(this.http.post(`${this.aiUrl}${path}`, req, {
                timeout: this.timeoutMs,
            }));
            return data;
        }
        catch (err) {
            this.logger.error(`AI service [${provider}] lỗi: ${err.message}`, err.stack);
            throw new common_1.ServiceUnavailableException('AI service không phản hồi');
        }
    }
    async health() {
        try {
            const { data } = await (0, rxjs_1.firstValueFrom)(this.http.get(`${this.aiUrl}/health`, { timeout: 5000 }));
            return data;
        }
        catch (err) {
            return { status: 'unreachable', error: err.message };
        }
    }
};
exports.AiClientService = AiClientService;
exports.AiClientService = AiClientService = AiClientService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], AiClientService);
//# sourceMappingURL=ai-client.service.js.map