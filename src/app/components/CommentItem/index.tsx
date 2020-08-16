import React from "react";
import { Comment, postService } from "../../state/posts";
import { Box, Flex, Text } from "rebass";
import Avatar from "../core/Avatar";
import Media from "../core/Media";
import { Upvote, Downvote } from "../Icons";
import { useAuthStateHook } from "../../state/auth/auth.hook";

interface Props {
    item: Comment;
}

const CommentItem = (props: Props) => {
    const [authState] = useAuthStateHook();
    const [upvoted, setIsUpvoted] = React.useState(false);
    const [downvoted, setIsDownvoted] = React.useState(false);

    const upvote = (checked: boolean) => {
        if (!authState.isLoggedIn) return;
        setIsUpvoted(checked);
        if (checked) {
            setIsDownvoted(false);
            postService.cupvote(props.item.id, authState.token);
        } else postService.cremoveVote(props.item.id, authState.token);
    };
    const downvote = (checked: boolean) => {
        if (!authState.isLoggedIn) return;
        setIsDownvoted(checked);
        if (checked) {
            setIsUpvoted(false);
            postService.cdownvote(props.item.id, authState.token);
        } else postService.cremoveVote(props.item.id, authState.token);
    };

    const commentBlock = {
        borderRadius: "3px",
        padding: "5px",
        backgroundColor: "#ededed",
        marginLeft: "0.5rem",
    };

    return (
        <Box>
            <Flex sx={{ maxWidth: "80%" }}>
                <Avatar avatarUrl={props.item.user.avatarUrl} sx={{ marginTop: "5px" }} />
                <Box sx={commentBlock}>
                    <Flex>
                        <Text fontSize={16} fontWeight="bold">
                            {props.item.user.username}
                        </Text>
                        <Text fontSize={16} paddingLeft="0.5rem" color="#5c5c5c">
                            {props.item.timeago}
                        </Text>
                    </Flex>
                    {props.item.mediaUrl && <Media mediaUrl={props.item.mediaUrl} mime={props.item.mime} />}
                    {props.item.message}
                </Box>
            </Flex>
            <Flex sx={{ justifyContent: "flex-start", mb: "0.5rem", ml: "2.5rem" }}>
                <Box onClick={() => upvote(!upvoted)} sx={{ cursor: "pointer" }}>
                    <Upvote isChecked={upvoted} />
                </Box>
                <Box sx={{}}>2k</Box>
                <Box onClick={() => downvote(!downvoted)} sx={{ cursor: "pointer" }}>
                    <Downvote isChecked={downvoted} />
                </Box>
            </Flex>
        </Box>
    );
};

export default CommentItem;
