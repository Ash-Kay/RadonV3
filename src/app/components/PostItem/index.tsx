import React from "react";
import { Block } from "baseui/block";
import { Avatar } from "baseui/avatar";
import { Post } from "../../state/posts";

interface Props {
    item: Post;
}

interface MediaProps {
    mediaUrl: string;
    mime: string;
}

const Media = (props: MediaProps) => {
    if (props.mime.startsWith("image"))
        return <img style={{ width: "100%" }} src={"http://localhost:3000/" + props.mediaUrl} alt="" />;
    else
        return (
            <video width="100%" controls>
                <source src={"http://localhost:3000/" + props.mediaUrl} type={props.mime} />
            </video>
        );
};

const PostItem = (props: Props) => {
    return (
        <Block>
            <Avatar name={props.item.user.username} size="50px" src={props.item.user.avatarUrl!} />
            <h3>{props.item.title}</h3>
            <Media mediaUrl={props.item.mediaUrl} mime={props.item.mime} />
        </Block>
    );
};

export default PostItem;
