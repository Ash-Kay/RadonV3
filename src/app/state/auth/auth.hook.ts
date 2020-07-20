import { useObservable } from "../../../utils/useObservable";
import { authService } from "./auth.service";
import { AuthState, AUTH_INITIAL_STATE } from "./auth.model";

export type IsLoggedInHook = [boolean];
export type AuthStateHook = [AuthState];

export function useIsLoggedInHook(): IsLoggedInHook {
    const [isLoggedIn] = useObservable(authService.isLoggedIn$, false);
    return [isLoggedIn];
}

export function useAuthStateHook(): AuthStateHook {
    const [authState] = useObservable(authService.authState$, AUTH_INITIAL_STATE);
    return [authState];
}
