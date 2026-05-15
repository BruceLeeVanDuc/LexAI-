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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const chat_service_1 = require("./chat.service");
const send_message_dto_1 = require("./dto/send-message.dto");
const ai_client_service_1 = require("../ai-client/ai-client.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const current_user_decorator_1 = require("../auth/current-user.decorator");
let ChatController = class ChatController {
    chat;
    ai;
    constructor(chat, ai) {
        this.chat = chat;
        this.ai = ai;
    }
    async sendMessage(dto, user) {
        return this.chat.sendMessage(dto, user.id);
    }
    async health() {
        const ai = await this.ai.health();
        return { backend: 'ok', ai };
    }
};
exports.ChatController = ChatController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('chat'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_message_dto_1.SendMessageDto, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "sendMessage", null);
__decorate([
    (0, common_1.Get)('health'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "health", null);
exports.ChatController = ChatController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [chat_service_1.ChatService,
        ai_client_service_1.AiClientService])
], ChatController);
//# sourceMappingURL=chat.controller.js.map