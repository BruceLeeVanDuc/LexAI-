import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AiClientModule } from './ai-client/ai-client.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SessionsModule } from './sessions/sessions.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AiClientModule,
    UsersModule,
    AuthModule,
    SessionsModule,
    ChatModule,
  ],
})
export class AppModule {}
