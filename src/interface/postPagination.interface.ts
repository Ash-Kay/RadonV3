import { Post, Comment } from "../app/state/posts/post.model";

export interface PaginationResponse {
    success: boolean;
    message: string;
    data: Post[];
    errorCode?: string;
    previousPage: string;
    nextPage: string;
}

export interface NormalResponse<T> {
    success: boolean;
    message: string;
    data: T;
    errorCode?: string;
}
