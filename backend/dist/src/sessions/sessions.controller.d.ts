import { SessionsService } from './sessions.service';
import type { AuthUser } from '../auth/current-user.decorator';
export declare class SessionsController {
    private readonly sessions;
    constructor(sessions: SessionsService);
    create(body: {
        title?: string;
    }, user: AuthUser): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        updatedAt: Date;
        userId: string | null;
    }>;
    findAll(user: AuthUser): Promise<({
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
    findOne(id: string, user: AuthUser): Promise<{
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
    remove(id: string, user: AuthUser): Promise<{
        deleted: boolean;
    }>;
}
