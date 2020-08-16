import { PostStore, postStore } from "./post.store";
import { postQuery, PostQuery } from "./post.query";
import { NewPostForm } from "../../components/CreatePostButton";
import { authQuery } from "../auth/auth.query";
import { main } from "../../../utils/axios";
import { CommentForm } from "../../components/PostItem";

enum HeaderType {
    AUTH_TOKEN = 1,
    MULTIPART = 2,
}

export class PostService {
    constructor(private store: PostStore, private query: PostQuery) {}
    readonly homefeed$ = this.query.homefeed$;

    //TODO logout if 401 in any of call
    public getPostAuth = (pageNo: number, token: string) => {
        console.log("[Auth] fetching post" + pageNo);
        this.store.setLoading(true);
        main.get(`/posts/?page=${pageNo}`, getHeader({ token }, HeaderType.AUTH_TOKEN))
            .then((response) => {
                this.store.add(response.data.data, { prepend: true });
                this.store.setLoading(false);
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    public getPost = (pageNo: number) => {
        console.log("{NOAuth} fetching post" + pageNo);
        this.store.setLoading(true);
        main.get(`/posts/?page=${pageNo}`)
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
        main.post(`/posts/${postId}/upvote`, null, getHeader({ token }, HeaderType.AUTH_TOKEN))
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
        main.post(`/posts/${postId}/downvote`, null, getHeader({ token }, HeaderType.AUTH_TOKEN))
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
        main.delete(`/posts/${postId}/removevote`, getHeader({ token }, HeaderType.AUTH_TOKEN))
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
        main.get(`/posts/${postId}/comment`)
            .then((response) => {
                this.store.update(postId, { comment: response.data.data });
                this.store.setLoading(false);
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    public getVoteSum = (postId: number) => {
        this.store.setLoading(true);
        main.get(`/posts/${postId}/vote`)
            .then((response) => {
                this.store.update(postId, { voteSum: response.data.data.voteSum });
                this.store.setLoading(false);
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    public postComment = (postId: number, data: CommentForm, token: string) => {
        const formData = new FormData();
        formData.append("message", data.comment);
        if (data.file !== null && data.file !== undefined) formData.append("file", data.file);
        // formData.append("tagTo", tagTo);

        this.store.setLoading(true);
        main.post(`/posts/${postId}/comment`, formData, getHeader({ token }, HeaderType.AUTH_TOKEN))
            .then((response) => {
                //Response only contains user's ID
                response.data.data.user.username = authQuery.getValue().username;
                response.data.data.user.avatarUrl = authQuery.getValue().avatarUrl;
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

    public createNewPost = (data: NewPostForm, token: string) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("sensitive", data.sensitive.toString());
        if (data.file !== null && data.file !== undefined) formData.append("file", data.file);

        this.store.setLoading(true);
        main.post(`/posts/`, formData, getHeader({ token }, HeaderType.AUTH_TOKEN | HeaderType.MULTIPART))
            .then((response) => {
                this.store.setLoading(false);
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    //TODO: Should be in comment services
    public cupvote = (commId: number, token: string) => {
        this.store.setLoading(true);
        main.post(`/comments/${commId}/upvote`, null, getHeader({ token }, HeaderType.AUTH_TOKEN))
            .then((response) => {
                this.store.update(commId, { vote: 1 });
                this.store.setLoading(false);
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    public cdownvote = (commId: number, token: string) => {
        this.store.setLoading(true);
        main.post(`/comments/${commId}/downvote`, null, getHeader({ token }, HeaderType.AUTH_TOKEN))
            .then((response) => {
                this.store.update(commId, { vote: -1 });
                this.store.setLoading(false);
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    public cremoveVote = (commId: number, token: string) => {
        this.store.setLoading(true);
        main.delete(`/comments/${commId}/removevote`, getHeader({ token }, HeaderType.AUTH_TOKEN))
            .then((response) => {
                this.store.update(commId, { vote: 0 });
                this.store.setLoading(false);
            })
            .catch(function (error) {
                console.error(error);
            });
    };
}

export const postService = new PostService(postStore, postQuery);

const getHeader = (data: HeaderData, type: number) => {
    const headersObject: { headers: { [k: string]: string } } = { headers: {} };

    if (type & HeaderType.AUTH_TOKEN) headersObject.headers["Authorization"] = `Bearer ${data.token}`;

    if (type & HeaderType.MULTIPART) headersObject.headers["Content-type"] = "multipart/form-data";

    return headersObject;
};

interface HeaderData {
    token?: string;
}
