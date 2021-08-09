export interface Post {
    id: number;
    title: string;
    mediaUrl: string;
    sensitive: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    mime: string;
    user: User;
    timeago: string;
    vote?: number;
    voteSum: number;
    comment: Comment[];
    tag: Tag[] | null;
}
export interface User {
    id: number;
    username: string;
    avatarUrl?: string | undefined;
}
export interface Comment {
    id: number;
    message: string;
    mediaUrl?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    timeago: string;
    tagTo?: User;
    user: User;
    mime?: string;
    vote?: number;
    voteSum: number;
}
export interface Tag {
    id: number;
    tagText: string;
    createdAt: Date;
    deletedAt?: Date;
}
export enum Vote {
    DEFAULT = 0,
    UPVOTED = 1,
    DOWNVOTED = -1,
}

export function createInitialState(): Post {
    return POST_INITIAL_STATE;
}

export const POST_INITIAL_STATE: Post = {
    id: 0,
    title: "test",
    mediaUrl: "test",
    sensitive: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
    mime: "n/a",
    user: {
        id: 0,
        username: "",
        avatarUrl: undefined,
    },
    timeago: "",
    vote: 0,
    voteSum: 0,
    comment: [],
    tag: null,
};
