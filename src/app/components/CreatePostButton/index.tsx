import React from "react";
import { postService } from "../../state/posts";
import { AuthState } from "../../state/auth/auth.model";
import { Box, Button, Input, Label, Checkbox, Text } from "theme-ui";
import Modal from "../core/Modal";
import TagsInput from "react-tagsinput";
import "./tagsInputStyle.css";

interface Props {
    authState: AuthState;
}
export interface NewPostForm {
    title: string;
    sensitive: boolean;
    tags: string[];
    file: File | null | undefined;
}

const NewPostButton: React.FC<Props> = (props: Props) => {
    const [isCreatePostModalOpen, setCreatePostModalOpen] = React.useState(false);
    const [createPostForm, setCreatePostForm] = React.useState(emtyForm);

    const submitNewPostForm = () => {
        if (createPostForm.file !== null && createPostForm.title !== "" && createPostForm.file !== undefined) {
            postService.createNewPost(createPostForm, props.authState.token);
            setCreatePostModalOpen(false);
        }
    };
    const closeCreatePostModal = () => {
        setCreatePostModalOpen(false);
    };
    //TODO: Make modal bigger, show chosen image (maybe)
    return (
        <>
            <Button variant="nav" onClick={() => setCreatePostModalOpen(true)}>
                + Post
            </Button>
            <Modal isOpen={isCreatePostModalOpen} onModalClose={closeCreatePostModal}>
                <Box sx={{ color: "text" }}>
                    <Text sx={{ fontSize: 4, fontWeight: "bold", color: "primary" }}>Create New Post</Text>
                    {/* <h2>Create New Post</h2> */}
                    <Input
                        onChange={(e) => setCreatePostForm({ ...createPostForm, file: e.currentTarget.files?.item(0) })}
                        placeholder="Upload File"
                        type="file"
                        sx={{ my: "1rem" }}
                    />
                    <Input
                        value={createPostForm.title}
                        onChange={(e) => setCreatePostForm({ ...createPostForm, title: e.currentTarget.value })}
                        placeholder="Enter Title"
                        sx={{ my: "1rem" }}
                    />
                    <Box
                        sx={{
                            ".react-tagsinput-tag": {
                                color: "text",
                                backgroundColor: "secondaryLight",
                                fontFamily: "body",
                                fontSize: "inherit",
                            },

                            ".react-tagsinput-input": {
                                color: "text",
                                fontSize: 2,
                                "::placeholder": {
                                    fontFamily: "inherit",
                                    fontSize: 2,
                                },
                            },
                        }}
                    >
                        <TagsInput
                            value={createPostForm.tags}
                            onChange={(tags) => setCreatePostForm({ ...createPostForm, tags })}
                            maxTags={5}
                            validationRegex={/^[a-z0-9]+$/i}
                        />
                    </Box>
                    <Label sx={{ my: "1rem" }}>
                        <Checkbox
                            checked={createPostForm.sensitive}
                            onChange={(e) =>
                                setCreatePostForm({ ...createPostForm, sensitive: e.currentTarget.checked })
                            }
                        />
                        <Text sx={{ my: "auto" }}>Sensitive Media</Text>
                    </Label>
                    <Button onClick={submitNewPostForm} sx={{ width: "100%" }}>
                        Submit
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default NewPostButton;

const emtyForm: NewPostForm = {
    title: "",
    sensitive: false,
    tags: [],
    file: null,
};
