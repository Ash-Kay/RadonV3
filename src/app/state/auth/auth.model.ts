import jwtDecode from "jwt-decode";
import { AuthToken } from "../../../interface/authtoken.interface";

export interface AuthState {
    email: string;
    id: number;
    googleId: string;
    role: Role;
    username: string;
    token: string;
    isLoggedIn: boolean;
    avatarUrl?: string;
}
export enum Role {
    USER = "USER",
    ADMIN = "ADMIN",
}

export function createInitialState(): AuthState {
    const token = localStorage.getItem("token");
    if (token === null || token === "") return AUTH_INITIAL_STATE;

    let decodedUser: AuthToken;
    try {
        decodedUser = jwtDecode(token);
        const AUTH_INITIAL_LOGGED_IN_STATE: AuthState = {
            id: decodedUser.id,
            email: decodedUser.email,
            googleId: decodedUser.googleId,
            username: decodedUser.username,
            role: Role[decodedUser.role as keyof typeof Role],
            token,
            isLoggedIn: true,
            avatarUrl: decodedUser.avatarUrl,
        };

        return AUTH_INITIAL_LOGGED_IN_STATE;
    } catch (error) {
        return AUTH_INITIAL_STATE;
    }
}

export const AUTH_INITIAL_STATE: AuthState = {
    id: 0,
    email: "",
    role: Role.USER,
    username: "",
    googleId: "",
    token: "",
    isLoggedIn: false,
};
