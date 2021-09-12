import React, { useContext } from "react";
import { ImArrowDown } from "react-icons/im";
import { EntityType, Event } from "../../../../analytics/Events";
import { AuthContext } from "../../../context/auth.context";
import useGlobalStore from "../../../state/global/global.store";
import { cdownvote, cremoveVote } from "../../../state/posts/post.service";
interface Props {
    commId: number;
    postId: number;
    checked: boolean;
    updateVoteState: (vote: number, voteSum: number) => void;
}

const CDownvoteButton: React.FC<Props> = (props: Props) => {
    const updateGlobalState = useGlobalStore((state) => state.updateState);
    const authState = useContext(AuthContext);
    const downvote = async () => {
        if (!authState.isLoggedIn) {
            updateGlobalState({ isLoginModalOpen: true });

            return;
        }
        if (!props.checked) {
            const { data } = await cdownvote(props.postId, props.commId, authState.token);
            props.updateVoteState(data.data.vote, data.data.voteSum);

            Event.DOWNVOTE_BUTTON_CLICKED(props.commId, EntityType.COMMENT);
        } else {
            const { data } = await cremoveVote(props.postId, props.commId, authState.token);
            props.updateVoteState(data.data.vote, data.data.voteSum);

            Event.VOTE_REMOVED_BUTTON_CLICKED(props.commId, EntityType.COMMENT);
        }
    };

    const getColor = () => {
        if (props.checked) return "#9c1b1b";
        else return "#c4c4c4";
    };

    return <ImArrowDown onClick={downvote} color={getColor()} />;
};

export default CDownvoteButton;
