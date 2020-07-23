import { QueryEntity, QueryConfig, Order } from "@datorama/akita";
import { PostState, PostStore, postStore } from "./post.store";

@QueryConfig({
    sortBy: "createdAt",
    sortByOrder: Order.DESC,
})
export class PostQuery extends QueryEntity<PostState> {
    homefeed$ = this.selectAll();

    getCommentsFromEntity = (id: number) => {
        const entity = this.getEntity(id);
        if (entity !== undefined && entity !== null) {
            return entity.comment;
        }
        return [];
    };

    constructor(protected store: PostStore) {
        super(store);
    }
}

export const postQuery = new PostQuery(postStore);
