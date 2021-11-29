import { NewPostForm } from "../../components/CreatePostButton";
import { main } from "../../../utils/axios";
import { CommentForm } from "../../components/CommentInput";
import { AxiosResponse } from "axios";
import { NormalResponse, PaginationResponse } from "../../../interface/postPagination.interface";
import { Post } from "./post.model";

enum HeaderType {
    AUTH_TOKEN = 1,
    MULTIPART = 2,
}

export const getPostPage = (pageNo: number, token?: string): Promise<AxiosResponse<PaginationResponse>> => {
    if (token) {
        return main.get(`/posts/?page=${pageNo}`, getHeader({ token }, HeaderType.AUTH_TOKEN));
    } else {
        return main.get(`/posts/?page=${pageNo}`);
    }
};

export const getPost = (postId: number, token?: string): Promise<AxiosResponse<NormalResponse<Post>>> => {
    if (token) {
        return main.get(`/posts/${postId}`, getHeader({ token }, HeaderType.AUTH_TOKEN));
    } else {
        return main.get(`/posts/${postId}`);
    }
};

export const upvote = (postId: number, token: string) => {
    return main.post(`/posts/${postId}/upvote`, null, getHeader({ token }, HeaderType.AUTH_TOKEN));
};

export const downvote = (postId: number, token: string) => {
    return main.post(`/posts/${postId}/downvote`, null, getHeader({ token }, HeaderType.AUTH_TOKEN));
};

export const removeVote = (postId: number, token: string) => {
    return main.delete(`/posts/${postId}/removevote`, getHeader({ token }, HeaderType.AUTH_TOKEN));
};

export const getComments = (postId: number, token?: string) => {
    if (token) {
        return main.get(`/posts/${postId}/comment`, getHeader({ token }, HeaderType.AUTH_TOKEN));
    } else {
        return main.get(`/posts/${postId}/comment`);
    }
};

export const postComment = (
    postId: number,
    data: CommentForm,
    token: string,
    cb?: (isSuccess: boolean) => void
): void => {
    const formData = new FormData();
    formData.append("message", data.comment);
    if (data.file !== null && data.file !== undefined) formData.append("file", data.file);
    // formData.append("tagTo", tagTo);

    main.post(`/posts/${postId}/comment`, formData, getHeader({ token }, HeaderType.AUTH_TOKEN))
        .then((response) => {
            cb?.(true);
        })
        .catch((error) => {
            cb?.(false);
        });
};

export const createNewPost = (data: NewPostForm, token: string, cb?: (isSuccess: boolean) => void): void => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("sensitive", data.sensitive.toString());
    data.tags.forEach((tag) => {
        formData.append("tags[]", tag);
    });
    if (data.file !== null && data.file !== undefined) formData.append("file", data.file);

    main.post(`/posts/`, formData, getHeader({ token }, HeaderType.AUTH_TOKEN | HeaderType.MULTIPART))
        .then((response) => {
            cb?.(true);
        })
        .catch((error) => {
            cb?.(false);
        });
};

// //TODO: Should be in comment services
export const cupvote = (postId: number, commId: number, token: string) => {
    return main.post(`/comments/${commId}/upvote`, null, getHeader({ token }, HeaderType.AUTH_TOKEN));
};

export const cdownvote = (postId: number, commId: number, token: string) => {
    return main.post(`/comments/${commId}/downvote`, null, getHeader({ token }, HeaderType.AUTH_TOKEN));
};

export const cremoveVote = (postId: number, commId: number, token: string) => {
    return main.delete(`/comments/${commId}/removevote`, getHeader({ token }, HeaderType.AUTH_TOKEN));
};

export const softDeletePost = (postId: number, token: string) => {
    return main.delete(`/posts/${postId}`, getHeader({ token }, HeaderType.AUTH_TOKEN));
};

export const softDeleteComment = (postId: number, commId: number, token: string) => {
    return main.delete(`/comments/${commId}`, getHeader({ token }, HeaderType.AUTH_TOKEN));
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

const getHeader = (data: HeaderData, type: number) => {
    const headersObject: { headers: { [k: string]: string } } = { headers: {} };

    if (type & HeaderType.AUTH_TOKEN) headersObject.headers["Authorization"] = `Bearer ${data.token}`;

    if (type & HeaderType.MULTIPART) headersObject.headers["Content-type"] = "multipart/form-data";

    return headersObject;
};

interface HeaderData {
    token?: string;
}
