export interface AuthState {
    data: AuthStateData;
    updateState: (newState: Partial<AuthStateData>) => void;
}
export enum Role {
    USER = "USER",
    ADMIN = "ADMIN",
}

export interface AuthStateData {
    id: number;
    email: string;
    googleId: string;
    role: Role;
    username: string;
    token: string;
    isLoggedIn: boolean;
    avatarUrl?: string;
}

export const AUTH_INITIAL_STATE: AuthStateData = {
    id: 0,
    email: "",
    role: Role.USER,
    username: "",
    googleId: "",
    token: "",
    isLoggedIn: false,
};
