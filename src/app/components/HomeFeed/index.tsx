import React, { useContext, useState } from "react";
import { postService } from "../../state/posts/post.service";
import { usePostFeedHook } from "../../state/posts/post.hook";
import InfiniteScroll from "react-infinite-scroller";
import { Post } from "../../state/posts";
import PostItem from "../PostItem";
import { AuthContext } from "../../context/auth.context";
import { Spinner } from "theme-ui";

const HomeFeed: React.FC = () => {
    const [posts] = usePostFeedHook();
    const authState = useContext(AuthContext);
    const [hasMore, setHasMore] = useState(true);

    const fetchData = (pageNo: number) => {
        if (authState.token) postService.getPostPageAuth(pageNo, authState.token, setHasMore);
        else postService.getPostPage(pageNo, setHasMore);
    };

    const getPostList = (post: Post[]) => {
        return post.map((item) => <PostItem item={item} key={item.id} />);
    };

    return (
        <main>
            <InfiniteScroll
                pageStart={0}
                loadMore={fetchData}
                hasMore={hasMore}
                loader={<Spinner sx={{ display: "block", mx: "auto" }} />}
            >
                {getPostList(posts)}
            </InfiniteScroll>
        </main>
    );
};

export default HomeFeed;
