import React, { useContext, useEffect } from "react";
import { postService } from "../../state/posts/post.service";
import { usePostFeedHook } from "../../state/posts/post.hook";
import InfiniteScroll from "react-infinite-scroller";
import { Post } from "../../state/posts";
import PostItem from "../PostItem";
import { AuthContext } from "../../context/auth.context";
import { Spinner } from "theme-ui";
import { useCurrentLoadedPageHook, useGlobalMorePageHook } from "../../state/global/global.hook";
import { globalService } from "../../state/global/global.service";

const HomeFeed: React.FC = () => {
    const [posts] = usePostFeedHook();
    const authState = useContext(AuthContext);
    const [hasMore] = useGlobalMorePageHook();
    const [currPageNo] = useCurrentLoadedPageHook();

    const handleScrollPosition = () => {
        const scrollPosition = sessionStorage.getItem("scrollPosition");
        if (scrollPosition) {
            setTimeout(() => {
                window.scrollTo(0, parseInt(scrollPosition));
                sessionStorage.removeItem("scrollPosition");
            }, 2000);
        }
    };

    useEffect(() => {
        handleScrollPosition();
    }, []);

    const fetchData = (pageNo: number) => {
        if (pageNo > currPageNo || hasMore) {
            if (authState.token) postService.getPostPageAuth(pageNo, authState.token, globalService.setHasMorePages);
            else postService.getPostPage(pageNo, globalService.setHasMorePages);
        }
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
