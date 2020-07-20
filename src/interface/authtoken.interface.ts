export interface AuthToken {
    id: number;
    email: string;
    role: string;
    username: string;
    googleId: string;
    iat: number;
    exp: number;
}
