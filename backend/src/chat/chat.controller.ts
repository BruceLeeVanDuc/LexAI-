import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/send-message.dto';
import { AiClientService } from '../ai-client/ai-client.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import type { AuthUser } from '../auth/current-user.decorator';

@Controller()
export class ChatController {
  constructor(
    private readonly chat: ChatService,
    private readonly ai: AiClientService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('chat')
  async sendMessage(@Body() dto: SendMessageDto, @CurrentUser() user: AuthUser) {
    return this.chat.sendMessage(dto, user.id);
  }

  @Get('health')
  async health() {
    const ai = await this.ai.health();
    return { backend: 'ok', ai };
  }
}
