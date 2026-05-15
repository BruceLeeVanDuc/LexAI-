import { IsOptional, IsString, IsUUID, MinLength, MaxLength } from 'class-validator';

export class SendMessageDto {
  @IsString()
  @MinLength(1)
  @MaxLength(2000)
  question!: string;

  @IsOptional()
  @IsUUID()
  sessionId?: string;
}
