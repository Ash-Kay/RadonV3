import { QueryEntity } from "@datorama/akita";
import { PostState, PostStore, postStore } from "./post.store";

export class PostQuery extends QueryEntity<PostState> {
    homefeed$ = this.selectAll();

    constructor(protected store: PostStore) {
        super(store);
    }
}

export const postQuery = new PostQuery(postStore);
