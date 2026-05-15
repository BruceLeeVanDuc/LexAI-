import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export interface JwtPayload {
    sub: string;
    email: string;
    role: string;
}
export declare class AuthService {
    private readonly users;
    private readonly jwt;
    constructor(users: UsersService, jwt: JwtService);
    register(dto: RegisterDto): Promise<{
        token: string;
        user: {
            id: string;
            email: string;
            fullName: string | null;
            role: string;
        };
    }>;
    login(dto: LoginDto): Promise<{
        token: string;
        user: {
            id: string;
            email: string;
            fullName: string | null;
            role: string;
        };
    }>;
    private buildResponse;
}
