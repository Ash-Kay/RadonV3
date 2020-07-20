export interface AuthState {
    email: string;
    id: number;
    googleId: string;
    role: Role;
    username: string;
}
export enum Role {
    USER = "USER",
    ADMIN = "ADMIN",
}

export function createInitialState(): AuthState {
    return AUTH_INITIAL_STATE;
}

export const AUTH_INITIAL_STATE: AuthState = {
    id: 0,
    email: "",
    role: Role.USER,
    username: "",
    googleId: "",
};
