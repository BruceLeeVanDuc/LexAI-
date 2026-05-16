import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsPositive, IsString, MaxLength, MinLength } from 'class-validator';

export type LlmProvider = 'gemini' | 'groq';

export class SendMessageDto {
  @IsString()
  @MinLength(1)
  @MaxLength(2000)
  question!: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  sessionId?: number;

  @IsOptional()
  @IsIn(['gemini', 'groq'])
  provider?: LlmProvider;
}
