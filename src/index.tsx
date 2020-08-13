import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import { Client as Styletron } from "styletron-engine-atomic";
import App from "./app/App";
import theme from "./theme";

const engine = new Styletron();

ReactDOM.render(
    <StyletronProvider value={engine}>
        <BaseProvider theme={theme}>
            <App />
        </BaseProvider>
    </StyletronProvider>,
    document.getElementById("root")
);
