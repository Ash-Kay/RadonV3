import { createContext } from "react";
import { AUTH_INITIAL_STATE } from "../state/auth/auth.model";

export const AuthContext = createContext(AUTH_INITIAL_STATE);
