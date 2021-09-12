import React, { useContext } from "react";
import { EntityType, Event } from "../../../../analytics/Events";
import { AuthContext } from "../../../context/auth.context";
import useGlobalStore from "../../../state/global/global.store";
import { ImArrowDown } from "react-icons/im";
import { downvote as downvoteService, removeVote } from "../../../state/posts/post.service";
interface Props {
    id: number;
    checked: boolean;
    updateVoteState: (vote: number, voteSum: number) => void;
}

const DownvoteButton: React.FC<Props> = (props: Props) => {
    const authState = useContext(AuthContext);
    const updateGlobalStore = useGlobalStore((store) => store.updateState);

    const downvote = async () => {
        if (!authState.isLoggedIn) {
            updateGlobalStore({ isLoginModalOpen: true });
            return;
        }
        if (!props.checked) {
            const { data } = await downvoteService(props.id, authState.token);
            props.updateVoteState(data.data.vote, data.data.voteSum);

            Event.DOWNVOTE_BUTTON_CLICKED(props.id, EntityType.POST);
        } else {
            const { data } = await removeVote(props.id, authState.token);
            props.updateVoteState(data.data.vote, data.data.voteSum);

            Event.VOTE_REMOVED_BUTTON_CLICKED(props.id, EntityType.POST);
        }
    };

    const getColor = () => {
        if (props.checked) return "#9c1b1b";
        else return "#c4c4c4";
    };

    return <ImArrowDown onClick={downvote} color={getColor()} />;
};

export default DownvoteButton;
