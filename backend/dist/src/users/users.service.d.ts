import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByEmail(email: string): Promise<{
        id: number;
        email: string;
        passwordHash: string;
        fullName: string | null;
        role: string;
        createdAt: Date;
        lastLoginAt: Date | null;
    } | null>;
    findById(id: number): Promise<{
        id: number;
        email: string;
        passwordHash: string;
        fullName: string | null;
        role: string;
        createdAt: Date;
        lastLoginAt: Date | null;
    }>;
    create(data: {
        email: string;
        passwordHash: string;
        fullName?: string;
    }): Promise<{
        id: number;
        email: string;
        passwordHash: string;
        fullName: string | null;
        role: string;
        createdAt: Date;
        lastLoginAt: Date | null;
    }>;
    touchLastLogin(id: number): Promise<{
        id: number;
        email: string;
        passwordHash: string;
        fullName: string | null;
        role: string;
        createdAt: Date;
        lastLoginAt: Date | null;
    }>;
}
