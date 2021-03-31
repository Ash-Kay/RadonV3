import { useObservable } from "../../../utils/useObservable";
import { authService } from "./auth.service";
import { AuthState } from "./auth.model";

export type IsLoggedInHook = [boolean];
export type AuthStateHook = [AuthState | undefined];

export function useIsLoggedInHook(): IsLoggedInHook {
    const [isLoggedIn] = useObservable(authService.isLoggedIn$, false);
    return [isLoggedIn];
}

export function useAuthStateHook(): AuthStateHook {
    const [authState] = useObservable(authService.authState$);
    return [authState];
}
