import { Post } from "./post.model";
import { useObservable } from "../../../utils/useObservable";
import { postService } from "./post.service";
import { postQuery } from "./post.query";

export type PostFeedHook = [Post[]];

export function usePostFeedHook(): PostFeedHook {
    const [postFeed] = useObservable(postService.homefeed$, []);
    return [postFeed];
}

export function usePostHook(id: number): [Post | undefined] {
    const [post] = useObservable(postQuery.selectPost(id));
    return [post];
}
