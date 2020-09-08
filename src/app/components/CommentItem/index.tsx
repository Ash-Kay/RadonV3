import React, { useContext } from "react";
import { Comment, Vote } from "../../state/posts";
import { Box, Flex, Text } from "rebass";
import Avatar from "../core/Avatar";
import Media from "../core/Media";
import { AuthContext } from "../../context/auth.context";
import CUpvoteButton from "../core/Buttons/CUpvoteButton";
import { checkVoteState } from "../../../utils/checkVoteState";
import CDownvoteButton from "../core/Buttons/CDownvoteButton";

interface Props {
    postId: number;
    item: Comment;
}

const CommentItem = (props: Props) => {
    const authState = useContext(AuthContext);

    const commentBlock = {
        borderRadius: "3px",
        padding: "5px",
        backgroundColor: "#ededed",
        marginLeft: "0.5rem",
        width: "100%",
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
                <CUpvoteButton
                    postId={props.postId}
                    commId={props.item.id}
                    checked={checkVoteState(props.item.vote, authState.isLoggedIn, Vote.UPVOTED)}
                />
                <Text fontSize="3" sx={{ px: "0.5rem", py: "6px" }}>
                    {props.item.voteSum ? props.item.voteSum : "0"}
                </Text>
                <CDownvoteButton
                    postId={props.postId}
                    commId={props.item.id}
                    checked={checkVoteState(props.item.vote, authState.isLoggedIn, Vote.DOWNVOTED)}
                />
            </Flex>
        </Box>
    );
};

export default CommentItem;
