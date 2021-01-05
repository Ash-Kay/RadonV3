import React, { useEffect, useContext } from "react";
import { Box } from "theme-ui";
import CommentItem from "../CommentItem";
import { Comment, postService, postStore } from "../../state/posts";
import { useParams } from "react-router-dom";
import { postQuery } from "../../state/posts/post.query";
import { AuthContext } from "../../context/auth.context";
import { usePostHook } from "../../state/posts/post.hook";
import FullScreenPostItem from "../FullScreenPostItem";
import CommentInput from "../CommentInput";

interface Props {}

interface ParamTypes {
    id: string;
}

const FullScreenPost = (props: Props) => {
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

    return (
        <Box sx={{ width: ["auto", "600px"], mx: "auto", mt: "66px" }}>
            <Box>{post && <FullScreenPostItem item={post} />}</Box>
            <Box sx={{ backgroundColor: "#d1d1d1", height: 1, my: "0.5rem" }} />
            {post && <CommentInput postId={post.id} />}
            <Box sx={{ mt: "1rem" }}>{post && getCommentList(post.comment)}</Box>
        </Box>
    );
};

export default FullScreenPost;
