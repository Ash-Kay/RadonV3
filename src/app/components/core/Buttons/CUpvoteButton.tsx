import React, { useContext } from "react";
import { Box } from "theme-ui";
import { AuthContext } from "../../../context/auth.context";
import { postService } from "../../../state/posts";
import { Upvote } from "../../Icons";

interface Props {
    commId: number;
    postId: number;
    checked: boolean;
    activeColor?: string;
    color?: string;
}

const CUpvoteButton: React.FC<Props> = (props: Props) => {
    const authState = useContext(AuthContext);

    const upvote = () => {
        //TODO show login modal
        if (!authState.isLoggedIn) return;
        if (!props.checked) {
            postService.cupvote(props.postId, props.commId, authState.token);
        } else postService.cremoveVote(props.postId, props.commId, authState.token);
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
                    backgroundColor: "secondaryLight",
                },
                "> svg": { fill: getColor },
            }}
        >
            <Upvote />
        </Box>
    );
};

export default CUpvoteButton;

CUpvoteButton.defaultProps = {
    color: "voteDefault",
    activeColor: "upvoteActive",
};
