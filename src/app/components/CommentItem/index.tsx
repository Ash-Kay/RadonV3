import React, { useContext, useState } from "react";
import ReactMarkdown, { NodeType } from "react-markdown";
import { Comment, postService, Vote } from "../../state/posts";
import { Box, Flex, Text, ThemeUIStyleObject } from "theme-ui";
import Avatar from "../core/Avatar";
import Media from "../core/Media";
import { AuthContext } from "../../context/auth.context";
import CUpvoteButton from "../core/Buttons/CUpvoteButton";
import { checkVoteState } from "../../../utils/checkVoteState";
import CDownvoteButton from "../core/Buttons/CDownvoteButton";
import ChevronDownButton from "../core/Buttons/ChevronDownButton";
import DropDownItem from "../core/DropDownItem";
import DropDown from "../core/DropDown";
import { MdDelete } from "react-icons/md";
import { GoAlert } from "react-icons/go";

interface Props {
    postId: number;
    item: Comment;
}

const CommentItem: React.FC<Props> = (props: Props) => {
    const authState = useContext(AuthContext);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const disallowedTypes: NodeType[] = ["image", "link", "listItem", "list"];

    const commentBlock: ThemeUIStyleObject = {
        p: 1,
        backgroundColor: "secondary",
        marginLeft: "0.5rem",
        borderRadius: "default",
        ">p": {
            whiteSpace: "pre-line",
        },
    };

    return (
        <Box>
            <Flex>
                <Avatar avatarUrl={props.item.user.avatarUrl} sx={{ marginTop: "5px" }} />
                <Box sx={commentBlock}>
                    <Flex>
                        <Text sx={{ fontWeight: "bold" }}>{props.item.user.username}</Text>
                        <Text paddingLeft="0.5rem" color="#5c5c5c">
                            {props.item.timeago}
                        </Text>
                        {authState.isLoggedIn && (
                            <Box sx={{ position: "relative", marginLeft: "auto" }}>
                                <ChevronDownButton
                                    onClick={() => {
                                        setDropdownOpen(true);
                                    }}
                                />
                                {isDropdownOpen && (
                                    <DropDown
                                        sx={{
                                            position: "absolute",
                                            right: 0,
                                            zIndex: "modal",
                                        }}
                                        onOutsideClick={() => setDropdownOpen(false)}
                                    >
                                        <DropDownItem text={"Report"} icon={<GoAlert />} />
                                        {props.item.user.id === authState.id && (
                                            <DropDownItem
                                                text={"Delete"}
                                                icon={<MdDelete />}
                                                onClickCallback={() =>
                                                    postService.softDeleteComment(
                                                        props.postId,
                                                        props.item.id,
                                                        authState.token
                                                    )
                                                }
                                                iconColor="error"
                                                textColor="error"
                                            />
                                        )}
                                    </DropDown>
                                )}
                            </Box>
                        )}
                    </Flex>
                    {props.item.mediaUrl && (
                        <Media
                            mediaUrl={props.item.mediaUrl}
                            mime={props.item.mime}
                            id={props.item.id}
                            imageSx={{ width: "auto" }}
                        />
                    )}
                    <Box sx={{ pt: 2, pb: 1 }}>
                        <ReactMarkdown disallowedTypes={disallowedTypes}>{props.item.message}</ReactMarkdown>
                    </Box>
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
