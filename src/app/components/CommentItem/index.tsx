import React, { useContext, useState } from "react";
import { Comment, postService, Vote } from "../../state/posts";
import { Box, Flex, Text } from "theme-ui";
import Avatar from "../core/Avatar";
import Media from "../core/Media";
import { AuthContext } from "../../context/auth.context";
import CUpvoteButton from "../core/Buttons/CUpvoteButton";
import { checkVoteState } from "../../../utils/checkVoteState";
import CDownvoteButton from "../core/Buttons/CDownvoteButton";
import ChevronDownButton from "../core/Buttons/ChevronDownButton";
import DropDownItem from "../core/DropDownItem";

interface Props {
    postId: number;
    item: Comment;
}

const CommentItem = (props: Props) => {
    const authState = useContext(AuthContext);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

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
                        <Text sx={{ fontSize: 3, fontWeight: "bold" }}>{props.item.user.username}</Text>
                        <Text paddingLeft="0.5rem" color="#5c5c5c" sx={{ fontSize: 3 }}>
                            {props.item.timeago}
                        </Text>
                        {authState.isLoggedIn && (
                            <Box sx={{ position: "relative", marginLeft: "auto" }}>
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
                                            backgroundColor: "rgba(255, 110, 110, 0.589)",
                                        }}
                                        onClick={() => setDropdownOpen(false)}
                                    />
                                )}

                                {isDropdownOpen && (
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            right: 0,
                                            color: "black",
                                            backgroundColor: "white",
                                            zIndex: 101,
                                            border: "1px solid rgba(0, 0, 0, 0.15)",
                                            borderRadius: "5px",
                                        }}
                                    >
                                        <DropDownItem text={"Report"} />
                                        {props.item.user.id === authState.id && (
                                            <DropDownItem
                                                text={"Delete"}
                                                onClickCallback={() =>
                                                    postService.softDeleteComment(
                                                        props.postId,
                                                        props.item.id,
                                                        authState.token
                                                    )
                                                }
                                            />
                                        )}
                                    </Box>
                                )}
                            </Box>
                        )}
                    </Flex>
                    {props.item.mediaUrl && (
                        <Media mediaUrl={props.item.mediaUrl} mime={props.item.mime} id={props.item.id} />
                    )}
                    {props.item.message}
                </Box>
            </Flex>
            <Flex sx={{ justifyContent: "flex-start", mb: "0.5rem", ml: "2.5rem" }}>
                <CUpvoteButton
                    postId={props.postId}
                    commId={props.item.id}
                    checked={checkVoteState(props.item.vote, authState.isLoggedIn, Vote.UPVOTED)}
                />
                <Text sx={{ px: "0.5rem", py: "6px", fontSize: 3 }}>
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
