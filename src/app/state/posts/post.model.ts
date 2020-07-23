export interface Post {
    id: number;
    title: string;
    mediaUrl: string;
    sensitive: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    width: number;
    height: number;
    aspectRatio: string;
    mime: string;
    user: User;
    timeago: string;
    vote?: number;
    comment: Comment[];
}
export interface User {
    id: number;
    username: string;
    avatarUrl?: null;
}
export interface Comment {
    id: number;
    message: string;
    mediaUrl: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    tagTo?: User;
    user: User;
}

export function createInitialState(): Post {
    return POST_INITIAL_STATE;
}

const POST_INITIAL_STATE: Post = {
    id: 0,
    title: "test",
    mediaUrl: "test",
    sensitive: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
    width: 0,
    height: 0,
    aspectRatio: "n/a",
    mime: "n/a",
    user: {
        id: 0,
        username: "",
        avatarUrl: null,
    },
    timeago: "",
    vote: 0,
    comment: [],
};
