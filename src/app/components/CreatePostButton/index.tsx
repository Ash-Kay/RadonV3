import React from "react";
import postService from "../../state/posts/post.service";
import { Event } from "../../../analytics/Events";
import useAuthStore from "../../state/auth/auth.store";
import {
    Box,
    Button,
    Card,
    Checkbox,
    Chip,
    FormControlLabel,
    makeStyles,
    TextField,
    Typography,
} from "@material-ui/core";
import { FiHash, FiPlus } from "react-icons/fi";
import { Modal } from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import clsx from "clsx";
import CancelIcon from "@material-ui/icons/Cancel";

export interface NewPostForm {
    title: string;
    sensitive: boolean;
    tags: string[];
    file: File | null | undefined;
}

const useNewPostButtonStyles = makeStyles((theme) => ({
    postButton: {
        borderRadius: 22,
        marginRight: 8,
    },
    modal: {
        display: "flex",
        justifyContent: "center",
        [theme.breakpoints.down("sm")]: {
            alignItems: "flex-end",
        },
        alignItems: "center",
    },
    paper: {
        width: 500,
        maxWidth: "100vw",
        padding: theme.spacing(2, 4, 3),
        maxHeight: "90vh",
        overflowY: "auto",
    },
    formElements: {
        marginTop: 12,
    },
    boldText: {
        fontWeight: 700,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    chipGroup: {
        maxWidth: "500px",
        display: "flex",
        flexWrap: "wrap",
    },
    innerFlex: {
        display: "flex",
    },
    closeButton: {
        marginLeft: theme.spacing(1),
        cursor: "pointer",
        "&:hover": {
            opacity: 0.7,
        },
    },
}));

const NewPostButton: React.FC = () => {
    const classes = useNewPostButtonStyles();
    const authState = useAuthStore((state) => state.data);

    const [isCreatePostModalOpen, setCreatePostModalOpen] = React.useState(false);
    const [createPostForm, setCreatePostForm] = React.useState(emtyForm);
    const [tagInput, setTagInput] = React.useState("");

    const submitNewPostForm = () => {
        if (createPostForm.file && createPostForm.title) {
            postService.createNewPost(createPostForm, (isSuccess) => {
                if (isSuccess) setCreatePostForm(emtyForm);
            });
            setCreatePostModalOpen(false);
            Event.CREATE_POST_BUTTON_VALID_SUBMIT(createPostForm);
        }
    };
    const closeCreatePostModal = () => {
        setCreatePostModalOpen(false);
    };
    const createPostButtonClick = () => {
        setCreatePostModalOpen(true);
        Event.CREATE_POST_BUTTON_CLICK();
    };
    const handleTagDelete = (deleteIndex: number) => {
        setCreatePostForm({
            ...createPostForm,
            tags: createPostForm.tags.filter((value, index) => {
                if (deleteIndex != index) return value;
            }),
        });
    };
    const renderTagsChip = () => {
        return createPostForm.tags.map((tag, index) => (
            <Chip icon={<FiHash />} label={tag} onDelete={() => handleTagDelete(index)} className={classes.chip} />
        ));
    };
    const addTag = () => {
        if (createPostForm.tags.length < 5) {
            setCreatePostForm({ ...createPostForm, tags: [...createPostForm.tags, tagInput] });
            setTagInput("");
        } else {
            // showerror
        }
    };

    return (
        <>
            <Button
                onClick={createPostButtonClick}
                className={classes.postButton}
                variant="contained"
                color="secondary"
                startIcon={<FiPlus />}
            >
                Post
            </Button>
            <Modal disablePortal open={isCreatePostModalOpen} onClose={closeCreatePostModal} className={classes.modal}>
                <Box className={classes.innerFlex}>
                    <Card className={classes.paper}>
                        <Typography variant="h6" className={classes.boldText}>
                            Create New Post
                        </Typography>
                        <Box className={classes.formElements}>
                            <DropzoneArea
                                acceptedFiles={["image/*", "video/*"]}
                                maxFileSize={5242880} //5mb
                                filesLimit={1}
                                showFileNames
                                onDrop={(droppedFiles) => {
                                    setCreatePostForm({ ...createPostForm, file: droppedFiles[0] });
                                }}
                            />
                        </Box>
                        <Box className={classes.formElements}>
                            <TextField
                                required
                                fullWidth
                                variant="outlined"
                                label="Title"
                                placeholder="Creative title"
                                inputProps={{ maxLength: 100 }}
                                onChange={(e) => setCreatePostForm({ ...createPostForm, title: e.currentTarget.value })}
                            />
                        </Box>
                        <Box className={clsx(classes.chipGroup, classes.formElements)}>{renderTagsChip()}</Box>
                        <Box className={classes.formElements}>
                            <TextField
                                value={tagInput}
                                fullWidth
                                variant="outlined"
                                label="Tags"
                                placeholder="#Funny"
                                onChange={(event) => {
                                    setTagInput(event.target.value);
                                }}
                                onKeyPress={(event) => {
                                    if (event.key === "Enter") {
                                        addTag();
                                        event.preventDefault();
                                    }
                                }}
                            />
                        </Box>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={createPostForm.sensitive}
                                    onChange={(e) =>
                                        setCreatePostForm({ ...createPostForm, sensitive: e.currentTarget.checked })
                                    }
                                    name="sensitive"
                                />
                            }
                            label="Sensitive Media"
                        />
                        <Box className={classes.formElements}>
                            <Button
                                fullWidth
                                onClick={submitNewPostForm}
                                className={classes.postButton}
                                variant="contained"
                                color="secondary"
                            >
                                Submit
                            </Button>
                        </Box>
                    </Card>
                    <CancelIcon fontSize="large" className={classes.closeButton} onClick={closeCreatePostModal} />
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
