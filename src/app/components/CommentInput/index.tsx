import React, { useContext } from "react";
import { postService } from "../../state/posts";
import { Box, Flex, Text, Textarea, Input, Button, ThemeUIStyleObject } from "theme-ui";
import { AuthContext } from "../../context/auth.context";
import { MdAddAPhoto } from "react-icons/md";
import { RiCloseCircleFill } from "react-icons/ri";
import { globalService } from "../../state/global/global.service";

interface Props {
    postId: number;
}
export interface CommentForm {
    comment: string;
    file: File | null | undefined;
    //tagTo: number;
}

const CommentInput: React.FC<Props> = (props: Props) => {
    const authState = useContext(AuthContext);
    const [commentForm, setCommentForm] = React.useState(emptyCommentForm);
    const hiddenCommentFileInput = React.useRef<HTMLInputElement>(null);

    const postComment = () => {
        if (!authState.isLoggedIn) {
            globalService.setIsSignInModalOpen(true);
            return;
        }
        postService.postComment(props.postId, commentForm, authState.token);
        //TODO only clear if success
        setCommentForm(emptyCommentForm);
    };

    const commentStyle: ThemeUIStyleObject = {
        borderColor: "transparent",
        backgroundColor: "secondary",
        resize: "none",
        fontSize: 2,
        "&::placeholder": {
            fontWeight: "bold",
        },
    };

    return (
        <Box sx={{ mt: 1 }}>
            <Flex>
                <Flex sx={{ position: "relative", flexGrow: 1 }}>
                    <Textarea
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
                        <MdAddAPhoto color={commentForm.file !== null ? "#2ce" : undefined} size={16} />
                        <Input
                            onChange={(e) => setCommentForm({ ...commentForm, file: e.currentTarget.files?.item(0) })}
                            ref={hiddenCommentFileInput}
                            type="file"
                            sx={{ display: "none" }}
                        />
                    </Box>
                </Flex>
                <Button onClick={postComment} sx={{ ml: 1 }}>
                    Post
                </Button>
            </Flex>
            {commentForm.file && (
                <Flex>
                    <Text sx={{ mr: "0.5rem", fontSize: 1, fontWeight: "bold", lineHeight: 1.5 }}>
                        {commentForm.file?.name}
                    </Text>
                    <Box onClick={() => setCommentForm({ ...commentForm, file: null })} sx={{ mt: "auto" }}>
                        <RiCloseCircleFill size={16} />
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
