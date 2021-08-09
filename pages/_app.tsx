import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import React, { useEffect } from "react";
import theme from "../src/theme";
import ReactGA from "react-ga";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";

export default function MyApp(props) {
    const { Component, pageProps } = props;
    const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 60000 } } });

    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }

        //Event Tracker
        ReactGA.initialize("UA-194977580-1", { debug: process.env.NODE_ENV === "development" });
    }, []);

    return (
        <>
            <Head>
                <title>DEV•Memenese</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme.darkTheme}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    <Component {...pageProps} />
                </ThemeProvider>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </>
    );
}
