import React from "react";
import { Comment } from "../../state/posts";
import { Box, Image } from "rebass";

interface Props {
    item: Comment;
}

const CommentItem = (props: Props) => {
    const commentBlock = {
        padding: "1rem",
        backgroundColor: "#e0fff3",
        margin: "2px",
    };

    return (
        <Box>
            <Image
                src={props.item.user.avatarUrl!}
                sx={{
                    width: 30,
                    height: 30,
                    borderRadius: 9999,
                }}
            />
            <h3>{props.item.user.username}</h3>
            <Box sx={commentBlock}>{props.item.message} </Box>
            <span>{props.item.timeago}</span>
        </Box>
    );
};

export default CommentItem;
