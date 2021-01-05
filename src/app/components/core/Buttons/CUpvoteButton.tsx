import React, { useContext } from "react";
import { Box } from "theme-ui";
import { AuthContext } from "../../../context/auth.context";
import { postService } from "../../../state/posts";
import { Upvote } from "../../Icons";

interface Props {
    commId: number;
    postId: number;
    checked: boolean;
}

const CUpvoteButton = (props: Props) => {
    const authState = useContext(AuthContext);
    const upvote = () => {
        //TODO show login modal
        if (!authState.isLoggedIn) return;
        if (!props.checked) {
            postService.cupvote(props.postId, props.commId, authState.token);
        } else postService.cremoveVote(props.postId, props.commId, authState.token);
    };

    return (
        <Box
            onClick={upvote}
            sx={{
                cursor: "pointer",
                height: "32px",
                my: "4px",
                px: "1rem",
                py: "0.2rem",
                ":hover": {
                    backgroundColor: "gray",
                },
            }}
        >
            <Upvote isChecked={props.checked} />
        </Box>
    );
};

export default CUpvoteButton;
