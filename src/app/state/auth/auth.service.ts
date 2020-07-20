import axios from "axios";
import { AuthStore, authStore } from "./auth.store";
import { AuthQuery, authQuery } from "./auth.query";
import jwtDecode from "jwt-decode";
import { AuthState } from "./auth.model";

export class AuthService {
    constructor(private store: AuthStore, private query: AuthQuery) {}

    readonly authState$ = this.query.authState$;

    public getToken = (idtoken: string) => {
        this.store.setLoading(true);
        axios
            .get(`http://localhost:3000/api/v1/users/auth/google/mobile`, getIdTokenHeader(idtoken))
            .then((response) => {
                const decodedUser: AuthState = jwtDecode(response.data.data.token);
                this.store.update((state) => ({
                    id: decodedUser.id,
                    email: decodedUser.email,
                    googleId: decodedUser.googleId,
                    username: decodedUser.username,
                    role: decodedUser.role,
                }));
                this.store.setLoading(false);
            })
            .catch(function (error) {
                console.error(error);
            });
    };
}

export const authService = new AuthService(authStore, authQuery);

const getIdTokenHeader = (idtoken: string) => {
    return {
        headers: {
            Authorization: `Bearer ${idtoken}`,
        },
    };
};
