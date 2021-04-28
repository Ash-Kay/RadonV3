import React, { useContext } from "react";
import { Box } from "theme-ui";
import { EntityType, Event } from "../../../../analytics/Events";
import { AuthContext } from "../../../context/auth.context";
import { globalService } from "../../../state/global/global.service";
import { postService } from "../../../state/posts";
import { Upvote } from "../../Icons";

interface Props {
    id: number;
    checked: boolean;
    activeColor?: string;
    color?: string;
}

const UpvoteButton: React.FC<Props> = (props: Props) => {
    const authState = useContext(AuthContext);

    const upvote = () => {
        if (!authState.isLoggedIn) {
            globalService.setIsSignInModalOpen(true);
            return;
        }
        if (!props.checked) {
            postService.upvote(props.id, authState.token);
            Event.UPVOTE_BUTTON_CLICKED(props.id, EntityType.POST);
        } else {
            postService.removeVote(props.id, authState.token);
            Event.VOTE_REMOVED_BUTTON_CLICKED(props.id, EntityType.POST);
        }
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

export default UpvoteButton;

UpvoteButton.defaultProps = {
    color: "voteDefault",
    activeColor: "upvoteActive",
};
