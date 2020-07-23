import React from "react";
import { StyledNavigationItem as NavigationItem } from "baseui/header-navigation";
import { Button } from "baseui/button";
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalButton } from "baseui/modal";
import { FileUploader } from "baseui/file-uploader";
import { Input } from "baseui/input";
import { Checkbox, LABEL_PLACEMENT } from "baseui/checkbox";
import { postService } from "../../state/posts";
import { AuthState } from "../../state/auth/auth.model";

interface Props {
    authState: AuthState;
}
export interface NewPostForm {
    title: string;
    sensitive: boolean;
    // tags: string[];
    file: File | null;
}

const NewPostButton = (props: Props) => {
    const [isCreatePostModalOpen, setCreatePostModalOpen] = React.useState(false);
    const [createPostForm, setCreatePostForm] = React.useState(emtyForm);

    //Todo Tags!
    const submitNewPostForm = () => {
        if (createPostForm.file !== null && createPostForm.title !== "") {
            postService.createNewPost(createPostForm, props.authState.token);
            setCreatePostModalOpen(false);
        }
    };

    return (
        <>
            <NavigationItem>
                <Button onClick={() => setCreatePostModalOpen(true)}>Create Post</Button>
            </NavigationItem>

            <Modal
                onClose={() => setCreatePostModalOpen(false)}
                isOpen={isCreatePostModalOpen}
                overrides={{
                    Dialog: {
                        style: {
                            width: "40vw",
                            height: "80vh",
                            display: "flex",
                            flexDirection: "column",
                        },
                    },
                }}
            >
                <ModalHeader>Create Post</ModalHeader>
                <ModalBody style={{ flex: "1 1 0" }}>
                    <h3>{createPostForm.file?.name}</h3>
                    <FileUploader
                        onDrop={(acceptedFiles, rejectedFiles) => {
                            setCreatePostForm({ ...createPostForm, file: acceptedFiles[0] });
                        }}
                    />
                    <Input
                        value={createPostForm.title}
                        onChange={(e) => setCreatePostForm({ ...createPostForm, title: e.currentTarget.value })}
                        placeholder="Enter Title"
                    />
                    <Checkbox
                        checked={createPostForm.sensitive}
                        onChange={(e) => setCreatePostForm({ ...createPostForm, sensitive: e.currentTarget.checked })}
                        labelPlacement={LABEL_PLACEMENT.right}
                    >
                        Sensitive Media
                    </Checkbox>
                </ModalBody>
                <ModalFooter>
                    <ModalButton onClick={submitNewPostForm}>Submit</ModalButton>
                </ModalFooter>
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
