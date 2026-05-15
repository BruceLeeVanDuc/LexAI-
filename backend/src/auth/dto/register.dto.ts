import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email!: string;

  @IsString()
  @MinLength(6, { message: 'Mật khẩu tối thiểu 6 ký tự' })
  @MaxLength(64)
  password!: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  fullName?: string;
}
