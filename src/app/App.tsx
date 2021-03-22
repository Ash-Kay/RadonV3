import React from "react";
import Navbar from "./components/Navbar";
import { akitaDevtools } from "@datorama/akita";
import { Switch, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import FullScreenPost from "./components/FullScreenPost";
import { useAuthStateHook } from "./state/auth/auth.hook";
import { AuthContext } from "./context/auth.context";
akitaDevtools();

interface Props {}

const App = (props: Props) => {
    let location = useLocation();
    const [authState] = useAuthStateHook();
    let background = location.state && (location.state as any).background;

    const loadAfterAuth = () => {
        if (!authState) return <h1>LOADING...</h1>;
        else
            return (
                <AuthContext.Provider value={authState}>
                    <Navbar />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/posts/:id" component={FullScreenPost} />
                    </Switch>
                </AuthContext.Provider>
            );
    };

    return loadAfterAuth();
};
export default App;
