import React, { useEffect, useContext, useState } from "react";
import { Box, Spinner, ThemeUIStyleObject, Text, Flex } from "theme-ui";
import CommentItem from "../CommentItem";
import { Comment, postService, postStore } from "../../state/posts";
import { RouteComponentProps, useParams, withRouter } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { useActivePostHook } from "../../state/posts/post.hook";
import FullScreenPostItem from "../FullScreenPostItem";
import CommentInput from "../CommentInput";
import { SwipeEventData, useSwipeable } from "react-swipeable";
import { postQuery } from "../../state/posts/post.query";

interface ParamTypes {
    id: string;
}

enum ApiStatus {
    INITIAL,
    LOADING,
    LOADED,
    ERROR,
}

const FullScreenPost: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
    const id = +useParams<ParamTypes>().id;
    const authState = useContext(AuthContext);
    const [post] = useActivePostHook();
    const [postApiStatus, setPostApiStatus] = useState<ApiStatus>(ApiStatus.INITIAL);
    const [commentApiStatus, setCommentApiStatus] = useState<ApiStatus>(ApiStatus.INITIAL);
    const [tagApiStatus, setTagApiStatus] = useState<ApiStatus>(ApiStatus.INITIAL);

    useEffect(() => {
        window.scrollTo(0, 0);
        window.addEventListener("keydown", keyPressHandler);

        if (!postQuery.hasActive()) {
            postStore.setActive(id);
            getPost(id);
        } else {
            if (post && post.id !== id) {
                if (props.history.action === "POP") {
                    props.history.action = "REPLACE";
                    postStore.setActive(id);
                } else {
                    props.history.push(`/posts/${post.id}`);
                    getPost(post.id);
                }
            }
        }

        return () => {
            window.removeEventListener("keydown", keyPressHandler);
        };
    }, [id, post]);

    const keyPressHandler = (e: KeyboardEvent) => {
        switch (e.key) {
            case "ArrowLeft":
                navigateNextPost(e);
                break;

            case "ArrowRight":
                navigatePrevPost(e);
                break;

            default:
                break;
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const navigatePrevPost = (e: SwipeEventData | KeyboardEvent) => {
        postStore.setActive({ prev: true });
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const navigateNextPost = (e: SwipeEventData | KeyboardEvent) => {
        postStore.setActive({ next: true });
    };

    const getCommentList = (comments: Comment[]) => {
        if (!comments || !post) {
            return <Spinner sx={{ mx: "auto", width: "100%" }} />;
        }
        return comments.map((item) => <CommentItem item={item} postId={post.id} key={item.id} />);
    };

    const getPost = (id: number) => {
        if (postQuery.hasEntity(id)) {
            if (!post?.comment && commentApiStatus != ApiStatus.LOADING) {
                if (authState.isLoggedIn) {
                    setCommentApiStatus(ApiStatus.LOADING);
                    postService.getCommentsAuth(id, authState.token, (isSuccess: boolean) => {
                        if (isSuccess) {
                            setCommentApiStatus(ApiStatus.LOADED);
                        } else {
                            setCommentApiStatus(ApiStatus.ERROR);
                        }
                    });
                } else {
                    setCommentApiStatus(ApiStatus.LOADING);
                    postService.getComments(id, (isSuccess: boolean) => {
                        if (isSuccess) {
                            setCommentApiStatus(ApiStatus.LOADED);
                        } else {
                            setCommentApiStatus(ApiStatus.ERROR);
                        }
                    });
                }
            }
            if (!post?.tag && tagApiStatus != ApiStatus.LOADING) {
                setTagApiStatus(ApiStatus.LOADING);
                postService.getTags(id, (isSuccess: boolean) => {
                    if (isSuccess) {
                        setTagApiStatus(ApiStatus.LOADED);
                    } else {
                        setTagApiStatus(ApiStatus.ERROR);
                    }
                });
            }
        } else {
            if (postApiStatus != ApiStatus.LOADING) {
                if (authState.isLoggedIn) {
                    setPostApiStatus(ApiStatus.LOADING);
                    postService.getPostAuth(id, authState.token, (isSuccess: boolean) => {
                        if (isSuccess) {
                            setPostApiStatus(ApiStatus.LOADED);
                        } else {
                            setPostApiStatus(ApiStatus.ERROR);
                        }
                    });
                } else {
                    setPostApiStatus(ApiStatus.LOADING);
                    postService.getPost(id, (isSuccess: boolean) => {
                        if (isSuccess) {
                            setPostApiStatus(ApiStatus.LOADED);
                        } else {
                            setPostApiStatus(ApiStatus.ERROR);
                        }
                    });
                }
            }
        }
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: (e) => navigateNextPost(e),
        onSwipedRight: (e) => navigatePrevPost(e),
    });

    //#region Style
    const fullScreenPostStyle: ThemeUIStyleObject = {
        mt: "50px",
        height: ["100%", "100%", "calc(100vh - 50px)"],
        minHeight: "calc(100vh - 50px)",
        p: 3,
        backgroundColor: "secondaryDark",
    };
    //#endregion

    return (
        <Box sx={fullScreenPostStyle} {...swipeHandlers}>
            {postApiStatus === ApiStatus.ERROR && (
                <Flex sx={{ flexDirection: "column" }}>
                    <Text sx={{ fontSize: ["100px", "200px", "200px"], mx: "auto" }}>404</Text>
                    <Text sx={{ fontSize: 5, fontWeight: "bold", mx: "auto" }}>Post not found!</Text>
                </Flex>
            )}
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

export default withRouter(React.memo(FullScreenPost));
