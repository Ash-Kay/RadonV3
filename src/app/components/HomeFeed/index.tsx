import React, { useState } from "react";
import { getPostPage } from "../../state/posts/post.service";
import InfiniteScroll from "react-infinite-scroller";
import { Post, Comment } from "../../state/posts/post.model";
import PostItem from "../PostItem";
import { Avatar, Box, Card, CircularProgress, makeStyles, Modal, Typography } from "@material-ui/core";
import useAuthStore from "../../state/auth/auth.store";
import { useRouter } from "next/router";
import Media from "../core/Media";
import CommentItem from "../CommentItem";
import ClearIcon from "@material-ui/icons/Clear";
import CancelIcon from "@material-ui/icons/Cancel";
import clsx from "clsx";

interface Props {
    posts: Post[];
    updatePosts: (newPosts: Post[]) => void;
    modalPost: Post;
    modalPostComment: Comment[];
}

const useHomeFeedStyles = makeStyles((theme) => ({
    main: {
        width: "600px",
    },
    //Copied
    closeButton: {
        position: "absolute",
        margin: theme.spacing(0.5),
        cursor: "pointer",
        opacity: 0.6,

        "&:hover": {
            opacity: 1,
        },

        [theme.breakpoints.down("sm")]: {
            position: "absolute",
            top: 0,
            right: 0,
            opacity: 1,
        },
    },
    paper: {
        width: "calc(100vw - 38px)",
        height: "calc(100vh - 38px)",

        [theme.breakpoints.down("sm")]: {
            width: "100vw",
            height: "calc(100vh - 40px)",
            overflowY: "scroll",
        },
    },
    modal: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        [theme.breakpoints.down("sm")]: {
            alignItems: "flex-end",
        },
    },

    //copied
    commentListCardContent: {
        "&>div:not(:first-child)": {
            marginTop: theme.spacing(1),
        },
        margin: theme.spacing(1, 0),
    },

    //copied
    customFlex: {
        display: "flex",
        height: "100%",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            height: "unset",
        },
    },
    flex: {
        display: "flex",
    },
    media: {
        width: "70%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        backgroundColor: theme.palette.grey[900],

        "&>img": {
            width: "unset",
        },

        [theme.breakpoints.down("sm")]: {
            "&>img": {
                width: "100%",
            },
            width: "100%",
            // display: "block",
            // height: "unset",
        },
    },
    comment: {
        width: "30%",
        overflowY: "scroll",
        height: "100%",
        padding: theme.spacing(0, 2),
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            overflowY: "hidden",
        },
    },
    username: { fontWeight: 500, color: theme.palette.grey[500] },
    timeago: { marginLeft: theme.spacing(1), color: theme.palette.grey[600] },
    inline: { display: "inline" },
    link: {
        "&:hover": {
            textDecoration: "underline",
            cursor: "pointer",
        },
    },
    topSection: { marginTop: theme.spacing(1) },
    avatar: {},
    titleSection: {
        marginLeft: theme.spacing(1),
    },
}));

const HomeFeed: React.FC<Props> = (props: Props) => {
    const classes = useHomeFeedStyles();
    const router = useRouter();
    const [hasMore, setHasMore] = useState(true);
    const authState = useAuthStore((state) => state.data);

    const fetchPage = async (page: number) => {
        const { data } = await getPostPage(page, authState.token);
        if (data.data.length == 0) {
            setHasMore(false);
        } else {
            props.updatePosts([...props.posts, ...data.data]);
        }
        return data;
    };

    const deletePost = (postId: number) => {
        props.updatePosts(
            props.posts.filter((value) => {
                if (postId != value.id) return value;
            })
        );
    };

    const getPostList = (post: Post[]) => {
        return post.map((item) => <PostItem item={item} key={item.id} deletePost={deletePost} />);
    };

    const closePostModal = () => {
        router.push("/", undefined, { scroll: false });
    };

    const getCommentList = (comments: Comment[]) => {
        return (
            <Box className={classes.commentListCardContent}>
                {comments.map((comment) => (
                    <CommentItem
                        postId={props.modalPost.id}
                        item={comment}
                        refetchComments={() => {}}
                        key={comment.id}
                    />
                ))}
            </Box>
        );
    };

    return (
        <Box className={classes.main}>
            {props.modalPost && (
                <Modal disablePortal open={!!router.query.postId} onClose={closePostModal} className={classes.modal}>
                    <Card className={classes.paper}>
                        {/* <ClearIcon className={classes.closeButton} onClick={closePostModal} /> */}
                        <CancelIcon fontSize="large" className={classes.closeButton} onClick={closePostModal} />
                        <Box className={classes.customFlex}>
                            <Box className={classes.media}>
                                <Media
                                    mediaUrl={props.modalPost.mediaUrl}
                                    mime={props.modalPost.mime}
                                    id={props.modalPost.id}
                                    cursor="pointer"
                                    // style={{ width: "100%" }}
                                />
                            </Box>
                            <Box className={classes.comment}>
                                <Box className={clsx(classes.flex, classes.topSection)}>
                                    <Box className={classes.avatar}>
                                        <Avatar
                                            src={props.modalPost.user.avatarUrl}
                                            alt={props.modalPost.user.username}
                                        />
                                    </Box>
                                    <Box className={classes.titleSection}>
                                        <Typography variant="h6" component="h1">
                                            {props.modalPost.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            component="h2"
                                            className={clsx(classes.inline, classes.username, classes.link)}
                                        >
                                            {props.modalPost.user.username}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            component="h2"
                                            className={clsx(classes.inline, classes.timeago)}
                                        >
                                            {props.modalPost.timeago}
                                        </Typography>
                                    </Box>
                                </Box>
                                {getCommentList(props.modalPostComment)}
                            </Box>
                        </Box>
                    </Card>
                </Modal>
            )}

            <InfiniteScroll pageStart={1} loadMore={fetchPage} hasMore={hasMore} loader={<CircularProgress key={0} />}>
                {props.posts && getPostList(props.posts)}
            </InfiniteScroll>
        </Box>
    );
};

export default HomeFeed;
