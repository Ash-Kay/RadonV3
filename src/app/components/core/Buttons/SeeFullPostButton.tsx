import React from "react";
import { Box, Text } from "theme-ui";

interface Props {}

const SeeFullPostButton = (props: Props) => {
    return (
        <Box
            sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                left: 0,
                height: "50px",
                cursor: "pointer",
                background: "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 100%)",
                color: "rgba(255, 255, 255, 0.7)",
                ":hover": {
                    color: "white",
                },
            }}
        >
            <Text
                sx={{
                    fontWeight: "bold",
                    position: "absolute",
                    bottom: 10,
                    left: "50%",
                    transform: "translateX(-50%)",
                }}
            >
                See Full Post
            </Text>
        </Box>
    );
};

export default SeeFullPostButton;
