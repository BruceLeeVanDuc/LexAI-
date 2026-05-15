import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import type { AuthUser } from './current-user.decorator';
export declare class AuthController {
    private readonly auth;
    constructor(auth: AuthService);
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
    me(user: AuthUser): AuthUser;
}
