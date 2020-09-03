import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ThemeProvider } from "emotion-theming";
import theme from "./theme";
import App from "./app/App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ThemeProvider>,
    document.getElementById("root")
);
