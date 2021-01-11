import React, { useContext } from "react";
import { Post, Vote } from "../../state/posts";
import { Box, Text, Flex, Link } from "theme-ui";
import Media from "../core/Media";
import UpvoteButton from "../core/Buttons/UpvoteButton";
import { AuthContext } from "../../context/auth.context";
import { checkVoteState } from "../../../utils/checkVoteState";
import DownvoteButton from "../core/Buttons/DownvoteButton";

interface Props {
    item: Post;
}
const FullScreenPostItem = (props: Props) => {
    const authState = useContext(AuthContext);

    //#region Style
    const postItemStyle = {
        background: "foreground",
        pt: "0.5rem",
        marginBottom: "1rem",
    };
    //#endregion

    return (
        <Box sx={postItemStyle}>
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
                <Text sx={{ fontSize: 3, fontWeight: "bold", color: "text" }}>{props.item.title}</Text>
            </Link>
            <Box sx={{ mt: "0.5rem", position: "relative" }}>
                <Media mediaUrl={props.item.mediaUrl} mime={props.item.mime} showFull id={props.item.id} />
            </Box>
            <Flex sx={{ mx: "4px", height: "40px" }}>
                <UpvoteButton
                    id={props.item.id}
                    checked={checkVoteState(props.item.vote, authState.isLoggedIn, Vote.UPVOTED)}
                />
                <Text sx={{ fontSize: 3, px: "0.5rem", py: "6px" }}>
                    {props.item.voteSum ? props.item.voteSum : "0"}
                </Text>
                <DownvoteButton
                    id={props.item.id}
                    checked={checkVoteState(props.item.vote, authState.isLoggedIn, Vote.DOWNVOTED)}
                />
            </Flex>
        </Box>
    );
};

export default FullScreenPostItem;
