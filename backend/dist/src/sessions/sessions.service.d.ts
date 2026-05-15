import { PrismaService } from '../prisma/prisma.service';
export declare class SessionsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(title?: string, userId?: number): Promise<{
        id: number;
        createdAt: Date;
        title: string;
        updatedAt: Date;
        userId: number | null;
    }>;
    findAll(userId: number): Promise<({
        _count: {
            messages: number;
        };
    } & {
        id: number;
        createdAt: Date;
        title: string;
        updatedAt: Date;
        userId: number | null;
    })[]>;
    findOne(id: number, userId: number): Promise<{
        messages: {
            id: number;
            role: string;
            createdAt: Date;
            sessionId: number;
            content: string;
            citations: string | null;
            tokensUsed: number | null;
            latencyMs: number | null;
        }[];
    } & {
        id: number;
        createdAt: Date;
        title: string;
        updatedAt: Date;
        userId: number | null;
    }>;
    assertOwner(id: number, userId: number): Promise<void>;
    touch(id: number): Promise<{
        id: number;
        createdAt: Date;
        title: string;
        updatedAt: Date;
        userId: number | null;
    }>;
    remove(id: number, userId: number): Promise<{
        deleted: boolean;
    }>;
}
