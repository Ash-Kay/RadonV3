import { StoreConfig, Store } from "@datorama/akita";
import { AuthState, createInitialState } from "./auth.model";

@StoreConfig({ name: "auth" })
export class AuthStore extends Store<AuthState> {
    constructor() {
        super(createInitialState());
    }
}

export const authStore = new AuthStore();
