import { NewPostForm } from "../../components/CreatePostButton";
import { main } from "../../../utils/axios";
import { handleResponseError } from "../../../utils/handleResponseError";
import { CommentForm } from "../../components/CommentInput";
import { Post } from "./post.model";
import { AxiosResponse } from "axios";
import { PaginationResponse } from "../../../interface/postPagination.interface";

enum HeaderType {
    AUTH_TOKEN = 1,
    MULTIPART = 2,
}

const getPostPageAuth = (pageNo: number, token: string): Promise<AxiosResponse<PaginationResponse>> => {
    return main.get(`/posts/?page=${pageNo}`, getHeader({ token }, HeaderType.AUTH_TOKEN));
};

const getPostPage = (pageNo: number): Promise<AxiosResponse<PaginationResponse>> => {
    return main.get(`/posts/?page=${pageNo}`);
};

// const getPostPageAuth = (pageNo: number, token: string, setHasMore: (hasMore: boolean) => void): void => {
//     this.store.setLoading(true);
//     main.get(`/posts/?page=${pageNo}`, getHeader({ token }, HeaderType.AUTH_TOKEN))
//         .then((response) => {
//             globalService.setCurrentLoadedPage(pageNo);
//             if (response.data.data.length === 0) {
//                 setHasMore(false);
//             } else {
//                 setHasMore(true);
//                 this.store.add(response.data.data, { prepend: true });
//                 this.store.setLoading(false);
//             }
//         })
//         .catch((error) => {
//             setHasMore(false);
//             handleResponseError(error, this.store);
//         });
// };

// const getPostPage = (pageNo: number, setHasMore: (hasMore: boolean) => void): void => {
//     this.store.setLoading(true);
//     main.get(`/posts/?page=${pageNo}`)
//         .then((response) => {
//             globalService.setCurrentLoadedPage(pageNo);
//             if (response.data.data.length === 0) {
//                 setHasMore(false);
//             } else {
//                 setHasMore(true);
//                 this.store.add(response.data.data, { prepend: true });
//                 this.store.setLoading(false);
//             }
//         })
//         .catch((error) => {
//             setHasMore(false);
//             handleResponseError(error, this.store);
//         });
// };

// const getPost = (postId: number, cb?: (isSuccess: boolean) => void): void => {
//     this.store.setLoading(true);
//     main.get(`/posts/${postId}`)
//         .then((response) => {
//             postStore.add(response.data.data, { prepend: true });
//             postService.getComments(postId);
//             postService.getTags(postId);
//             cb?.(true);
//         })
//         .catch((error) => {
//             handleResponseError(error, this.store);
//             cb?.(false);
//         });
// };

// const getPostAuth = (postId: number, token: string, cb?: (isSuccess: boolean) => void): void => {
//     this.store.setLoading(true);
//     main.get(`/posts/${postId}`, getHeader({ token }, HeaderType.AUTH_TOKEN))
//         .then((response) => {
//             postStore.add(response.data.data, { prepend: true });
//             postService.getCommentsAuth(postId, token);
//             postService.getTags(postId);
//             cb?.(true);
//         })
//         .catch((error) => {
//             handleResponseError(error, this.store);
//             cb?.(false);
//         });
// };

const upvote = (postId: number) => {
    return main.post(`/posts/${postId}/upvote`);
    // .then((response) => {
    //     // this.store.update(postId, { vote: +1, voteSum: response.data.data.voteSum });
    // })
    // .catch((error) => {
    //     // handleResponseError(error, this.store);
    // });
};

const downvote = (postId: number) => {
    return main.post(`/posts/${postId}/downvote`);
    // .then((response) => {
    //     // this.store.update(postId, { vote: -1, voteSum: response.data.data.voteSum });
    // })
    // .catch((error) => {
    //     // handleResponseError(error, this.store);
    // });
};

const removeVote = (postId: number) => {
    return main.delete(`/posts/${postId}/removevote`);
    //         .then((response) => {
    //             // this.store.update(postId, { vote: 0, voteSum: response.data.data.voteSum });
    //         })
    //         .catch((error) => {
    //             // handleResponseError(error, this.store);
    //         });
};

const getComments = (postId: number) => {
    return main.get(`/posts/${postId}/comment`);
};

// const getCommentsAuth = (postId: number, token: string, cb?: (isSuccess: boolean) => void): void => {
//     this.store.setLoading(true);
//     main.get(`/posts/${postId}/comment`, getHeader({ token }, HeaderType.AUTH_TOKEN))
//         .then((response) => {
//             this.store.update(postId, { comment: response.data.data });
//             this.store.setLoading(false);
//             cb?.(true);
//         })
//         .catch((error) => {
//             handleResponseError(error, this.store);
//             cb?.(false);
//         });
// };

// const getVoteSum = (postId: number): void => {
//     this.store.setLoading(true);
//     main.get(`/posts/${postId}/vote`)
//         .then((response) => {
//             this.store.update(postId, { voteSum: response.data.data.voteSum });
//             this.store.setLoading(false);
//         })
//         .catch((error) => {
//             handleResponseError(error, this.store);
//         });
// };

