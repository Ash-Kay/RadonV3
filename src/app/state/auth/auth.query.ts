import { Query } from "@datorama/akita";
import { AuthState } from "./auth.model";
import { authStore, AuthStore } from "./auth.store";

export class AuthQuery extends Query<AuthState> {
    authState$ = this.select();
    isLoggedIn$ = this.select((state) => state.isLoggedIn);

    constructor(protected store: AuthStore) {
        super(store);
    }
}

export const authQuery = new AuthQuery(authStore);
