import axios from "axios";
import { PostStore, postStore } from "./post.store";
import { postQuery, PostQuery } from "./post.query";
import { authService } from "../auth/auth.service";

export class PostService {
    constructor(private store: PostStore, private query: PostQuery) {}

    readonly homefeed$ = this.query.homefeed$;

    //TODO logout if 401 in any of call
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

    public getComments = (postId: number) => {
        this.store.setLoading(true);
        axios
            .get(`http://localhost:3000/api/v1/posts/${postId}/comment`)
            .then((response) => {
                this.store.update(postId, { comment: response.data.data });
                this.store.setLoading(false);
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    public postComment = (postId: number, commentText: string, tagTo: string, token: string) => {
        const formData = new FormData();
        formData.append("message", commentText);
        // formData.append("tagTo", tagTo);

        this.store.setLoading(true);
        axios
            .post(`http://localhost:3000/api/v1/posts/${postId}/comment`, formData, getTokenHeader(token))
            .then((response) => {
                const updatedComments = postQuery.getCommentsFromEntity(postId).concat(response.data.data);
                this.store.update(postId, {
                    comment: updatedComments,
                });
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
