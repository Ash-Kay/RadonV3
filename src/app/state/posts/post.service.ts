import axios from "axios";
import { PostStore, postStore } from "./post.store";
import { postQuery, PostQuery } from "./post.query";

export class PostService {
    constructor(private store: PostStore, private query: PostQuery) {}

    readonly homefeed$ = this.query.homefeed$;

    public getPostAuth = (pageNo: number, token: string) => {
        this.store.setLoading(true);
        axios
            .get(`http://localhost:3000/api/v1/posts/?page=${pageNo}`, getTokenHeader(token))
            .then((response) => {
                this.store.add(response.data.data, { prepend: true });
                this.store.setLoading(false);
            })
            .catch(function (error) {
                console.error(error);
            });
    };

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

    public upvote = (postId: number, token: string) => {
        this.store.setLoading(true);
        axios
            .post(`http://localhost:3000/api/v1/posts/${postId}/upvote`, null, getTokenHeader(token))
            .then((response) => {
                this.store.update(postId, { vote: 1 });
                this.store.setLoading(false);
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    public downvote = (postId: number, token: string) => {
        this.store.setLoading(true);
        axios
            .post(`http://localhost:3000/api/v1/posts/${postId}/downvote`, null, getTokenHeader(token))
            .then((response) => {
                this.store.update(postId, { vote: -1 });
                this.store.setLoading(false);
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    public removeVote = (postId: number, token: string) => {
        this.store.setLoading(true);
        axios
            .delete(`http://localhost:3000/api/v1/posts/${postId}/removevote`, getTokenHeader(token))
            .then((response) => {
                this.store.update(postId, { vote: 0 });
                this.store.setLoading(false);
            })
            .catch(function (error) {
                console.error(error);
            });
    };
}

export const postService = new PostService(postStore, postQuery);

const getTokenHeader = (token: string) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};
