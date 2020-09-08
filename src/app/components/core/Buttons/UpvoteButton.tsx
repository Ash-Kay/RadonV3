import React, { useContext } from "react";
import { Box } from "rebass";
import { AuthContext } from "../../../context/auth.context";
import { postService } from "../../../state/posts";
import { Upvote } from "../../Icons";

interface Props {
    id: number;
    checked: boolean;
}

const UpvoteButton = (props: Props) => {
    const authState = useContext(AuthContext);

    const upvote = () => {
        //TODO show login modal
        if (!authState.isLoggedIn) return;
        if (!props.checked) {
            postService.upvote(props.id, authState.token);
        } else postService.removeVote(props.id, authState.token);
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

export default UpvoteButton;
