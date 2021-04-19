import React, { useContext } from "react";
import { Box } from "theme-ui";
import { AuthContext } from "../../../context/auth.context";
import { globalService } from "../../../state/global/global.service";
import { postService } from "../../../state/posts";
import { Downvote } from "../../Icons";

interface Props {
    commId: number;
    postId: number;
    checked: boolean;
    activeColor?: string;
    color?: string;
}

const CDownvoteButton: React.FC<Props> = (props: Props) => {
    const authState = useContext(AuthContext);
    const downvote = () => {
        if (!authState.isLoggedIn) {
            globalService.setIsSignInModalOpen(true);
            return;
        }
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
                    backgroundColor: "secondaryLight",
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
