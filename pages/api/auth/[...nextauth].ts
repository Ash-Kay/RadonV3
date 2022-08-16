import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { Role } from "../../../src/app/state/auth/auth.model";
import authService from "../../../src/app/state/auth/auth.service";
import jwtDecode from "jwt-decode";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
    // https://next-auth.js.org/configuration/providers
    providers: [
        // Providers.Facebook({
        //     clientId: process.env.FACEBOOK_ID,
        //     clientSecret: process.env.FACEBOOK_SECRET,
        // }),
        Providers.Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        // Providers.Twitter({
        //     clientId: process.env.TWITTER_ID,
        //     clientSecret: process.env.TWITTER_SECRET,
        // }),
    ],
    secret: process.env.SECRET,

    session: {
        jwt: true,
    },

    callbacks: {
        async jwt(token, user, account, profile, isNewUser) {
            if (!token.id || !token.role) {
                if (account && account.provider === "google") {
                    console.log(`account`, account);

                    console.log(`account.idToken`, account.idToken);

                    const { data } = await authService.getTokenWithGoogleAuth(account.idToken);
                    const decodedUser: AuthToken = jwtDecode(data.data.token);
                    token.id = decodedUser.id;
                    token.googleId = decodedUser.googleId;
                    token.username = decodedUser.username;
                    token.avatarUrl = decodedUser.avatarUrl;
                    token.role = Role[decodedUser.role as keyof typeof Role];
                    token.token = data.data.token;
                }
            }
            return token;
        },
        async session(session, user) {
            return { ...session, user };
        },
        async redirect(url, baseUrl) {
            return baseUrl;
        },
    },

    theme: "dark",

    debug: process.env.NODE_ENV == "development" ? true : false,
});

export interface AuthToken {
    id: number;
    email: string;
    role: string;
    username: string;
    googleId: string;
    avatarUrl?: string;
    iat: number;
    exp: number;
}
