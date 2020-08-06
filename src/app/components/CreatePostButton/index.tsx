import React from "react";
import { postService } from "../../state/posts";
import { AuthState } from "../../state/auth/auth.model";
import { Box, Button } from "rebass";
import Modal from "../core/Modal";
import { Input, Label, Checkbox } from "@rebass/forms";

interface Props {
    authState: AuthState;
}
export interface NewPostForm {
    title: string;
    sensitive: boolean;
    // tags: string[];
    file: File | null | undefined;
}

const NewPostButton = (props: Props) => {
    const [isCreatePostModalOpen, setCreatePostModalOpen] = React.useState(false);
    const [createPostForm, setCreatePostForm] = React.useState(emtyForm);

    //Todo Tags!
    const submitNewPostForm = () => {
        if (createPostForm.file !== null && createPostForm.title !== "" && createPostForm.file !== undefined) {
            postService.createNewPost(createPostForm, props.authState.token);
            setCreatePostModalOpen(false);
        }
    };
    const closeCreatePostModal = () => {
        setCreatePostModalOpen(false);
    };

    return (
        <>
            <Button onClick={() => setCreatePostModalOpen(true)}>Create Post</Button>
            <Modal isOpen={isCreatePostModalOpen} onModalClose={closeCreatePostModal}>
                <Box sx={{ color: "text" }}>
                    <h2>Create New Post</h2>
                    <Input
                        // value={createPostForm.file?.name}
                        onChange={(e) => setCreatePostForm({ ...createPostForm, file: e.currentTarget.files?.item(0) })}
                        placeholder="Upload File"
                        type="file"
                    />
                    <Input
                        value={createPostForm.title}
                        onChange={(e) => setCreatePostForm({ ...createPostForm, title: e.currentTarget.value })}
                        placeholder="Enter Title"
                    />
                    <Label>
                        <Checkbox
                            checked={createPostForm.sensitive}
                            onChange={(e) =>
                                setCreatePostForm({ ...createPostForm, sensitive: e.currentTarget.checked })
                            }
                        />
                        Sensitive Media
                    </Label>
                    <Button onClick={submitNewPostForm}>Submit</Button>
                </Box>
            </Modal>
        </>
    );
};

export default NewPostButton;

const emtyForm: NewPostForm = {
    title: "",
    sensitive: false,
    // tags: [],
    file: null,
};
