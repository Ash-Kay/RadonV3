import React from "react";
import { Post } from "../../state/posts/post.model";
import Media from "../core/Media";
import { Box, Card, makeStyles, Typography } from "@material-ui/core";

interface Props {
    item: Post;
}

const usePostItemStyles = makeStyles((theme) => ({
    postItem: {
        borderRadius: 0,
        backgroundColor: "secondary",
        marginBottom: theme.spacing(2),
    },
    cardContent: {
        padding: theme.spacing(1),
    },
}));

const PostItem: React.FC<Props> = (props: Props) => {
    const classes = usePostItemStyles();

    return (
        <a href={`/posts/${props.item.id}`}>
            <Card className={classes.postItem}>
                <Media mediaUrl={props.item.mediaUrl} mime={props.item.mime} id={props.item.id} cursor="pointer" />

                {/* <Box className={classes.cardContent}>
                <Typography variant="body2" component="h1">
                    {props.item.title}
                </Typography>
            </Box> */}
            </Card>
        </a>
    );
};

export default PostItem;
