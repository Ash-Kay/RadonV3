import { QueryEntity, QueryConfig, Order } from "@datorama/akita";
import { Observable } from "../../../utils/useObservable";
import { Post, Comment } from "./post.model";
import { PostState, PostStore, postStore } from "./post.store";

@QueryConfig({
    sortBy: "createdAt",
    sortByOrder: Order.DESC,
})
export class PostQuery extends QueryEntity<PostState> {
    homefeed$ = this.selectAll();

    selectPost(id: number): Observable<Post | undefined> {
        return this.selectEntity(id);
    }

    getCommentsFromEntity = (id: number): Comment[] => {
        const entity = this.getEntity(id);
        if (entity) {
            return entity.comment;
        }
        return [];
    };

    constructor(protected store: PostStore) {
        super(store);
    }
}

export const postQuery = new PostQuery(postStore);
