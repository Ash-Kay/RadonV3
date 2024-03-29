import React, { useContext, useEffect } from "react";
import { EntityType, Event } from "../../../../analytics/Events";
import { AuthContext } from "../../../context/auth.context";
import useGlobalStore from "../../../state/global/global.store";
import { ImArrowUp } from "react-icons/im";
import { upvote as upvoteService, removeVote } from "../../../state/posts/post.service";
interface Props {
    id: number;
    checked: boolean;
    updateVoteState: (vote: number, voteSum: number) => void;
}

const UpvoteButton: React.FC<Props> = (props: Props) => {
    const authState = useContext(AuthContext);
    const updateGlobalStore = useGlobalStore((store) => store.updateState);

    const upvote = async () => {
        if (!authState.isLoggedIn) {
            updateGlobalStore({ isLoginModalOpen: true });
            return;
        }
        if (!props.checked) {
            const { data } = await upvoteService(props.id, authState.token);
            props.updateVoteState(data.data.vote, data.data.voteSum);

            Event.UPVOTE_BUTTON_CLICKED(props.id, EntityType.POST);
        } else {
            const { data } = await removeVote(props.id, authState.token);
            props.updateVoteState(data.data.vote, data.data.voteSum);

            Event.VOTE_REMOVED_BUTTON_CLICKED(props.id, EntityType.POST);
        }
    };

    const getColor = (): string => {
        if (props.checked) return "#347fe0";
        else return "#c4c4c4";
    };

    return <ImArrowUp onClick={upvote} color={getColor()} />;
};

export default UpvoteButton;
