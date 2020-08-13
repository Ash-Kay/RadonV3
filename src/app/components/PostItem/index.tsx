import React, { useEffect } from "react";
import { Post, postService, Comment } from "../../state/posts";
import { useAuthStateHook } from "../../state/auth/auth.hook";
import CommentItem from "../CommentItem";
import { Box, Button, Text, Flex, Image } from "rebass";
import { Input, Label, Checkbox } from "@rebass/forms";
import Avatar from "../core/Avatar";
import { Upvote } from "../Icons";
import Downvote from "../Icons/Downvote";

interface Props {
    item: Post;
}
interface MediaProps {
    mediaUrl: string;
    mime: string;
}

const Media = (props: MediaProps) => {
    if (props.mime.startsWith("image"))
        return <img style={{ width: "100%" }} src={"http://localhost:3000/" + props.mediaUrl} alt="" />;
    else
        return (
            <video width="100%" controls>
                <source src={"http://localhost:3000/" + props.mediaUrl} type={props.mime} />
            </video>
        );
};

const PostItem = (props: Props) => {
    const [upvoted, setIsUpvoted] = React.useState(false);
    const [downvoted, setIsDownvoted] = React.useState(false);
    const [commentText, setCommentText] = React.useState("");
    const [authState] = useAuthStateHook();

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
        postService.postComment(props.item.id, commentText, "", authState.token);
        //TODO only clear if success
        setCommentText("");
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
        marginRight: "1rem",
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
                        <Avatar
                            avatarUrl={props.item.user.avatarUrl}
                            focusRingColor="#00000044"
                            height={20}
                            width={20}
                        />
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
                <Box onClick={() => upvote(!upvoted)} sx={{ cursor: "pointer" }}>
                    <Upvote size={20} sizeViewbox={30} isChecked={upvoted} />
                    {/* <Checkbox checked={upvoted} onChange={(e) => upvote(e.currentTarget.checked)} /> */}
                </Box>
                <Box>{props.item.voteSum}</Box>
                <Box onClick={() => downvote(!downvoted)} sx={{ cursor: "pointer" }}>
                    <Downvote size={20} sizeViewbox={30} isChecked={downvoted} />
                    {/* <Checkbox checked={downvoted} onChange={(e) => downvote(e.currentTarget.checked)} /> */}
                </Box>
            </Flex>
            <Box sx={{ backgroundColor: "#d1d1d1", height: 1, my: "0.5rem" }} />
            <Box>{getCommentList(props.item.comment)}</Box>
            <Flex>
                <Input
                    value={commentText}
                    onChange={(e) => setCommentText(e.currentTarget.value)}
                    placeholder="Commnet"
                    sx={commentStyle}
                />
                <Button onClick={postComment} sx={{ borderRadius: "16px" }}>
                    Submit
                </Button>
            </Flex>
        </Box>
    );
};

export default PostItem;
