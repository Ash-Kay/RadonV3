import React, { useEffect, useContext } from "react";
import { Flex, Box } from "rebass";
import PostItem from "../PostItem";
import CommentItem from "../CommentItem";
import { Comment, postService, postStore } from "../../state/posts";
import { useParams } from "react-router-dom";
import { postQuery } from "../../state/posts/post.query";
import { AuthContext } from "../../context/auth.context";
import { usePostHook } from "../../state/posts/post.hook";

interface Props {}

const FullScreenPost = (props: Props) => {
    const { id } = useParams();
    const authState = useContext(AuthContext);
    const post = usePostHook(id);

    useEffect(() => {
        getPost();
    }, [authState]);

    const getCommentList = (comments: Comment[]) => {
        if (comments === undefined) {
            return <h4>Loading Comments...</h4>;
        }
        return comments.map((item) => <CommentItem item={item} key={item.id} />);
    };

    const getPost = () => {
        if (postQuery.hasEntity(id)) {
            if (!post?.comment) {
                postService.getComments(id);
            }
        } else {
            if (authState.isLoggedIn) {
                postService
                    .getPostAuthPromise(id, authState.token)
                    .then((response) => {
                        postStore.add(response.data.data, { prepend: true });
                        postService.getComments(id);
                    })
                    .catch(function (error) {
                        console.error(error);
                        //404
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
                        //404
                    });
            }
        }
    };

    return (
        <Flex>
            <Box sx={{ width: "50%" }}>{post && <PostItem item={post} />}</Box>
            <Box>{post && getCommentList(post?.comment)}</Box>
        </Flex>
    );
};

export default FullScreenPost;
