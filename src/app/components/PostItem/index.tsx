import React, { useEffect } from "react";
import { Post, postService, Comment } from "../../state/posts";
import { useAuthStateHook } from "../../state/auth/auth.hook";
import CommentItem from "../CommentItem";
import { Box, Button, Image } from "rebass";
import { Input, Label, Checkbox } from "@rebass/forms";

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
    const [upvoted, setIsUpvoted] = React.useState(false);
    const [downvoted, setIsDownvoted] = React.useState(false);
    const [commentText, setCommentText] = React.useState("");
    const [authState] = useAuthStateHook();

    useEffect(() => {
        if (props.item.vote !== null && props.item.vote !== undefined) {
            if (props.item.vote > 0) setIsUpvoted(true);
            if (props.item.vote < 0) setIsDownvoted(true);
        }
        postService.getComments(props.item.id);
    }, []);

    const upvote = (checked: boolean) => {
        if (!authState.isLoggedIn) return;
        setIsUpvoted(checked);
        if (checked) {
            setIsDownvoted(false);
            postService.upvote(props.item.id, authState.token);
        } else postService.removeVote(props.item.id, authState.token);
    };
    const downvote = (checked: boolean) => {
        if (!authState.isLoggedIn) return;
        setIsDownvoted(checked);
        if (checked) {
            setIsUpvoted(false);
            postService.downvote(props.item.id, authState.token);
        } else postService.removeVote(props.item.id, authState.token);
    };

    const getCommentList = (comments: Comment[]) => {
        if (comments === undefined) {
            return <h4>Loading Comments...</h4>;
        }

        return comments.map((item) => <CommentItem item={item} key={item.id} />);
    };

    const postComment = () => {
        //TODO show login modal
        if (!authState.isLoggedIn) return;
        postService.postComment(props.item.id, commentText, "", authState.token);
        //TODO only clear if success
        setCommentText("");
    };

    const flexGridItemProps = {
        display: "flex",
        marginTop: "1rem",
        marginBottom: "1rem",
        backgroundColor: "#e2e2e2",
    };

    const flexProp = {
        display: "flex",
    };

    return (
        <Box>
            <Box sx={flexGridItemProps}>
                <Image
                    src={props.item.user.avatarUrl!}
                    sx={{
                        width: 30,
                        height: 30,
                        borderRadius: 9999,
                    }}
                />
                <h5>{props.item.user.username}</h5>
                <h3>{props.item.title}</h3>
                <span style={{ paddingLeft: "1rem" }}>{props.item.timeago}</span>
            </Box>
            <Media mediaUrl={props.item.mediaUrl} mime={props.item.mime} />
            <Label>
                <Checkbox checked={upvoted} onChange={(e) => upvote(e.currentTarget.checked)} />
                Upvoted
            </Label>
            <Label>
                <Checkbox checked={downvoted} onChange={(e) => downvote(e.currentTarget.checked)} />
                Downvoted
            </Label>
            <Box>{getCommentList(props.item.comment)}</Box>
            <Box {...flexProp}>
                <Input
                    value={commentText}
                    onChange={(e) => setCommentText(e.currentTarget.value)}
                    placeholder="Commnet"
                />
                <Button onClick={postComment}>Send</Button>
            </Box>
        </Box>
    );
};

export default PostItem;
