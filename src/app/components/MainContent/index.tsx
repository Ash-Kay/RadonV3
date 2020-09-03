import React, { useContext } from "react";
import { postService } from "../../state/posts/post.service";
import { usePostFeedHook } from "../../state/posts/post.hook";
import InfiniteScroll from "react-infinite-scroller";
import { Post } from "../../state/posts";
import PostItem from "../PostItem";
import { AuthContext } from "../../context/auth.context";

interface Props {}

const MainContent = (props: Props) => {
    const [posts] = usePostFeedHook();
    const authState = useContext(AuthContext);

    const fetchData = (pageNo: number) => {
        if (authState.token) postService.getPostPageAuth(pageNo, authState.token);
        else postService.getPostPage(pageNo);
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
