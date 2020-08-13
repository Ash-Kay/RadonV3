import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ThemeProvider } from "emotion-theming";
import theme from "./theme";
import App from "./app/App";

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>,
    document.getElementById("root")
);
