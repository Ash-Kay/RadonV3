import { PostStore, postStore } from "./post.store";
import { postQuery, PostQuery } from "./post.query";
import { NewPostForm } from "../../components/CreatePostButton";
import { authQuery } from "../auth/auth.query";
import { main } from "../../../utils/axios";
import { handleResponseError } from "../../../utils/handleResponseError";
import { CommentForm } from "../../components/CommentInput";
import { globalService } from "../global/global.service";

enum HeaderType {
    AUTH_TOKEN = 1,
    MULTIPART = 2,
}

export class PostService {
    constructor(private store: PostStore, private query: PostQuery) {}
    readonly homefeed$ = this.query.homefeed$;
    readonly error$ = this.query.error$;
    readonly activePost$ = this.query.activePost$;

    public getPostPageAuth = (pageNo: number, token: string, setHasMore: (hasMore: boolean) => void): void => {
        this.store.setLoading(true);
        main.get(`/posts/?page=${pageNo}`, getHeader({ token }, HeaderType.AUTH_TOKEN))
            .then((response) => {
                globalService.setCurrentLoadedPage(pageNo);
                if (response.data.data.length === 0) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                    this.store.add(response.data.data, { prepend: true });
                    this.store.setLoading(false);
                }
            })
            .catch((error) => handleResponseError(error, this.store));
    };

    public getPostPage = (pageNo: number, setHasMore: (hasMore: boolean) => void): void => {
        this.store.setLoading(true);
        main.get(`/posts/?page=${pageNo}`)
            .then((response) => {
                globalService.setCurrentLoadedPage(pageNo);
                if (response.data.data.length === 0) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                    this.store.add(response.data.data, { prepend: true });
                    this.store.setLoading(false);
                }
            })
            .catch((error) => {
                handleResponseError(error, this.store);
            });
    };

    public getPostPromise = (postId: number): Promise<any> => {
        this.store.setLoading(true);
        return main.get(`/posts/${postId}`);
    };

    public getPostAuthPromise = (postId: number, token: string): Promise<any> => {
        this.store.setLoading(true);
        return main.get(`/posts/${postId}`, getHeader({ token }, HeaderType.AUTH_TOKEN));
    };

    public upvote = (postId: number, token: string): void => {
        this.store.setLoading(true);
        main.post(`/posts/${postId}/upvote`, null, getHeader({ token }, HeaderType.AUTH_TOKEN))
            .then(() => {
                this.store.update(postId, { vote: 1 });
                this.store.setLoading(false);
            })
            .catch((error) => {
                handleResponseError(error, this.store);
            });
    };

    public downvote = (postId: number, token: string): void => {
        this.store.setLoading(true);
        main.post(`/posts/${postId}/downvote`, null, getHeader({ token }, HeaderType.AUTH_TOKEN))
            .then(() => {
                this.store.update(postId, { vote: -1 });
                this.store.setLoading(false);
            })
            .catch((error) => {
                handleResponseError(error, this.store);
            });
    };

    public removeVote = (postId: number, token: string): void => {
        this.store.setLoading(true);
        main.delete(`/posts/${postId}/removevote`, getHeader({ token }, HeaderType.AUTH_TOKEN))
            .then(() => {
                this.store.update(postId, { vote: 0 });
                this.store.setLoading(false);
            })
            .catch((error) => {
                handleResponseError(error, this.store);
            });
    };

    public getComments = (postId: number): void => {
        this.store.setLoading(true);
        main.get(`/posts/${postId}/comment`)
            .then((response) => {
                this.store.update(postId, { comment: response.data.data });
                this.store.setLoading(false);
            })
            .catch((error) => {
                handleResponseError(error, this.store);
            });
    };

    public getCommentsAuth = (postId: number, token: string): void => {
        this.store.setLoading(true);
        main.get(`/posts/${postId}/comment`, getHeader({ token }, HeaderType.AUTH_TOKEN))
            .then((response) => {
                this.store.update(postId, { comment: response.data.data });
                this.store.setLoading(false);
            })
            .catch((error) => {
                handleResponseError(error, this.store);
            });
    };

    public getVoteSum = (postId: number): void => {
        this.store.setLoading(true);
        main.get(`/posts/${postId}/vote`)
            .then((response) => {
                this.store.update(postId, { voteSum: response.data.data.voteSum });
                this.store.setLoading(false);
            })
            .catch((error) => {
                handleResponseError(error, this.store);
            });
    };

    public postComment = (postId: number, data: CommentForm, token: string): void => {
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
            .catch((error) => {
                handleResponseError(error, this.store);
            });
    };

    public createNewPost = (data: NewPostForm, token: string): void => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("sensitive", data.sensitive.toString());
        data.tags.forEach((tag) => {
            formData.append("tags[]", tag);
        });
        if (data.file !== null && data.file !== undefined) formData.append("file", data.file);

        this.store.setLoading(true);
        main.post(`/posts/`, formData, getHeader({ token }, HeaderType.AUTH_TOKEN | HeaderType.MULTIPART))
            .then(() => {
                this.store.setLoading(false);
            })
            .catch((error) => {
                handleResponseError(error, this.store);
            });
    };

    //TODO: Should be in comment services
    public cupvote = (postId: number, commId: number, token: string): void => {
        this.store.setLoading(true);
        main.post(`/comments/${commId}/upvote`, null, getHeader({ token }, HeaderType.AUTH_TOKEN))
            .then(() => {
                this.store.update(postId, (post) => {
                    const updatedPost = Object.assign({}, post);
                    updatedPost.comment = post.comment.map((comm) => {
                        if (comm.id === commId) return { ...comm, vote: 1 };
                        else return comm;
                    });
                    return updatedPost;
                });
                this.store.setLoading(false);
            })
            .catch((error) => {
                handleResponseError(error, this.store);
            });
    };

    public cdownvote = (postId: number, commId: number, token: string): void => {
        this.store.setLoading(true);
        main.post(`/comments/${commId}/downvote`, null, getHeader({ token }, HeaderType.AUTH_TOKEN))
            .then(() => {
                this.store.update(postId, (post) => {
                    const updatedPost = Object.assign({}, post);
                    updatedPost.comment = post.comment.map((comm) => {
                        if (comm.id === commId) return { ...comm, vote: -1 };
                        else return comm;
                    });
                    return updatedPost;
                });
                this.store.setLoading(false);
            })
            .catch((error) => {
                handleResponseError(error, this.store);
            });
    };

    public cremoveVote = (postId: number, commId: number, token: string): void => {
        this.store.setLoading(true);
        main.delete(`/comments/${commId}/removevote`, getHeader({ token }, HeaderType.AUTH_TOKEN))
            .then(() => {
                this.store.update(postId, (post) => {
                    const updatedPost = Object.assign({}, post);
                    updatedPost.comment = post.comment.map((comm) => {
                        if (comm.id === commId) return { ...comm, vote: 0 };
                        else return comm;
                    });
                    return updatedPost;
                });
                this.store.setLoading(false);
            })
            .catch((error) => {
                handleResponseError(error, this.store);
            });
    };

    public softDeletePost = (postId: number, token: string, cb?: () => void): void => {
        this.store.setLoading(true);
        main.delete(`/posts/${postId}`, getHeader({ token }, HeaderType.AUTH_TOKEN))
            .then(() => {
                this.store.remove(postId);
                this.store.setLoading(false);
                cb?.();
            })
            .catch((error) => {
                handleResponseError(error, this.store);
            });
    };

    public softDeleteComment = (postId: number, commId: number, token: string): void => {
        this.store.setLoading(true);
        main.delete(`/comments/${commId}`, getHeader({ token }, HeaderType.AUTH_TOKEN))
            .then(() => {
                this.store.update(postId, (post) => {
                    const updatedPost = Object.assign({}, post);
                    updatedPost.comment = post.comment.filter((comm) => {
                        if (comm.id !== commId) return comm;
                    });
                    return updatedPost;
                });
                this.store.setLoading(false);
            })
            .catch((error) => {
                handleResponseError(error, this.store);
            });
    };

    public getTags = (postId: number): void => {
        this.store.setLoading(true);
        main.get(`/posts/${postId}/tags`)
            .then((response) => {
                this.store.update(postId, { tag: response.data.data });
                this.store.setLoading(false);
            })
            .catch((error) => {
                handleResponseError(error, this.store);
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
