import React from "react";
import { postService } from "../../state/posts/post.service";
import { usePostHook } from "../../state/posts/post.hook";
import InfiniteScroll from "react-infinite-scroller";
import { Post } from "../../state/posts";
import PostItem from "../PostItem";
import { useAuthStateHook } from "../../state/auth/auth.hook";

interface Props {}

const MainContent = (props: Props) => {
    const [posts] = usePostHook();
    const [authState] = useAuthStateHook();

    const fetchData = (pageNo: number) => {
        //TODO: Fix bug that first page have no auth token even when authenticated
        if (authState.token !== null && authState.token !== undefined && authState.token !== "")
            postService.getPostAuth(pageNo, authState.token);
        else postService.getPost(pageNo);
    };

    const getPostList = (post: Post[]) => {
        return post.map((item) => <PostItem item={item} key={item.id} />);
    };

    return (
        <main>
            <InfiniteScroll
                pageStart={-1}
                loadMore={fetchData}
                hasMore={true}
                loader={
                    <div className="loader" key={0}>
                        Loading ...
                    </div>
                }
            >
                {getPostList(posts)}
            </InfiniteScroll>
        </main>
    );
};

export default MainContent;
