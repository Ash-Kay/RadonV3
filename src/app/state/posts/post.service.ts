import axios from "axios";
import { PostStore, postStore } from "./post.store";
import { postQuery, PostQuery } from "./post.query";

export class PostService {
    constructor(private store: PostStore, private query: PostQuery) {}

    readonly homefeed$ = this.query.homefeed$;

    public getPost = (pageNo: number) => {
        this.store.setLoading(true);
        axios
            .get(`http://localhost:3000/api/v1/posts/?page=${pageNo}`)
            .then((response) => {
                this.store.add(response.data.data, { prepend: true });
                this.store.setLoading(false);
            })
            .catch(function (error) {
                console.error(error);
            });
    };
}

export const postService = new PostService(postStore, postQuery);
