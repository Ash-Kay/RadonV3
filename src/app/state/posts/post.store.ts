import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";
import { Post } from "./post.model";

export interface PostState extends EntityState<Post, number> {}

@StoreConfig({ name: "posts" })
export class PostStore extends EntityStore<PostState> {
    constructor() {
        super();
    }
}

export const postStore = new PostStore();
