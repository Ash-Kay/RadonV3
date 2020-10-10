import React, { useContext } from "react";
import { Post, Vote } from "../../state/posts";
import { Box, Text, Flex, Link } from "rebass";
import Media from "../core/Media";
import UpvoteButton from "../core/Buttons/UpvoteButton";
import { AuthContext } from "../../context/auth.context";
import { checkVoteState } from "../../../utils/checkVoteState";
import DownvoteButton from "../core/Buttons/DownvoteButton";
import CommentButton from "../core/Buttons/CommentButton";
import SeeFullPostButton from "../core/Buttons/SeeFullPostButton";
import ChevronDownButton from "../core/Buttons/ChevronDownButton";

interface Props {
    item: Post;
}

const PostItem = (props: Props) => {
    const authState = useContext(AuthContext);

    //#region Style
    const postItemStyle = {
        background: "#fff",
        pt: "0.5rem",
        marginBottom: "1rem",
        border: "1px solid rgba(0,0,0,0.15)",
        borderRadius: "5px",
    };
    //#endregion

    return (
        <Box sx={postItemStyle}>
            <Flex justifyContent="space-between" sx={{ px: "10px" }}>
                <Link
                    href={`/posts/${props.item.id}`}
                    sx={{
                        color: "black",
                        textDecoration: "none",
                        ":hover,:focus,.active": {
                            color: "primary",
                        },
                    }}
                >
                    <Text fontSize="3" fontWeight="bold">
                        {props.item.title}
                    </Text>
                </Link>
                <ChevronDownButton />
            </Flex>
            <Box sx={{ mt: "0.5rem", position: "relative" }}>
                <Media mediaUrl={props.item.mediaUrl} mime={props.item.mime} id={props.item.id} />
                {props.item.height > props.item.width && (
                    <Link href={`/posts/${props.item.id}`}>
                        <SeeFullPostButton />
                    </Link>
                )}
            </Box>
            <Flex sx={{ mx: "4px", height: "40px" }}>
                <UpvoteButton
                    id={props.item.id}
                    checked={checkVoteState(props.item.vote, authState.isLoggedIn, Vote.UPVOTED)}
                />
                <Text fontSize="3" sx={{ px: "0.5rem", py: "6px" }}>
                    {props.item.voteSum ? props.item.voteSum : "0"}
                </Text>
                <DownvoteButton
                    id={props.item.id}
                    checked={checkVoteState(props.item.vote, authState.isLoggedIn, Vote.DOWNVOTED)}
                />
                <Link href={`/posts/${props.item.id}`}>
                    <CommentButton />
                </Link>
            </Flex>
        </Box>
    );
};

export default PostItem;
