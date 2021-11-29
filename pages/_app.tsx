import React, { useEffect } from "react";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
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

        // Event Tracker
        ReactGA.initialize("UA-194977580-1", { debug: process.env.NODE_ENV === "development" });
    }, []);

    //
    const title = "Memenese: The language of Memes";
    const description = "Meta description tags, while not tied to search engine rankings, are extremely important in";
    const imageUrl = "https://memenese.com/apple-touch-icon.png";
    const url = "https://memenese.com";

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>{process.env.NODE_ENV === "development" ? "DEV•" + title : title}</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                <link rel="canonical" href={url} />

                {/* <!-- Google / Search Engine Tags --> */}
                <meta itemProp="name" content={title} />
                <meta itemProp="description" name="description" content={description} />
                <meta itemProp="image" content={imageUrl} />
                <link rel="canonical" href={url} />

                {/* <!-- Facebook Meta Tags --> */}
                <meta property="og:url" content={url} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={imageUrl} />
                <meta property="og:site_name" content="Memenese" />

                {/* <!-- Twitter Meta Tags --/> */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={imageUrl} />
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
