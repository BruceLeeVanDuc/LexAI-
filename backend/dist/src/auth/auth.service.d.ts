import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
export interface JwtPayload {
    sub: number;
    email: string;
    role: string;
}
export declare class AuthService {
    private readonly users;
    private readonly jwt;
    private readonly prisma;
    constructor(users: UsersService, jwt: JwtService, prisma: PrismaService);
    register(dto: RegisterDto): Promise<{
        token: string;
        user: {
            id: number;
            email: string;
            fullName: string | null;
            role: string;
        };
    }>;
    login(dto: LoginDto): Promise<{
        token: string;
        user: {
            id: number;
            email: string;
            fullName: string | null;
            role: string;
        };
    }>;
    changePassword(userId: number, dto: ChangePasswordDto): Promise<{
        success: boolean;
    }>;
    private buildResponse;
}
