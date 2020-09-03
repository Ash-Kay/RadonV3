import React from "react";
import { Box } from "rebass";
import { Comment } from "../../Icons";

interface Props {}

const CommentButton = (props: Props) => {
    return (
        <Box sx={{ borderRadius: "circle", backgroundColor: "gray", p: 1 }}>
            <Comment />
        </Box>
    );
};

export default CommentButton;
