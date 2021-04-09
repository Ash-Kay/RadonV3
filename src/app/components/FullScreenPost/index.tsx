import React, { useEffect, useContext } from "react";
import { Box, ThemeUIStyleObject } from "theme-ui";
import CommentItem from "../CommentItem";
import { Comment, postService, postStore } from "../../state/posts";
import { useParams } from "react-router-dom";
import { postQuery } from "../../state/posts/post.query";
import { AuthContext } from "../../context/auth.context";
import { usePostHook } from "../../state/posts/post.hook";
import FullScreenPostItem from "../FullScreenPostItem";
import CommentInput from "../CommentInput";
import { handleResponseError } from "../../../utils/handleResponseError";

interface ParamTypes {
    id: string;
}

const FullScreenPost: React.FC = () => {
    const id = +useParams<ParamTypes>().id;
    const authState = useContext(AuthContext);
    const [post] = usePostHook(id);

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
            if (!post?.tag) {
                postService.getTags(id);
            }
        } else {
            if (authState.isLoggedIn) {
                postService
                    .getPostAuthPromise(id, authState.token)
                    .then((response) => {
                        postStore.add(response.data.data, { prepend: true });
                        postService.getCommentsAuth(id, authState.token);
                        postService.getTags(id);
                    })
                    .catch(function (error) {
                        handleResponseError(error, postStore);
                        //TODO 404 page
                    });
            } else {
                postService
                    .getPostPromise(id)
                    .then((response) => {
                        postStore.add(response.data.data, { prepend: true });
                        postService.getComments(id);
                        postService.getTags(id);
                    })
                    .catch(function (error) {
                        handleResponseError(error, postStore);
                        //TODO 404 page
                    });
            }
        }
    };

    //#region Style
    const fullScreenPostStyle: ThemeUIStyleObject = {
        mt: "50px",
        height: ["100%", "100%", "calc(100vh - 50px)"],
        p: 3,
        backgroundColor: "secondaryDark",
        // overflowY: "hidden",
    };
    //#endregion

    return (
        <Box sx={fullScreenPostStyle}>
            {post && (
                <Box sx={{ display: "flex", height: "100%", flexDirection: ["column", "column", "row"] }}>
                    <FullScreenPostItem item={post} />
                    <Box
                        sx={{
                            width: ["100%", "100%", "35%"],
                            display: "flex",
                            flexDirection: ["column-reverse", "column-reverse", "column"],
                        }}
                    >
                        <Box sx={{ mt: "1rem", overflowY: ["inherit", "inherit", "scroll"], flexGrow: 2, pr: 2 }}>
                            {post && getCommentList(post.comment)}
                        </Box>
                        <CommentInput postId={post.id} />
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default FullScreenPost;
