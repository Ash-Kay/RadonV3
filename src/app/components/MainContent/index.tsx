import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { postService } from "../../state/posts/post.service";
import { Button } from "baseui/button";
import { usePostHook } from "../../state/posts/post.hook";

interface Props {}

const MainContent = (props: Props) => {
    const [posts] = usePostHook();
    let pageNo = 1;

    const fetchData = () => {
        postService.getPost(pageNo);
        pageNo++;
    };

    const style = {
        height: 300,
        border: "1px solid green",
        margin: 6,
        padding: 8,
    };

    useEffect(() => {
        fetchData();
    });

    return (
        <main>
            <Button onClick={fetchData}>Hello</Button>
            <InfiniteScroll
                dataLength={posts.length}
                next={fetchData}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                {posts.map((post) => (
                    <div style={style} key={post.id}>
                        {post.title}
                    </div>
                ))}
            </InfiniteScroll>
        </main>
    );
};

export default MainContent;
