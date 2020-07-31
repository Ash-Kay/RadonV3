export interface AuthToken {
    id: number;
    email: string;
    role: string;
    username: string;
    googleId: string;
    avatarUrl?: string;
    iat: number;
    exp: number;
}
