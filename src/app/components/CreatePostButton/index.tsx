import React from "react";
import { StyledNavigationItem as NavigationItem } from "baseui/header-navigation";
import { Button } from "baseui/button";
import { Modal, ModalHeader, ModalBody } from "baseui/modal";
import { FileUploader } from "baseui/file-uploader";
import { Input, StyledInput } from "baseui/input";
import { Checkbox, LABEL_PLACEMENT } from "baseui/checkbox";
import { useStyletron } from "baseui";
import { Tag, VARIANT as TAG_VARIANT } from "baseui/tag";

interface Props {}
interface Form {
    title: string;
    sensitive: boolean;
    tags: string[];
    file: File | null;
}
interface InputReplacementProps {
    tags: string[];
    removeTag: (tag: string) => void;
}

const NewPostButton = (props: Props) => {
    const [css] = useStyletron();
    const [isCreatePostModalOpen, setCreatePostModalOpen] = React.useState(false);
    const [createPostForm, setCreatePostForm] = React.useState(emtyForm);

    //Tags
    const [value, setValue] = React.useState("");
    const [tags, setTags] = React.useState(["hello"]);
    const addTag = (tag: string) => {
        setTags([...tags, tag]);
    };
    const removeTag = (tag: string) => {
        setTags(tags.filter((t) => t !== tag));
    };
    const handleKeyDown = (event: any) => {
        switch (event.keyCode) {
            // Enter
            case 13: {
                if (!value) return;
                addTag(value);
                setValue("");
                return;
            }
            // Backspace
            case 8: {
                if (value || !tags.length) return;
                removeTag(tags[tags.length - 1]);
                return;
            }
        }
    };
    const InputReplacement: any = React.forwardRef(({ tags, removeTag, ...restProps }: InputReplacementProps, ref) => {
        return (
            <div
                className={css({
                    flex: "1 1 0%",
                    flexWrap: "wrap",
                    display: "flex",
                    alignItems: "center",
                })}
            >
                {tags.map((tag: string, index: number) => (
                    <Tag variant={TAG_VARIANT.outlined} onActionClick={() => removeTag(tag)} key={index}>
                        {tag}
                    </Tag>
                ))}
                <StyledInput ref={ref} {...restProps} />
            </div>
        );
    });

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
                    <Input
                        placeholder={tags.length ? "" : "Enter A Tag"}
                        value={value}
                        onChange={(e) => setValue(e.currentTarget.value)}
                        overrides={{
                            Input: {
                                style: { width: "auto", flexGrow: 1 },
                                component: InputReplacement,
                                props: {
                                    tags: tags,
                                    removeTag: removeTag,
                                    onKeyDown: handleKeyDown,
                                },
                            },
                        }}
                    />
                </ModalBody>
            </Modal>
        </>
    );
};

export default NewPostButton;

const emtyForm: Form = {
    title: "",
    sensitive: false,
    tags: [],
    file: null,
};
