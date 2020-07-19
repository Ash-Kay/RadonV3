import React from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import { akitaDevtools } from "@datorama/akita";

akitaDevtools();

interface Props {}

const App = (props: Props) => {
    return (
        <>
            <Navbar />
            <Main />
        </>
    );
};

export default App;
