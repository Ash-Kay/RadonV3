import React, { useContext, useState } from "react";
import { Post, postService, Vote } from "../../state/posts";
import { Box, Text, Flex, Link } from "theme-ui";
import Media from "../core/Media";
import UpvoteButton from "../core/Buttons/UpvoteButton";
import { AuthContext } from "../../context/auth.context";
import { checkVoteState } from "../../../utils/checkVoteState";
import DownvoteButton from "../core/Buttons/DownvoteButton";
import CommentButton from "../core/Buttons/CommentButton";
import SeeFullPostButton from "../core/Buttons/SeeFullPostButton";
import ChevronDownButton from "../core/Buttons/ChevronDownButton";
import DropDownItem from "../core/DropDownItem";

interface Props {
    item: Post;
}

const PostItem = (props: Props) => {
    const authState = useContext(AuthContext);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    //#region Style
    const postItemStyle = {
        backgroundColor: "foreground",
        pt: "0.5rem",
        marginBottom: "1rem",
        border: "1px solid rgba(0, 0, 0, 0.15)",
    };
    //#endregion

    return (
        <Box sx={postItemStyle}>
            <Flex sx={{ px: "10px", justifyContent: "space-between" }}>
                <Link
                    href={`/posts/${props.item.id}`}
                    sx={{
                        color: "black",
                        textDecoration: "none",
                        ":hover,:focus,:active": {
                            color: "primary",
                        },
                    }}
                >
                    <Text sx={{ fontSize: 3, fontWeight: "bold", color: "text" }}>{props.item.title}</Text>
                </Link>
                {authState.isLoggedIn && (
                    <Box sx={{ position: "relative" }}>
                        <ChevronDownButton
                            onClick={() => {
                                setDropdownOpen(true);
                            }}
                        />

                        {isDropdownOpen && authState.isLoggedIn && (
                            <Box
                                sx={{
                                    position: "fixed",
                                    top: 0,
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    width: "100%",
                                    height: "100%",
                                    zIndex: 100,
                                    backgroundColor: "debugColorBackground",
                                }}
                                onClick={() => setDropdownOpen(false)}
                            />
                        )}

                        {isDropdownOpen && (
                            <Box
                                sx={{
                                    position: "absolute",
                                    right: 0,
                                    color: "text",
                                    backgroundColor: "foreground",
                                    zIndex: 101,
                                    border: "1px solid rgba(0, 0, 0, 0.15)",
                                }}
                            >
                                <DropDownItem text={"Report"} />
                                {props.item.user.id === authState.id && (
                                    <DropDownItem
                                        text={"Delete"}
                                        onClickCallback={() =>
                                            postService.softDeletePost(props.item.id, authState.token)
                                        }
                                    />
                                )}
                            </Box>
                        )}
                    </Box>
                )}
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
                <Text sx={{ fontSize: 3, px: "0.5rem", lineHeight: "38px" }}>
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
