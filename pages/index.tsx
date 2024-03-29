import { NextPageContext } from "next";
import { useEffect, useState } from "react";
import Navbar from "../src/app/components/Navbar";
import { AuthContext } from "../src/app/context/auth.context";
import { AuthStateData, AUTH_INITIAL_STATE } from "../src/app/state/auth/auth.model";
import useAuthStore from "../src/app/state/auth/auth.store";
import { Comment, Post } from "../src/app/state/posts/post.model";
import { Box, makeStyles } from "@material-ui/core";
import HomeFeed from "../src/app/components/HomeFeed";
import { ClientSafeProvider, getProviders, getSession } from "next-auth/client";
import { getComments, getPost, getPostPage } from "../src/app/state/posts/post.service";
interface Props {
    posts: Post[];
    user: AuthStateData;
    providers: Record<string, ClientSafeProvider>;
    modalPost: Post;
    modalPostComment: Comment[];
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
        setPosts(updatedPostList);
    };

    useEffect(() => {
        updateAuthState({
            ...props.user,
            isLoggedIn: props.user.id !== null && props.user.id !== undefined && props.user.id !== 0,
        });

        // console.log(`index modalContent`, props);
    }, []);

    return (
        <AuthContext.Provider value={authState}>
            {/* {console.log(`props.modalContent`, props)} */}

            <Navbar providers={props.providers} />
            <Box className={classes.root}>
                <Box className={classes.homeFeedBox}>
                    <HomeFeed
                        posts={posts}
                        updatePosts={updatePosts}
                        modalPost={props.modalPost}
                        modalPostComment={props.modalPostComment}
                    />
                </Box>
            </Box>
        </AuthContext.Provider>
    );
};

export default Index;

export const getServerSideProps = async (context: NextPageContext) => {
    try {
        const session = await getSession(context);
        const postId = context.query.postId;
        let modalPostComment = [];
        let modalPost: Post = null;

        // console.log(`postId`, postId);

        //@ts-ignore
        const postListResponse = await getPostPage(1, session?.user?.token);

        if (postId) {
            const modalPostCommentReponse = await getComments(+postId, session?.user?.token);
            modalPostComment = modalPostCommentReponse.data.data;

            //TODO: can check if [postListResponse] already contain this
            const modalPostResponse = await getPost(+postId, session?.user?.token);
            modalPost = modalPostResponse.data.data;
        }

        // console.log(`modalPostComment`, modalPostComment);
        // console.log(`modalPost`, modalPost);

        const providers = await getProviders();

        return {
            props: {
                posts: postListResponse.data.data,
                user: session ? session.user : AUTH_INITIAL_STATE,
                providers,
                modalPost,
                modalPostComment,
            },
        };
    } catch (error) {
        console.log(error);
    }
    return {
        props: { posts: [], user: AUTH_INITIAL_STATE, providers: [] },
    };
};
