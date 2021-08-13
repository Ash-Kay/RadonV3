import React, { useContext, useState } from "react";
import ReactMarkdown, { NodeType } from "react-markdown";
import { Comment, Vote } from "../../state/posts/post.model";
import Media from "../core/Media";
import { AuthContext } from "../../context/auth.context";
import CUpvoteButton from "../core/Buttons/CUpvoteButton";
import { checkVoteState } from "../../../utils/checkVoteState";
import CDownvoteButton from "../core/Buttons/CDownvoteButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ReportIcon from "@material-ui/icons/Report";
import {
    Avatar,
    Box,
    Card,
    CardActions,
    CardHeader,
    IconButton,
    makeStyles,
    Menu,
    MenuItem,
    Typography,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ConditionalComponent from "../ConditionalComponent";
import postService from "../../state/posts/post.service";

interface Props {
    postId: number;
    item: Comment;
    refetchComments: () => void;
}

const useCommentItemStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
    },
    commentBoxText: {
        margin: theme.spacing(0, 2, 0, 2),
        "&>p": {
            margin: 0,
        },
    },
    commentBoxSection: {
        marginTop: theme.spacing(1),
    },
    //common
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

    cardHeader: {
        paddingBottom: 0,
    },

    //copy
    menuOptionLabel: {
        marginLeft: theme.spacing(1),
    },
}));

const CommentItem: React.FC<Props> = (props: Props) => {
    const classes = useCommentItemStyles();
    const authState = useContext(AuthContext);
    const disallowedTypes: NodeType[] = ["image", "link", "listItem", "list"];
    const [vote, setVote] = useState<number>(props.item.vote ? props.item.vote : 0);
    const [voteSum, setVoteSum] = useState<number>(props.item.voteSum ? props.item.voteSum : 0);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCommentDelete = async () => {
        const { data } = await postService.softDeleteComment(props.postId, props.item.id);

        if (data.success) {
            props.refetchComments();
        }

        setAnchorEl(null);
    };

    const updateVoteState = (vote: number, voteSum: number) => {
        setVote(vote);
        setVoteSum(voteSum);
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                className={classes.cardHeader}
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
                                <MenuItem onClick={handleCommentDelete}>
                                    <DeleteIcon color="error" />
                                    <Typography variant="body2" className={classes.menuOptionLabel} color="error">
                                        Delete Comment
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
                        {props.item.user.username}
                    </Typography>
                }
                subheader={
                    <Typography variant="body2" component="h2">
                        {props.item.timeago}
                    </Typography>
                }
            />
            <Box className={classes.commentBoxSection}>
                {props.item.mediaUrl && props.item.mime && (
                    <Media mediaUrl={props.item.mediaUrl} mime={props.item.mime} id={props.item.id} cursor="pointer" />
                )}

                <ReactMarkdown className={classes.commentBoxText} disallowedTypes={disallowedTypes}>
                    {props.item.message}
                </ReactMarkdown>
            </Box>

            <CardActions disableSpacing>
                <IconButton aria-label="upvote" className={classes.upvote}>
                    <CUpvoteButton
                        postId={props.postId}
                        commId={props.item.id}
                        checked={checkVoteState(vote, authState.isLoggedIn, Vote.UPVOTED)}
                        updateVoteState={updateVoteState}
                    />
                </IconButton>
                <Typography className={classes.voteCount}> {voteSum ? voteSum : "0"}</Typography>
                <IconButton aria-label="downvote" className={classes.downvote}>
                    <CDownvoteButton
                        postId={props.postId}
                        commId={props.item.id}
                        checked={checkVoteState(vote, authState.isLoggedIn, Vote.DOWNVOTED)}
                        updateVoteState={updateVoteState}
                    />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default CommentItem;