const postComment = (postId: number, data: CommentForm, cb?: (isSuccess: boolean) => void): void => {
    const formData = new FormData();
    formData.append("message", data.comment);
    if (data.file !== null && data.file !== undefined) formData.append("file", data.file);
    // formData.append("tagTo", tagTo);

    main.post(`/posts/${postId}/comment`, formData)
        .then((response) => {
            //Response only contains user's ID
            // response.data.data.user.username = authQuery.getValue().username;
            // response.data.data.user.avatarUrl = authQuery.getValue().avatarUrl;
            // const updatedComments = postQuery.getCommentsFromEntity(postId).concat(response.data.data);
            // this.store.update(postId, {
            //     comment: updatedComments,
            // });
            cb?.(true);
        })
        .catch((error) => {
            cb?.(false);
            // handleResponseError(error, this.store);
        });
};

const createNewPost = (data: NewPostForm, cb?: (isSuccess: boolean) => void): void => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("sensitive", data.sensitive.toString());
    data.tags.forEach((tag) => {
        formData.append("tags[]", tag);
    });
    if (data.file !== null && data.file !== undefined) formData.append("file", data.file);

    main.post(`/posts/`, formData)
        .then((response) => {
            cb?.(true);
            // this.store.add({ ...response.data.data });
            // this.store.setLoading(false);
        })
        .catch((error) => {
            cb?.(false);
            // handleResponseError(error, this.store);
        });
};

// //TODO: Should be in comment services
const cupvote = (postId: number, commId: number) => {
    return main.post(`/comments/${commId}/upvote`);
    // .then((response) => {
    //     // this.store.update(postId, (post) => {
    //     //     const updatedPost = Object.assign({}, post);
    //     //     updatedPost.comment = post.comment.map((comm) => {
    //     //         if (comm.id === commId) return { ...comm, vote: 1, voteSum: response.data.data.voteSum };
    //     //         else return comm;
    //     //     });
    //     //     return updatedPost;
    //     // });
    // })
    // .catch((error) => {
    //     // handleResponseError(error, this.store);
    // });
};

const cdownvote = (postId: number, commId: number) => {
    return main.post(`/comments/${commId}/downvote`);
    // .then((response) => {
    //     // this.store.update(postId, (post) => {
    //     //     const updatedPost = Object.assign({}, post);
    //     //     updatedPost.comment = post.comment.map((comm) => {
    //     //         if (comm.id === commId) return { ...comm, vote: -1, voteSum: response.data.data.voteSum };
    //     //         else return comm;
    //     //     });
    //     //     return updatedPost;
    //     // });
    // })
    // .catch((error) => {
    //     // handleResponseError(error, this.store);
    // });
};

const cremoveVote = (postId: number, commId: number) => {
    return main.delete(`/comments/${commId}/removevote`);
    // .then((response) => {
    //     // this.store.update(postId, (post) => {
    //     //     const updatedPost = Object.assign({}, post);
    //     //     updatedPost.comment = post.comment.map((comm) => {
    //     //         if (comm.id === commId) return { ...comm, vote: 0, voteSum: response.data.data.voteSum };
    //     //         else return comm;
    //     //     });
    //     //     return updatedPost;
    //     // });
    // })
    // .catch((error) => {
    //     // handleResponseError(error, this.store);
    // });
};

const softDeletePost = (postId: number) => {
    return main.delete(`/posts/${postId}`);
    // .then(() => {
    //     this.store.remove(postId);
    //     this.store.setLoading(false);
    //     cb?.(true);
    // })
    // .catch((error) => {
    //     handleResponseError(error, this.store);
    //     cb?.(false);
    // });
};

const softDeleteComment = (postId: number, commId: number) => {
    return main.delete(`/comments/${commId}`);
    // .then(() => {
    //     this.store.update(postId, (post) => {
    //         const updatedPost = Object.assign({}, post);
    //         updatedPost.comment = post.comment.filter((comm) => {
    //             if (comm.id !== commId) return comm;
    //         });
    //         return updatedPost;
    //     });
    //     this.store.setLoading(false);
    // })
    // .catch((error) => {
    //     handleResponseError(error, this.store);
    // });
};

// const getTags = (postId: number, cb?: (isSuccess: boolean) => void): void => {
//     this.store.setLoading(true);
//     main.get(`/posts/${postId}/tags`)
//         .then((response) => {
//             this.store.update(postId, { tag: response.data.data });
//             this.store.setLoading(false);
//             cb?.(true);
//         })
//         .catch((error) => {
//             handleResponseError(error, this.store);
//             cb?.(false);
//         });
// };

export default {
    getPostPage,
    downvote,
    upvote,
    removeVote,
    createNewPost,
    postComment,
    getComments,
    cupvote,
    cdownvote,
    cremoveVote,
    softDeleteComment,
    softDeletePost,
};

const getHeader = (data: HeaderData, type: number) => {
    const headersObject: { headers: { [k: string]: string } } = { headers: {} };

    if (type & HeaderType.AUTH_TOKEN) headersObject.headers["Authorization"] = `Bearer ${data.token}`;

    if (type & HeaderType.MULTIPART) headersObject.headers["Content-type"] = "multipart/form-data";

    return headersObject;
};

interface HeaderData {
    token?: string;
}
