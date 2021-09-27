import React from "react";
import { Post } from "../../state/posts/post.model";
import { Box, makeStyles } from "@material-ui/core";
import PostItemLite from "../PostItem/PostItemLite";

interface Props {
    posts: Post[];
}

const useHomeFeedStyles = makeStyles((theme) => ({
    main: {},
}));

const HomeFeedSecondary: React.FC<Props> = (props: Props) => {
    const classes = useHomeFeedStyles();

    const getPostList = (post: Post[]) => {
        return post.map((item) => <PostItemLite item={item} key={item.id} />);
    };

    return <Box className={classes.main}>{props.posts && getPostList(props.posts)}</Box>;
};

export default HomeFeedSecondary;
