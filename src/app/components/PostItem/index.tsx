import React, { useContext, useEffect, useRef, useState } from "react";
import { Post, Vote, Comment } from "../../state/posts/post.model";
import Media from "../core/Media";
import UpvoteButton from "../core/Buttons/UpvoteButton";
import { AuthContext } from "../../context/auth.context";
import { checkVoteState } from "../../../utils/checkVoteState";
import DownvoteButton from "../core/Buttons/DownvoteButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ReportIcon from "@material-ui/icons/Report";
import {
    Card,
    CardHeader,
    IconButton,
    makeStyles,
    Avatar,
    CardActions,
    Typography,
    Collapse,
    CardContent,
    Menu,
    MenuItem,
    Box,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { VscComment } from "react-icons/vsc";
import CommentInput from "../CommentInput";
import CommentItem from "../CommentItem";
import { getComments, softDeletePost } from "../../state/posts/post.service";
import { useQuery } from "react-query";
import { AxiosResponse } from "axios";
import ConditionalComponent from "../ConditionalComponent";
import clsx from "clsx";

interface Props {
    item: Post;
    fullScreenPost?: boolean;
    deletePost?: (postId: number) => void;
}

const usePostItemStyles = makeStyles((theme) => ({
    postItem: {
        borderRadius: "default",
        backgroundColor: "secondary",
        marginBottom: theme.spacing(2),
    },
    upvote: {
        marginLeft: theme.spacing(2),
    },
    voteCount: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    downvote: {},
    comment: {
        marginLeft: theme.spacing(1),
    },
    commentInput: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    commentListCardContent: {
        "&>div:not(:first-child)": {
            marginTop: theme.spacing(1),
        },
    },
    menuOptionLabel: {
        marginLeft: theme.spacing(1),
    },
    inline: { display: "inline" },
    bold: { fontWeight: 500 },
    timeago: { marginLeft: theme.spacing(2) },
}));

const PostItem: React.FC<Props> = (props: Props) => {
    const classes = usePostItemStyles();
    const authState = useContext(AuthContext);
    const [expanded, setExpanded] = useState(false || props.fullScreenPost);
    const [vote, setVote] = useState<number>(props.item.vote ? props.item.vote : 0);
    const [voteSum, setVoteSum] = useState<number>(props.item.voteSum ? props.item.voteSum : 0);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handlePostDelete = async () => {
        const { data } = await softDeletePost(props.item.id, authState.token);
        props.deletePost?.(props.item.id);

        setAnchorEl(null);
    };

    const {
        isIdle: isCommentsFetchingIdle,
        isLoading: isCommentsLoading,
        isFetched: isCommetsFetched,
        error: commentsFetchError,
        data: commentsResponse,
        refetch: refetchComments,
    } = useQuery<AxiosResponse<Comment[]>>(
        ["comments", props.item.id],
        () => getComments(props.item.id, authState.token).then((response) => response.data),
        { enabled: false }
    );

    const getCommentList = () => {
        if (isCommetsFetched && commentsResponse?.data.length) {
            return (
                <CardContent className={classes.commentListCardContent}>
                    {commentsResponse?.data.map((comment) => (
                        <CommentItem
                            postId={props.item.id}
                            item={comment}
                            refetchComments={refetchComments}
                            key={comment.id}
                        />
                    ))}
                </CardContent>
            );
        }
    };

    const handleCommentActionClicked = () => {
        if (props.fullScreenPost) return;

        if (!expanded && isCommentsFetchingIdle) {
            refetchComments();
        }

        setExpanded(!expanded);
    };

    const updateVoteState = (vote: number, voteSum: number) => {
        setVote(vote);
        setVoteSum(voteSum);
    };

    useEffect(() => {
        if (props.fullScreenPost) refetchComments();
    }, []);

    return (
        <Card className={classes.postItem}>
            <CardHeader
                avatar={<Avatar src={props.item.user.avatarUrl} alt={props.item.user.username} />}
                action={
                    <ConditionalComponent shouldShow={authState.isLoggedIn}>
                        <IconButton aria-label="settings" onClick={handleClick}>
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            variant="selectedMenu"
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                        >
                            <ConditionalComponent shouldShow={authState.id === props.item.user.id}>
                                <MenuItem onClick={handlePostDelete}>
                                    <DeleteIcon color="error" />
                                    <Typography variant="body2" className={classes.menuOptionLabel} color="error">
                                        Delete Post
                                    </Typography>
                                </MenuItem>
                            </ConditionalComponent>

                            <MenuItem onClick={handleClose}>
                                <ReportIcon />
                                <Typography variant="body2" className={classes.menuOptionLabel}>
                                    Report
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </ConditionalComponent>
                }
                title={
                    <Typography variant="body2" component="h1">
                        {props.item.title}
                    </Typography>
                }
                subheader={
                    <Box>
                        <Typography variant="body2" component="h2" className={clsx(classes.inline, classes.bold)}>
                            {props.item.user.username}
                        </Typography>
                        <Typography variant="body2" component="h2" className={clsx(classes.inline, classes.timeago)}>
                            {props.item.timeago}
                        </Typography>
                    </Box>
                }
            />

            <Media
                mediaUrl={props.item.mediaUrl}
                mime={props.item.mime}
                id={props.item.id}
                cursor="pointer"
                fullScreenPost={props.fullScreenPost}
            />

            <CardActions disableSpacing>
                <IconButton aria-label="upvote" className={classes.upvote}>
                    <UpvoteButton
                        id={props.item.id}
                        checked={checkVoteState(vote, authState.isLoggedIn, Vote.UPVOTED)}
                        updateVoteState={updateVoteState}
                    />
                </IconButton>
                <Typography className={classes.voteCount}>{voteSum ? voteSum : "0"}</Typography>
                <IconButton aria-label="downvote" className={classes.downvote}>
                    <DownvoteButton
                        id={props.item.id}
                        checked={checkVoteState(vote, authState.isLoggedIn, Vote.DOWNVOTED)}
                        updateVoteState={updateVoteState}
                    />
                </IconButton>
                <IconButton aria-label="downvote" className={classes.comment} onClick={handleCommentActionClicked}>
                    <VscComment />
                </IconButton>
            </CardActions>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardActions className={classes.commentInput}>
                    <CommentInput postId={props.item.id} refetchComments={refetchComments} />
                </CardActions>
                {getCommentList()}
            </Collapse>
        </Card>
    );
};

export default PostItem;
