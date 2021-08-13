import { Vote } from "../app/state/posts/post.model";

export const checkVoteState = (vote: number | undefined, isLoggedIn: boolean, voteState: Vote): boolean => {
    if (vote === voteState && isLoggedIn) return true;
    else return false;
};
