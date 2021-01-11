import React, { useContext } from "react";
import { Box } from "theme-ui";
import { AuthContext } from "../../../context/auth.context";
import { postService } from "../../../state/posts";
import { Upvote } from "../../Icons";

interface Props {
    id: number;
    checked: boolean;
    activeColor: string;
    color: string;
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

    const getColor = () => {
        if (props.checked) return props.activeColor;
        else return props.color;
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
                    backgroundColor: "actionBarIconHighlightBackground",
                },
                "> svg": { fill: getColor },
            }}
        >
            <Upvote />
        </Box>
    );
};

export default UpvoteButton;

UpvoteButton.defaultProps = {
    color: "voteDefault",
    activeColor: "upvoteActive",
};
