import React, { useEffect, useContext } from "react";
import { Box, Flex } from "theme-ui";
import CommentItem from "../CommentItem";
import { Comment, postService, postStore } from "../../state/posts";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { postQuery } from "../../state/posts/post.query";
import { AuthContext } from "../../context/auth.context";
import { usePostHook } from "../../state/posts/post.hook";
import FullScreenPostItem from "../FullScreenPostItem";
import CommentInput from "../CommentInput";
import Modal from "../core/Modal";

interface Props {}

interface ParamTypes {
    id: string;
}

const FullScreenPost = (props: Props) => {
    let location = useLocation();
    let background = location.state && (location.state as any).background;
    let history = useHistory();
    const id = +useParams<ParamTypes>().id;
    const authState = useContext(AuthContext);
    const [post] = usePostHook(id);
    const [isCreatePostModalOpen, setCreatePostModalOpen] = React.useState(true);

    useEffect(() => {
        getPost();
    }, []);

    const getCommentList = (comments: Comment[]) => {
        if (!comments || !post) {
            return <h4>Loading Comments...</h4>;
        }
        return comments.map((item) => <CommentItem item={item} postId={post.id} key={item.id} />);
    };

    const getPost = () => {
        if (postQuery.hasEntity(id)) {
            if (!post?.comment) {
                if (authState.isLoggedIn) postService.getCommentsAuth(id, authState.token);
                else postService.getComments(id);
            }
        } else {
            if (authState.isLoggedIn) {
                postService
                    .getPostAuthPromise(id, authState.token)
                    .then((response) => {
                        postStore.add(response.data.data, { prepend: true });
                        postService.getCommentsAuth(id, authState.token);
                    })
                    .catch(function (error) {
                        console.error(error);
                        //TODO 404 page
                    });
            } else {
                postService
                    .getPostPromise(id)
                    .then((response) => {
                        postStore.add(response.data.data, { prepend: true });
                        postService.getComments(id);
                    })
                    .catch(function (error) {
                        console.error(error);
                        //TODO 404 page
                    });
            }
        }
    };

    const closeCreatePostModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setCreatePostModalOpen(false);
        e.stopPropagation();
        history.goBack();
    };

    return (
        <Box
            sx={{
                position: "fixed",
                top: "50px",
                left: 0,
                right: 0,
                height: "calc(100vh - 50px)",
                p: 3,
                zIndex: 5,
                backgroundColor: "secondaryDark",
                overflowY: "hidden",
                //TODO make 50px var
                //TODO height??, zIndex
            }}
        >
            {post && (
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "2fr 1fr",
                        gridTemplateRows: "calc(100%  - 40px) auto",
                        gridTemplateAreas: `"media     comms"
                                            "bottomBar commInput"`,
                        columnGap: 3,
                        rowGap: 1,
                        height: "100%",
                        width: "100%",
                    }}
                >
                    <FullScreenPostItem item={post} />
                    <CommentInput postId={post.id} />
                    <Box sx={{ mt: "1rem", gridArea: "comms", overflowY: "scroll" }}>
                        {post && getCommentList(post.comment)}
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default FullScreenPost;
