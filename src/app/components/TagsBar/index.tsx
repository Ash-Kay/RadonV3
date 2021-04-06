import React from "react";
import { Box, Flex } from "theme-ui";
import { Tag } from "../../state/posts/post.model";

interface Props {
    tags: Tag[];
}
interface TagProps {
    tagText: string;
}

const renderTags = (tags: Tag[]) => {
    return tags.map((item) => <TagItem key={item.id} tagText={item.tagText} />);
};

const TagsBar: React.FC<Props> = (props: Props) => {
    return <Flex sx={{ mt: 2 }}>{renderTags(props.tags)}</Flex>;
};

const TagItem: React.FC<TagProps> = (props: TagProps) => {
    return (
        <Box sx={{ ml: 1, p: 1, backgroundColor: "primary", borderRadius: "default", color: "black" }}>
            #{props.tagText}
        </Box>
    );
};

export default TagsBar;
