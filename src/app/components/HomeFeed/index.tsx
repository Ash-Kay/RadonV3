import React, { useState } from "react";
import postService from "../../state/posts/post.service";
import InfiniteScroll from "react-infinite-scroller";
import { Post } from "../../state/posts/post.model";
import PostItem from "../PostItem";
import { Box, CircularProgress, makeStyles } from "@material-ui/core";

interface Props {
    posts: Post[];
    updatePosts: (newPosts: Post[]) => void;
}

const useHomeFeedStyles = makeStyles((theme) => ({
    main: {
        width: "600px",
    },
}));

const HomeFeed: React.FC<Props> = (props: Props) => {
    const classes = useHomeFeedStyles();
    const [hasMore, setHasMore] = useState(true);

    const fetchPage = async (page: number) => {
        const { data } = await postService.getPostPage(page);
        if (data.data.length == 0) {
            setHasMore(false);
        } else {
            props.updatePosts(data.data);
        }
        return data;
    };

    const getPostList = (post: Post[]) => {
        return post.map((item) => <PostItem item={item} key={item.id} />);
    };

    return (
        <Box className={classes.main}>
            <InfiniteScroll pageStart={1} loadMore={fetchPage} hasMore={hasMore} loader={<CircularProgress key={0} />}>
                {props.posts && getPostList(props.posts)}
            </InfiniteScroll>
        </Box>
    );
};

export default HomeFeed;
