import React, { useContext } from "react";
import { ImArrowUp } from "react-icons/im";
import { EntityType, Event } from "../../../../analytics/Events";
import { AuthContext } from "../../../context/auth.context";
import useGlobalStore from "../../../state/global/global.store";
import postService from "../../../state/posts/post.service";

interface Props {
    commId: number;
    postId: number;
    checked: boolean;
    updateVoteState: (vote: number, voteSum: number) => void;
}

const CUpvoteButton: React.FC<Props> = (props: Props) => {
    const authState = useContext(AuthContext);
    const updateGlobalState = useGlobalStore((state) => state.updateState);

    const upvote = async () => {
        if (!authState.isLoggedIn) {
            updateGlobalState({ isLoginModalOpen: true });

            return;
        }
        if (!props.checked) {
            const { data } = await postService.cupvote(props.postId, props.commId);
            props.updateVoteState(data.data.vote, data.data.voteSum);

            Event.UPVOTE_BUTTON_CLICKED(props.commId, EntityType.COMMENT);
        } else {
            const { data } = await postService.cremoveVote(props.postId, props.commId);
            props.updateVoteState(data.data.vote, data.data.voteSum);

            Event.VOTE_REMOVED_BUTTON_CLICKED(props.commId, EntityType.COMMENT);
        }
    };

    const getColor = (): string => {
        if (props.checked) return "#347fe0";
        else return "#c4c4c4";
    };

    return <ImArrowUp onClick={upvote} color={getColor()} />;
};

export default CUpvoteButton;
