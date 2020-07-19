export type Post = {
    id: number;
    title: string;
    mediaUrl: string;
    sensitive: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    width: number;
    height: number;
    aspectRatio: string;
    mime: string;
};

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
};
