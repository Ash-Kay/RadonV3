import React, { useContext } from "react";
import { Box } from "theme-ui";
import { AuthContext } from "../../../context/auth.context";
import { postService } from "../../../state/posts";
import { Downvote } from "../../Icons";

interface Props {
    commId: number;
    postId: number;
    checked: boolean;
    activeColor: string;
    color: string;
}

const CDownvoteButton = (props: Props) => {
    const authState = useContext(AuthContext);
    const downvote = () => {
        //TODO show login modal
        if (!authState.isLoggedIn) return;
        if (!props.checked) {
            postService.cdownvote(props.postId, props.commId, authState.token);
        } else postService.cremoveVote(props.postId, props.commId, authState.token);
    };

    const getColor = () => {
        if (props.checked) return props.activeColor;
        else return props.color;
    };

    return (
        <Box
            onClick={downvote}
            sx={{
                cursor: "pointer",
                height: "32px",
                my: "4px",
                px: "1rem",
                py: "0.2rem",
                ":hover": {
                    backgroundColor: "actionBarIconHighlightBackground",
                },
                "> svg": { fill: getColor },
            }}
        >
            <Downvote />
        </Box>
    );
};

export default CDownvoteButton;

CDownvoteButton.defaultProps = {
    color: "voteDefault",
    activeColor: "downvoteActive",
};
