export interface AuthUser {
    id: string;
    email: string;
    fullName: string | null;
    role: string;
}
export declare const CurrentUser: (...dataOrPipes: unknown[]) => ParameterDecorator;
