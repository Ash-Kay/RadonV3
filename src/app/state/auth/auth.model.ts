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

export const createInitialState = (): AuthState => {
    const token = localStorage.getItem("token");
    if (!token) return AUTH_INITIAL_STATE;

    try {
        const decodedUser: AuthToken = jwtDecode(token);
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
        console.log("INITIAL_NO AUTH");
        return AUTH_INITIAL_STATE;
    }
};

export const AUTH_INITIAL_STATE: AuthState = {
    id: 0,
    email: "",
    role: Role.USER,
    username: "",
    googleId: "",
    token: "",
    isLoggedIn: false,
};
