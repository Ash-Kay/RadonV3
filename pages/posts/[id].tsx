import { Box, makeStyles } from "@material-ui/core";
import { NextPageContext } from "next";
import React from "react";
import Navbar from "../../src/app/components/Navbar";
import PostItem from "../../src/app/components/PostItem";
import { AuthContext } from "../../src/app/context/auth.context";
import { AuthStateData, AUTH_INITIAL_STATE } from "../../src/app/state/auth/auth.model";
import useAuthStore from "../../src/app/state/auth/auth.store";
import { Post } from "../../src/app/state/posts/post.model";
import { main } from "../../src/utils/axios";

interface Props {
    post: Post;
    user: AuthStateData;
}

const useFullScreenPostStyles = makeStyles((theme) => ({
    homeFeedBox: {
        display: "flex",
        justifyContent: "center",
        paddingTop: "54px",
        gridColumnGap: "1rem",

        "&>div": {
            width: "650px",
        },
    },

    root: {},
}));

const FullScreenPost = (props: Props) => {
    const classes = useFullScreenPostStyles();
    const authState = useAuthStore((state) => state.data);

    return (
        <AuthContext.Provider value={authState}>
            <Navbar />
            <Box className={classes.root}>
                <Box className={classes.homeFeedBox}>
                    <PostItem item={props.post} fullScreenPost />
                </Box>
            </Box>
        </AuthContext.Provider>
    );
};

export default FullScreenPost;

export const getServerSideProps = async (context: NextPageContext) => {
    const { id } = context.query;

    try {
        const cookieHeader = { Cookie: context.req ? context.req.headers.cookie : undefined };
        const postResponse = await main.get(`/posts/${id}`, { headers: cookieHeader });
        const userDataResponse = await main.get("/users/me", { headers: cookieHeader });

        return {
            props: { post: postResponse.data.data, user: userDataResponse.data.data },
        };
    } catch (error) {
        console.log(error);
    }
    return {
        notFound: true,
    };
};
