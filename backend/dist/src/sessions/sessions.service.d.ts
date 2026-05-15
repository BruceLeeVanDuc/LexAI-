import { PrismaService } from '../prisma/prisma.service';
export declare class SessionsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(title?: string, userId?: string): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        updatedAt: Date;
        userId: string | null;
    }>;
    findAll(userId: string): Promise<({
        _count: {
            messages: number;
        };
    } & {
        id: string;
        createdAt: Date;
        title: string;
        updatedAt: Date;
        userId: string | null;
    })[]>;
    findOne(id: string, userId: string): Promise<{
        messages: {
            id: string;
            role: string;
            createdAt: Date;
            sessionId: string;
            content: string;
            citations: string | null;
            tokensUsed: number | null;
            latencyMs: number | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        title: string;
        updatedAt: Date;
        userId: string | null;
    }>;
    assertOwner(id: string, userId: string): Promise<void>;
    touch(id: string): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        updatedAt: Date;
        userId: string | null;
    }>;
    remove(id: string, userId: string): Promise<{
        deleted: boolean;
    }>;
}
