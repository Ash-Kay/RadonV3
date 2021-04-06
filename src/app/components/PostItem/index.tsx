import React, { useContext, useState } from "react";
import { Post, postService, Vote } from "../../state/posts";
import { Box, Text, Flex, ThemeUIStyleObject } from "theme-ui";
import Media from "../core/Media";
import UpvoteButton from "../core/Buttons/UpvoteButton";
import { AuthContext } from "../../context/auth.context";
import { checkVoteState } from "../../../utils/checkVoteState";
import DownvoteButton from "../core/Buttons/DownvoteButton";
import CommentButton from "../core/Buttons/CommentButton";
import ChevronDownButton from "../core/Buttons/ChevronDownButton";
import DropDownItem from "../core/DropDownItem";
import DropDown from "../core/DropDown";
import { Link, useLocation } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { GoAlert } from "react-icons/go";
import Avatar from "../core/Avatar";

interface Props {
    item: Post;
}

const PostItem: React.FC<Props> = (props: Props) => {
    const location = useLocation();
    const authState = useContext(AuthContext);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    //#region Style
    const postItemStyle: ThemeUIStyleObject = {
        borderRadius: "default",
        backgroundColor: "secondary",
        marginBottom: 2,
    };
    //#endregion

    return (
        <Box sx={postItemStyle}>
            <Flex sx={{ p: 1, justifyContent: "space-between" }}>
                <Flex>
                    <Avatar avatarUrl={props.item.user.avatarUrl} height={30} width={30} />
                    <Link
                        to={{ pathname: `/posts/${props.item.id}` }}
                        sx={{
                            color: "text",
                            textDecoration: "none",
                            ":hover,:focus,:active": {
                                color: "primary",
                            },
                        }}
                    >
                        <Text sx={{ fontSize: 1, color: "text", fontWeight: "bold", ml: 2, my: "auto" }} as="p">
                            {props.item.title}
                        </Text>
                    </Link>
                </Flex>
                {authState.isLoggedIn && false && (
                    <Box sx={{ position: "relative", minWidth: 22 }}>
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
                                            postService.softDeletePost(props.item.id, authState.token)
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

            <Box sx={{ borderRadius: "default", overflow: "hidden", border: "1px solid #1f1f1f" }}>
                <Media mediaUrl={props.item.mediaUrl} mime={props.item.mime} id={props.item.id} />
            </Box>

            <Flex sx={{ mx: "4px", height: "40px", justifyContent: "space-between" }}>
                <Flex>
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
                    <Link to={{ pathname: `/posts/${props.item.id}`, state: { background: location } }}>
                        <CommentButton />
                    </Link>
                </Flex>
            </Flex>
        </Box>
    );
};

export default PostItem;
