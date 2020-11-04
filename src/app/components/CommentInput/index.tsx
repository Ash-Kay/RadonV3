import React, { useContext } from "react";
import { postService } from "../../state/posts";
import { Box, Flex, Text } from "rebass";
import { CloseRound, PaperClip } from "../Icons";
import { AuthContext } from "../../context/auth.context";
import { Input } from "@rebass/forms";

interface Props {
    postId: number;
}
export interface CommentForm {
    comment: string;
    file: File | null | undefined;
    //tagTo: number;
}

const CommentInput = (props: Props) => {
    const authState = useContext(AuthContext);
    const [commentForm, setCommentForm] = React.useState(emptyCommentForm);
    const hiddenCommentFileInput = React.useRef<HTMLInputElement>(null);

    const postComment = () => {
        //TODO show login modal
        if (!authState.isLoggedIn) return;
        postService.postComment(props.postId, commentForm, authState.token);
        //TODO only clear if success
        setCommentForm(emptyCommentForm);
    };

    const commentInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            postComment();
        }
    };

    const commentStyle = {
        borderRadius: "16px",
        borderColor: "transparent",
        backgroundColor: "#ededed",
        // marginRight: "0.5rem",
        // marginLeft: "2rem",
    };

    return (
        <Box>
            <Flex sx={{ position: "relative" }}>
                <Input
                    value={commentForm.comment}
                    onChange={(e) => setCommentForm({ ...commentForm, comment: e.currentTarget.value })}
                    placeholder="Commnet"
                    sx={commentStyle}
                    onKeyDown={commentInputKeyDown}
                />
                <Box
                    sx={{
                        cursor: "pointer",
                        my: "auto",
                        position: "absolute",
                        right: "8px",
                        top: "50%",
                        transform: "translateY(-50%)",
                    }}
                    onClick={() => {
                        hiddenCommentFileInput.current?.click();
                    }}
                >
                    <PaperClip color={commentForm.file !== null ? "#2ce" : undefined} />
                    <Input
                        onChange={(e) => setCommentForm({ ...commentForm, file: e.currentTarget.files?.item(0) })}
                        ref={hiddenCommentFileInput}
                        type="file"
                        sx={{ display: "none" }}
                    />
                </Box>
            </Flex>
            {commentForm.file && (
                <Flex>
                    <Text fontSize={12} fontWeight="bold" sx={{ ml: "2.5rem", mr: "0.5rem" }}>
                        {commentForm.file?.name}
                    </Text>
                    <Box onClick={(e) => setCommentForm({ ...commentForm, file: null })}>
                        <CloseRound width={12} />
                    </Box>
                </Flex>
            )}
        </Box>
    );
};

export default CommentInput;

const emptyCommentForm: CommentForm = {
    comment: "",
    file: null,
};
