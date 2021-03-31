import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ThemeProvider } from "theme-ui";
import theme from "./theme";
import App from "./app/App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </BrowserRouter>,
    document.getElementById("root")
);
