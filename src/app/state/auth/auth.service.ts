import { stringify } from "querystring";
import { AUTH_INITIAL_STATE, Role } from "./auth.model";
import { main } from "../../../utils/axios";
import useAuthStore from "./auth.store";

// const updateState = useAuthStore((state) => state.updateState);

const getTokenWithGoogleAuth = (idtoken: string) => {
    return main.get("/users/auth/google", getIdTokenHeader(idtoken));
    // .then((response) => {
    //     main.get("/users/me")
    //         .then((response) => {
    //             const user = response.data;

    //             // updateState({
    //             //     id: user.id,
    //             //     email: user.email,
    //             //     googleId: user.googleId,
    //             //     username: user.username,
    //             //     role: Role[user.role as keyof typeof Role],
    //             //     isLoggedIn: true,
    //             // });
    //         })
    //         .catch(function (error) {
    //             console.error(error);
    //         });

    //     //to refetch and get upvote/downvte state
    //     // //TODO Find a way to refetch current screen content
    //     // window.location.reload();
    // })
    // .catch(function (error) {
    //     console.error(error);
    // });
};

const getUserData = () => {
    return main.get("/users/me");
};

const loginWithUsernamePassword = (email: string, password: string): void => {
    const data = stringify({ email, password });

    main.post("/users/login", data)
        .then((response) => {
            main.get("/users/me")
                .then((response) => {
                    const user = response.data;

                    // updateState({
                    //     id: user.id,
                    //     email: user.email,
                    //     googleId: user.googleId,
                    //     username: user.username,
                    //     role: Role[user.role as keyof typeof Role],
                    //     isLoggedIn: true,
                    // });
                })
                .catch(function (error) {
                    console.error(error);
                });

            //to refetch and get upvote/downvte state
            // //TODO Find a way to refetch current screen content
            // window.location.reload();
        })
        .catch(function (error) {
            console.error(error);
        });
};

const signupWithUsernamePassword = (username: string, password: string, email: string): void => {
    const data = stringify({ email, password, username });

    main.post("/users/signup", data)
        .then(() => {
            loginWithUsernamePassword(email, password);
        })
        .catch(function (error) {
            console.error(error);
        });
};

const logout = (): void => {
    main.post("/users/logout")
        .then(() => {
            console.log("Logged Out");
            useAuthStore.setState({ data: AUTH_INITIAL_STATE });
        })
        .catch(function (error) {
            console.error(error);
        });
};

export default { getTokenWithGoogleAuth, signupWithUsernamePassword, loginWithUsernamePassword, logout, getUserData };

const getIdTokenHeader = (idtoken: string) => {
    return {
        headers: {
            Authorization: `Bearer ${idtoken}`,
        },
    };
};
