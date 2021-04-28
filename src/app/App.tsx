import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { akitaDevtools } from "@datorama/akita";
import { Switch, Route, withRouter, RouteComponentProps } from "react-router-dom";
import Home from "./components/Home";
import FullScreenPost from "./components/FullScreenPost";
import { useAuthStateHook } from "./state/auth/auth.hook";
import { AuthContext } from "./context/auth.context";
import { Alert, Close, Spinner, Text } from "theme-ui";
import { usePostFeedErrorHook } from "./state/posts/post.hook";
import ReactGA from "react-ga";
akitaDevtools();

const App: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
    const [error] = usePostFeedErrorHook();
    const [authState] = useAuthStateHook();

    useEffect(() => {
        ReactGA.initialize("UA-194977580-1", { debug: true });
        if (authState?.isLoggedIn) {
            ReactGA.set(authState);
        }

        ReactGA.set({ page: window.location.pathname + window.location.search });
        ReactGA.pageview(window.location.pathname + window.location.search);

        props.history.listen((location) => {
            ReactGA.set({ page: location.pathname + location.search });
            ReactGA.pageview(location.pathname + location.search);
        });
    }, [authState]);

    const loadAfterAuth = () => {
        if (!authState) return <Spinner sx={{ display: "block", m: "auto" }} />;
        else
            return (
                //TODO: make a error component, find better way to handle error
                <AuthContext.Provider value={authState}>
                    <Navbar />
                    {error && false && (
                        <Alert
                            sx={{
                                position: "absolute",
                                top: "25px",
                                left: 3,
                                right: 3,
                                zIndex: "modal",
                            }}
                        >
                            <Text>{error.data.message}</Text>
                            <Close sx={{ ml: "auto" }} />
                        </Alert>
                    )}
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/posts/:id" component={FullScreenPost} />
                    </Switch>
                </AuthContext.Provider>
            );
    };

    return loadAfterAuth();
};
export default withRouter(App);
