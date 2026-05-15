import { SessionsService } from './sessions.service';
import type { AuthUser } from '../auth/current-user.decorator';
export declare class SessionsController {
    private readonly sessions;
    constructor(sessions: SessionsService);
    create(body: {
        title?: string;
    }, user: AuthUser): Promise<{
        id: number;
        createdAt: Date;
        title: string;
        updatedAt: Date;
        userId: number | null;
    }>;
    findAll(user: AuthUser): Promise<({
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
    findOne(id: number, user: AuthUser): Promise<{
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
    remove(id: number, user: AuthUser): Promise<{
        deleted: boolean;
    }>;
}
