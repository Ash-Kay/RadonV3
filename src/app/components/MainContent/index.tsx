import React from "react";
import { postService } from "../../state/posts/post.service";
import { usePostHook } from "../../state/posts/post.hook";
import InfiniteScroll from "react-infinite-scroller";
import { Post } from "../../state/posts";
import PostItem from "../PostItem";

interface Props {}

const MainContent = (props: Props) => {
    const [posts] = usePostHook();

    const fetchData = (pageNo: number) => {
        postService.getPost(pageNo);
        console.log("posts", posts);
    };

    const style = {
        height: 300,
        border: "1px solid green",
        margin: 6,
        padding: 8,
    };

    const getPostList = (post: Post[]) => {
        return post.map((item) => <PostItem item={item} key={item.id} />);
    };

    return (
        <main>
            <InfiniteScroll
                pageStart={0}
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
