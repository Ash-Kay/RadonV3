import React, { useEffect } from "react";
import { Post, postService, Comment } from "../../state/posts";
import { useAuthStateHook } from "../../state/auth/auth.hook";
import CommentItem from "../CommentItem";
import { Box, Button, Text, Flex, Image } from "rebass";
import { Input } from "@rebass/forms";
import Avatar from "../core/Avatar";
import { Upvote, Downvote, PaperClip, CloseRound } from "../Icons";
import Media from "../core/Media";

interface Props {
    item: Post;
}
export interface CommentForm {
    comment: string;
    file: File | null | undefined;
    //tagTo: number;
}

const PostItem = (props: Props) => {
    const [upvoted, setIsUpvoted] = React.useState(false);
    const [downvoted, setIsDownvoted] = React.useState(false);
    const [commentForm, setCommentForm] = React.useState(emptyCommentForm);
    const [authState] = useAuthStateHook();
    const hiddenCommentFileInput = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (props.item.vote !== null && props.item.vote !== undefined) {
            if (props.item.vote > 0) setIsUpvoted(true);
            if (props.item.vote < 0) setIsDownvoted(true);
        }
        postService.getComments(props.item.id);
        postService.getVoteSum(props.item.id);
    }, []);

    const upvote = (checked: boolean) => {
        if (!authState.isLoggedIn) return;
        setIsUpvoted(checked);
        if (checked) {
            setIsDownvoted(false);
            postService.upvote(props.item.id, authState.token);
        } else postService.removeVote(props.item.id, authState.token);
    };
    const downvote = (checked: boolean) => {
        if (!authState.isLoggedIn) return;
        setIsDownvoted(checked);
        if (checked) {
            setIsUpvoted(false);
            postService.downvote(props.item.id, authState.token);
        } else postService.removeVote(props.item.id, authState.token);
    };

    const getCommentList = (comments: Comment[]) => {
        if (comments === undefined) {
            return <h4>Loading Comments...</h4>;
        }

        return comments.map((item) => <CommentItem item={item} key={item.id} />);
    };

    const postComment = () => {
        //TODO show login modal
        if (!authState.isLoggedIn) return;
        postService.postComment(props.item.id, commentForm, authState.token);
        //TODO only clear if success
        setCommentForm(emptyCommentForm);
    };

    const commentInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            postComment();
        }
    };

    //#region Style
    const postItemStyle = {
        background: "#fff",
        p: "1rem",
        pt: "0.5rem",
        marginBottom: "1rem",
        borderRadius: "5px",
    };

    const commentStyle = {
        borderRadius: "16px",
        borderColor: "transparent",
        backgroundColor: "#ededed",
        marginRight: "0.5rem",
        marginLeft: "2rem",
    };
    //#endregion

    return (
        <Box sx={postItemStyle}>
            <Flex sx={{ marginBottom: "1rem" }}>
                <Flex sx={{ flexDirection: "column" }}>
                    <Text fontSize={18} fontWeight="bold">
                        {props.item.title}
                    </Text>
                    <Flex sx={{ marginTop: "0.5rem" }}>
                        <Avatar avatarUrl={props.item.user.avatarUrl} height={20} width={20} />
                        <Text sx={{ marginLeft: "0.5rem", fontSize: 16, fontWeight: "bold" }}>
                            {props.item.user.username}
                        </Text>
                        <Text fontSize={16} sx={{ marginLeft: "0.5rem", color: "#5c5c5c" }}>
                            {props.item.timeago}
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
            <Media mediaUrl={props.item.mediaUrl} mime={props.item.mime} />
            <Flex>
                <Box onClick={() => upvote(!upvoted)} sx={{ cursor: "pointer", my: "auto" }}>
                    <Upvote isChecked={upvoted} />
                </Box>
                <Box sx={{ px: "0.5rem" }}>{props.item.voteSum}</Box>
                <Box onClick={() => downvote(!downvoted)} sx={{ cursor: "pointer", my: "auto" }}>
                    <Downvote isChecked={downvoted} />
                </Box>
            </Flex>
            <Box sx={{ backgroundColor: "#d1d1d1", height: 1, my: "0.5rem" }} />
            <Box>{getCommentList(props.item.comment)}</Box>
            <Flex>
                <Input
                    value={commentForm.comment}
                    onChange={(e) => setCommentForm({ ...commentForm, comment: e.currentTarget.value })}
                    placeholder="Commnet"
                    sx={commentStyle}
                    onKeyDown={commentInputKeyDown}
                />
                <Box
                    sx={{ cursor: "pointer", my: "auto" }}
                    onClick={() => {
                        hiddenCommentFileInput.current?.click();
                    }}
                >
                    <PaperClip color={commentForm.file !== null ? "#2ce" : undefined} />
                    <Input
                        onChange={(e) => setCommentForm({ ...commentForm, file: e.currentTarget.files?.item(0) })}
                        ref={hiddenCommentFileInput}
                        type="file"
                        sx={{ display: "none" }}
                    />
                </Box>
            </Flex>
            {commentForm.file && (
                <Flex>
                    <Text fontSize={12} fontWeight="bold" sx={{ ml: "2.5rem", mr: "0.5rem" }}>
                        {commentForm.file?.name}
                    </Text>
                    <Box onClick={(e) => setCommentForm({ ...commentForm, file: null })}>
                        <CloseRound width={12} />
                    </Box>
                </Flex>
            )}
        </Box>
    );
};

export default PostItem;

const emptyCommentForm: CommentForm = {
    comment: "",
    file: null,
};
