import React from "react";
import { Comment } from "../../state/posts";
import { Block, BlockProps } from "baseui/block";

interface Props {
    item: Comment;
}

const CommentItem = (props: Props) => {
    const commentBlock: BlockProps = {
        padding: "1rem",
        backgroundColor: "#e0fff3",
        margin: "2px",
    };

    return <Block {...commentBlock}>{props.item.message}</Block>;
};

export default CommentItem;
