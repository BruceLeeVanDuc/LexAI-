import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { AiClientModule } from '../ai-client/ai-client.module';
import { SessionsModule } from '../sessions/sessions.module';

@Module({
  imports: [AiClientModule, SessionsModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
