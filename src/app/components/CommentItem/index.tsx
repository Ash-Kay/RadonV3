import React from "react";
import { Comment } from "../../state/posts";
import { Box, Image, Flex, Text } from "rebass";
import Avatar from "../core/Avatar";

interface Props {
    item: Comment;
}

const CommentItem = (props: Props) => {
    const commentBlock = {
        borderRadius: "3px",
        padding: "5px",
        backgroundColor: "#ededed",
        marginLeft: "0.5rem",
    };

    return (
        <Flex sx={{ marginBottom: "0.5rem" }}>
            <Avatar avatarUrl={props.item.user.avatarUrl} focusRingColor="#00000044" sx={{ marginTop: "5px" }} />
            <Box sx={commentBlock}>
                <Flex>
                    <Text fontSize={16} fontWeight="bold">
                        {props.item.user.username}
                    </Text>
                    <Text fontSize={16} paddingLeft="0.5rem" color="#5c5c5c">
                        {props.item.timeago}
                    </Text>
                </Flex>
                {props.item.message}
            </Box>
        </Flex>
    );
};

export default CommentItem;
