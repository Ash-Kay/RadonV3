import React, { useContext } from "react";
import { postService } from "../../state/posts";
import { Box, Flex, Text, Textarea, Input, Button } from "theme-ui";
import { CloseRound, PaperClip } from "../Icons";
import { AuthContext } from "../../context/auth.context";

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

    const commentStyle = {
        borderColor: "transparent",
        backgroundColor: "secondary",
        fontSize: 3,
        "&::placeholder": {
            fontWeight: "bold",
        },
    };

    return (
        <Box sx={{ gridArea: "commInput" }}>
            <Flex>
                <Flex sx={{ position: "relative", flexGrow: 1 }}>
                    <Input
                        value={commentForm.comment}
                        onChange={(e) => setCommentForm({ ...commentForm, comment: e.currentTarget.value })}
                        placeholder="Commnet"
                        sx={commentStyle}
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
                <Button onClick={postComment} sx={{ ml: 1, color: "secondaryText", borderRadius: "default" }}>
                    Post
                </Button>
            </Flex>
            {commentForm.file && (
                <Flex>
                    <Text sx={{ ml: "2.5rem", mr: "0.5rem", fontSize: 1, fontWeight: "bold" }}>
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
