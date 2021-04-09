import React, { useContext } from "react";
import { Post, Vote } from "../../state/posts";
import { Box, Text, Flex, ThemeUIStyleObject } from "theme-ui";
import Media from "../core/Media";
import UpvoteButton from "../core/Buttons/UpvoteButton";
import { AuthContext } from "../../context/auth.context";
import { checkVoteState } from "../../../utils/checkVoteState";
import DownvoteButton from "../core/Buttons/DownvoteButton";
import CommentButton from "../core/Buttons/CommentButton";
import { Link, useLocation } from "react-router-dom";
import Avatar from "../core/Avatar";

interface Props {
    item: Post;
}

const PostItem: React.FC<Props> = (props: Props) => {
    const location = useLocation();
    const authState = useContext(AuthContext);

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
                        style={{
                            color: "text",
                            textDecoration: "none",
                            display: "flex",
                        }}
                    >
                        <Text
                            sx={{
                                fontSize: 1,
                                color: "text",
                                fontWeight: "bold",
                                ml: 2,
                                my: "auto",
                                ":hover,:focus,:active": {
                                    color: "primary",
                                },
                            }}
                        >
                            {props.item.title}
                        </Text>
                    </Link>
                </Flex>
            </Flex>

            <Box sx={{ borderRadius: "default", overflow: "hidden", border: "1px solid #1f1f1f" }}>
                <Link to={{ pathname: `/posts/${props.item.id}` }}>
                    <Media mediaUrl={props.item.mediaUrl} mime={props.item.mime} id={props.item.id} cursor="pointer" />
                </Link>
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
