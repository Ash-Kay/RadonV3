import React, { useContext, useEffect, useState } from "react";
import { postComment } from "../../state/posts/post.service";
import { AuthContext } from "../../context/auth.context";
import { IoMdSend } from "react-icons/io";
import { Event } from "../../../analytics/Events";
import useGlobalStore from "../../state/global/global.store";
import { Box, IconButton, InputBase, makeStyles, TextField } from "@material-ui/core";
import { ImAttachment } from "react-icons/im";
import { DropzoneDialog } from "material-ui-dropzone";

interface Props {
    postId: number;
    refetchComments: () => void;
}
export interface CommentForm {
    comment: string;
    file: File | null | undefined;
    //tagTo: number;
}

const useCommentInputStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    inputBox: {
        backgroundColor: theme.palette.background.default,
        display: "flex",
        padding: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
    },
    inputIconButton: {
        height: "100%",
    },
}));

const CommentInput: React.FC<Props> = (props: Props) => {
    const classes = useCommentInputStyles();
    const [dropzoneOpen, setDropzoneOpen] = useState(false);
    const authState = useContext(AuthContext);
    const [commentForm, setCommentForm] = useState(emptyCommentForm);
    const updateGlobalState = useGlobalStore((state) => state.updateState);
    const [isCommentSubmitDisabled, setCommentSubmitDisabled] = useState(true);

    useEffect(() => {
        if (commentForm.comment || commentForm.file) {
            setCommentSubmitDisabled(false);
        } else {
            setCommentSubmitDisabled(true);
        }
    }, [commentForm]);

    const handlePostComment = () => {
        if (!authState.isLoggedIn) {
            updateGlobalState({ isLoginModalOpen: true });
            return;
        }
        if (commentForm.comment || commentForm.file) {
            postComment(props.postId, commentForm, authState.token, (isSuccess) => {
                if (isSuccess) setCommentForm(emptyCommentForm);
                props.refetchComments();
            });

            Event.COMMENT_BUTTON_VALID_SUBMIT(commentForm);
        }
    };

    return (
        <Box className={classes.root}>
            <Box className={classes.inputBox}>
                <InputBase
                    multiline
                    fullWidth
                    value={commentForm.comment}
                    onChange={(e) => setCommentForm({ ...commentForm, comment: e.currentTarget.value })}
                />

                <IconButton
                    color={commentForm.file ? "primary" : "secondary"}
                    className={classes.inputIconButton}
                    onClick={() => setDropzoneOpen(!dropzoneOpen)}
                >
                    <ImAttachment />
                </IconButton>
                <IconButton
                    disabled={isCommentSubmitDisabled}
                    color="secondary"
                    className={classes.inputIconButton}
                    onClick={handlePostComment}
                >
                    <IoMdSend />
                </IconButton>
            </Box>

            <DropzoneDialog
                acceptedFiles={["image/*", "video/*"]}
                maxFileSize={5242880} //5mb
                filesLimit={1}
                showFileNames
                cancelButtonText={"Cancel"}
                submitButtonText={"Upload"}
                showPreviewsInDropzone
                showPreviews={false}
                open={dropzoneOpen}
                clearOnUnmount={false}
                onClose={() => setDropzoneOpen(false)}
                onSave={(files) => {
                    setCommentForm({ ...commentForm, file: files[0] });
                    setDropzoneOpen(false);
                }}
                onDelete={() => {
                    setCommentForm({ ...commentForm, file: null });
                }}
            />
        </Box>
    );
};

export default CommentInput;

const emptyCommentForm: CommentForm = {
    comment: "",
    file: null,
};
