import { AuthState, AuthStateData, AUTH_INITIAL_STATE } from "./auth.model";
import create, { SetState, GetState } from "zustand";
import { devtools } from "zustand/middleware";

const useAuthStore = create<AuthState>(
    devtools((set: SetState<AuthState>, get: GetState<AuthState>) => {
        return {
            data: AUTH_INITIAL_STATE,
            updateState: (newState: Partial<AuthStateData>) => {
                set((state) => ({ data: { ...state.data, ...newState } }));
            },
        };
    }, "AuthStore")
);

export default useAuthStore;
