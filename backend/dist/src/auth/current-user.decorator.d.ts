export interface AuthUser {
    id: number;
    email: string;
    fullName: string | null;
    role: string;
}
export declare const CurrentUser: (...dataOrPipes: unknown[]) => ParameterDecorator;
