import ReactGA from "react-ga";
import { CommentForm } from "../app/components/CommentInput";
import { NewPostForm } from "../app/components/CreatePostButton";

enum Category {
    NAVBAR = "Navbar",
    LOGIN = "Login",
    VOTE = "Vote",
    CREATE_POST_MODAL = "Create Post Modal",
    OPEN_POST = "Open Post",
}

enum Action {
    BUTTON_CLICK = "Button Click",
    LINK_CLICK = "Link Click",
    MEDIA_CLICK = "Media Click",
    BUTTON_CLICK_SUBMIT = "Button Click Submit",
    CALLBACK = "Callback",
}

export enum LoginType {
    GOOGLE = "Google",
}

export enum EntityType {
    POST = "Post",
    COMMENT = "Comment",
}

export enum OpenPostType {
    TITLE_LINK = "Title Link",
    MEDIA = "Media",
    COMM_BUTTON = "Comment Button",
}

export const Event = {
    //*========================= LOGIN =========================*/
    LOGIN_BUTTON_CLICK: (): void => {
        ReactGA.event({
            category: Category.NAVBAR,
            action: Action.BUTTON_CLICK,
            label: "Nav Login Modal Button Open Click",
        });
    },
    LOGOUT_BUTTON_CLICK: (): void => {
        ReactGA.event({
            category: Category.LOGIN,
            action: Action.BUTTON_CLICK,
            label: "Nav Create Post Modal Open Button Click",
        });
    },
    LOGIN_WITH_X_BUTTON_CLICK: (loginType: LoginType): void => {
        ReactGA.event({
            category: Category.LOGIN,
            action: Action.BUTTON_CLICK,
            label: `Login with ${loginType} Button Click`,
        });
    },
    LOGIN_SUCCESSFUL: (loginType: LoginType): void => {
        ReactGA.event({
            category: Category.LOGIN,
            action: Action.CALLBACK,
            label: `Login with ${loginType} Successful`,
        });
    },

    //*========================= Create Post =========================*/

    CREATE_POST_BUTTON_VALID_SUBMIT: (postFrom: NewPostForm): void => {
        ReactGA.event({
            category: Category.CREATE_POST_MODAL,
            action: Action.BUTTON_CLICK_SUBMIT,
            label: JSON.stringify(postFrom),
        });
    },
    CREATE_POST_BUTTON_CLICK: (): void => {
        ReactGA.event({
            category: Category.NAVBAR,
            action: Action.BUTTON_CLICK,
            label: "Nav Create Post Modal Open Button Click",
        });
    },

    //*========================= Vote =========================*/

    UPVOTE_BUTTON_CLICKED: (entityId: number, entityType: EntityType): void => {
        ReactGA.event({
            category: Category.VOTE,
            action: Action.BUTTON_CLICK,
            label: `${entityType} with id: ${entityId} upvoted`,
        });
    },
    DOWNVOTE_BUTTON_CLICKED: (entityId: number, entityType: EntityType): void => {
        ReactGA.event({
            category: Category.VOTE,
            action: Action.BUTTON_CLICK,
            label: `${entityType} with id: ${entityId} downvoted`,
        });
    },
    VOTE_REMOVED_BUTTON_CLICKED: (entityId: number, entityType: EntityType): void => {
        ReactGA.event({
            category: Category.VOTE,
            action: Action.BUTTON_CLICK,
            label: `${entityType} with id: ${entityId} vote removed`,
        });
    },

    //*========================= Comment =========================*/

    COMMENT_BUTTON_VALID_SUBMIT: (newCommentForm: CommentForm): void => {
        ReactGA.event({
            category: Category.VOTE,
            action: Action.BUTTON_CLICK,
            label: JSON.stringify(newCommentForm),
        });
    },

    //*========================= Open Post =========================*/

    POST_OPEN_ELEMENT_CLICK: (openType: OpenPostType): void => {
        ReactGA.event({
            category: Category.OPEN_POST,
            action: getOpenPostAction(openType),
            label: "JSON.stringify(newCommentForm)",
        });
    },
};

const getOpenPostAction = (openType: OpenPostType): Action => {
    switch (openType) {
        case OpenPostType.TITLE_LINK:
            return Action.LINK_CLICK;

        case OpenPostType.COMM_BUTTON:
            return Action.BUTTON_CLICK;

        case OpenPostType.MEDIA:
            return Action.MEDIA_CLICK;
    }
};
