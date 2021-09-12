import NextAuth from "next-auth";
import { AuthStateData } from "../src/app/state/auth/auth.model";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
     */
    interface Session {
        user: AuthStateData;
    }
}

// declare module "next-auth/jwt" {
//     interface JWT {
//         /** This is an example. You can find me in types/next-auth.d.ts */
//         bar: number;
//     }
// }
