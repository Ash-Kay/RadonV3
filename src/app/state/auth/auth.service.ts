import axios from "axios";
import { stringify } from "querystring";
import { AuthStore, authStore } from "./auth.store";
import { AuthQuery, authQuery } from "./auth.query";
import jwtDecode from "jwt-decode";
import { Role, AUTH_INITIAL_STATE } from "./auth.model";
import { AuthToken } from "../../../interface/authtoken.interface";
import { main } from "../../../utils/axios";

export class AuthService {
    constructor(private store: AuthStore, private query: AuthQuery) {}

    readonly authState$ = this.query.authState$;
    readonly isLoggedIn$ = this.query.isLoggedIn$;

    public getTokenWithGoogleAuth = (idtoken: string) => {
        this.store.setLoading(true);
        axios
            .get(`http://localhost:3000/api/v1/users/auth/google`, getIdTokenHeader(idtoken))
            .then((response) => {
                const decodedUser: AuthToken = jwtDecode(response.data.data.token);
                this.store.update(() => ({
                    id: decodedUser.id,
                    email: decodedUser.email,
                    googleId: decodedUser.googleId,
                    username: decodedUser.username,
                    role: Role[decodedUser.role as keyof typeof Role],
                    token: response.data.data.token,
                    isLoggedIn: true,
                }));
                this.store.setLoading(false);
                localStorage.setItem("token", response.data.data.token);

                //to refetch and get upvote/downvte state
                window.location.reload();
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    public loginWithUsernamePassword = (email: string, password: string) => {
        const data = stringify({ email, password });

        this.store.setLoading(true);
        main.post("/users/login", data)
            .then((response) => {
                const decodedUser: AuthToken = jwtDecode(response.data.data.token);
                this.store.update(() => ({
                    id: decodedUser.id,
                    email: decodedUser.email,
                    googleId: decodedUser.googleId,
                    username: decodedUser.username,
                    role: Role[decodedUser.role as keyof typeof Role],
                    token: response.data.data.token,
                    isLoggedIn: true,
                }));
                this.store.setLoading(false);
                localStorage.setItem("token", response.data.data.token);

                //to refetch and get upvote/downvte state
                window.location.reload();
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    public signupWithUsernamePassword = (username: string, password: string, email: string) => {
        const data = stringify({ email, password, username });

        this.store.setLoading(true);
        main.post("/users/signup", data)
            .then((response) => {
                this.loginWithUsernamePassword(email, password);
                this.store.setLoading(false);
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    public logout = () => {
        this.store.update(() => AUTH_INITIAL_STATE);
        localStorage.removeItem("token");

        //to refetch and remove upvote/downvte state
        window.location.reload();
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
