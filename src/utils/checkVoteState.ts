import { Vote } from "../app/state/posts";

export const checkVoteState = (vote: number | undefined, isLoggedIn: boolean, voteState: Vote) => {
    if (vote === voteState && isLoggedIn) return true;
    else return false;
};
