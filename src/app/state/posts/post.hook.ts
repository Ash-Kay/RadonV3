import { Post } from "./post.model";
import { useObservable } from "../../../utils/useObservable";
import { postService } from "./post.service";

export type PostHook = [Post[]];

export function usePostHook(): PostHook {
    const [postFeed] = useObservable(postService.homefeed$, []);

    return [postFeed];
}
