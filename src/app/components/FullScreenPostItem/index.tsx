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
    const postItemStyle = {};
    //#endregion

    return (
        <>
            <Box sx={{ gridArea: "media", overflowY: "hidden" }}>
                <Text sx={{ fontSize: 3, fontWeight: "bold", color: "text" }}>{props.item.title}</Text>
                <Media mediaUrl={props.item.mediaUrl} mime={props.item.mime} id={props.item.id} />
            </Box>
            <Flex sx={{ mx: "4px", height: "40px", gridArea: "bottomBar" }}>
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
        </>
    );
};

export default FullScreenPostItem;
