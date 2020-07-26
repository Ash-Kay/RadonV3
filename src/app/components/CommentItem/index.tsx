import React from "react";
import { Comment } from "../../state/posts";
import { Block, BlockProps } from "baseui/block";
import { Avatar } from "baseui/avatar";

interface Props {
    item: Comment;
}

const CommentItem = (props: Props) => {
    const commentBlock: BlockProps = {
        padding: "1rem",
        backgroundColor: "#e0fff3",
        margin: "2px",
    };

    return (
        <Block>
            <Avatar name={props.item.user.username} src={props.item.user.avatarUrl!} />
            <h3>{props.item.user.username}</h3>
            <Block {...commentBlock}>{props.item.message} </Block>
            <span>{props.item.timeago}</span>
        </Block>
    );
};

export default CommentItem;
