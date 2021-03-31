import React, { useContext } from "react";
import { Box } from "theme-ui";
import { AuthContext } from "../../../context/auth.context";
import { postService } from "../../../state/posts";
import { Downvote } from "../../Icons";

interface Props {
    id: number;
    checked: boolean;
    activeColor?: string;
    color?: string;
}

const DownvoteButton: React.FC<Props> = (props: Props) => {
    const authState = useContext(AuthContext);

    const downvote = () => {
        //TODO show login modal
        if (!authState.isLoggedIn) return;
        if (!props.checked) {
            postService.downvote(props.id, authState.token);
        } else postService.removeVote(props.id, authState.token);
    };

    const getColor = () => {
        if (props.checked) return props.activeColor;
        else return props.color;
    };

    return (
        <Box
            onClick={() => downvote()}
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

export default DownvoteButton;

DownvoteButton.defaultProps = {
    color: "voteDefault",
    activeColor: "downvoteActive",
};
