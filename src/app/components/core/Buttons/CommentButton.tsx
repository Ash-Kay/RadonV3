import React from "react";
import { Box } from "theme-ui";
import { Comment } from "../../Icons";

const CommentButton: React.FC = () => {
    return (
        <Box
            sx={{
                cursor: "pointer",
                height: "32px",
                my: "4px",
                px: "1rem",
                py: "0.2rem",
                ":hover": {
                    backgroundColor: "secondaryLight",
                },
            }}
        >
            <Comment />
        </Box>
    );
};

export default CommentButton;
