import { NextPageContext } from "next";
import { useEffect, useState } from "react";
import Navbar from "../src/app/components/Navbar";
import { AuthContext } from "../src/app/context/auth.context";
import { AuthStateData, AUTH_INITIAL_STATE } from "../src/app/state/auth/auth.model";
import useAuthStore from "../src/app/state/auth/auth.store";
import { Post } from "../src/app/state/posts/post.model";
import { main } from "../src/utils/axios";
import { Box, makeStyles } from "@material-ui/core";
import HomeFeed from "../src/app/components/HomeFeed";

interface Props {
    posts: Post[];
    user: AuthStateData;
}

const useIndexStyles = makeStyles((theme) => ({
    homeFeedBox: {
        display: "flex",
        justifyContent: "center",
        paddingTop: "54px",
        gridColumnGap: "1rem",
        // backgroundColor: "secondaryDark",//TODO:FIX
        minHeight: "100vh",
    },

    root: {
        // maxWidth: "550px",
    },
}));

const Index = (props: Props) => {
    const classes = useIndexStyles();
    const authState = useAuthStore((state) => state.data);
    const updateAuthState = useAuthStore((state) => state.updateState);
    const [posts, setPosts] = useState(props.posts);

    const updatePosts = (updatedPostList: Post[]) => {
        console.log(`oldPosts`, posts);
        console.log(`newPosts`, updatedPostList);

        setPosts(updatedPostList);
    };

    useEffect(() => {
        updateAuthState({ ...props.user, isLoggedIn: props.user.id == 0 ? false : true });
    }, []);

    return (
        <AuthContext.Provider value={authState}>
            <Navbar />
            <Box className={classes.root}>
                <Box className={classes.homeFeedBox}>
                    <HomeFeed posts={posts} updatePosts={updatePosts} />
                </Box>
            </Box>
        </AuthContext.Provider>
    );
};

export default Index;

export const getServerSideProps = async (context: NextPageContext) => {
    try {
        const cookieHeader = { Cookie: context.req ? context.req.headers.cookie : "loggedout" };

        const postListResponse = await main.get("/posts/?page=1", { headers: cookieHeader });
        const userDataResponse = await main.get("/users/me", { headers: cookieHeader });

        return {
            props: { posts: postListResponse.data.data, user: userDataResponse.data.data },
        };
    } catch (error) {
        console.log(error);
    }
    return {
        props: { posts: [], user: AUTH_INITIAL_STATE },
    };
};
