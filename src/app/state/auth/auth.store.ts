import { StoreConfig, Store } from "@datorama/akita";
import { AuthState, AUTH_INITIAL_STATE } from "./auth.model";

@StoreConfig({ name: "auth" })
export class AuthStore extends Store<AuthState> {
    constructor() {
        super(AUTH_INITIAL_STATE);
    }
}

export const authStore = new AuthStore();
