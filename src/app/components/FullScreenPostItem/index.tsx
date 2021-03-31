import React, { useContext } from "react";
import { Post, Vote } from "../../state/posts";
import { Box, Text, Flex } from "theme-ui";
import Media from "../core/Media";
import UpvoteButton from "../core/Buttons/UpvoteButton";
import { AuthContext } from "../../context/auth.context";
import { checkVoteState } from "../../../utils/checkVoteState";
import DownvoteButton from "../core/Buttons/DownvoteButton";
import Modal from "../core/Modal";

interface Props {
    item: Post;
}
const FullScreenPostItem: React.FC<Props> = (props: Props) => {
    const authState = useContext(AuthContext);
    const [isZoomImageModalOpen, setZoomImageModalOpen] = React.useState(false);

    const closeZoomImageModal = () => {
        setZoomImageModalOpen(false);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", width: "65%", mr: 3 }}>
            {props.item.mime.startsWith("image") && (
                <Modal
                    isOpen={isZoomImageModalOpen}
                    onModalClose={closeZoomImageModal}
                    sx={{ p: 0, maxHeight: "100vh", maxWidth: "75vw" }}
                >
                    <Media
                        mediaUrl={props.item.mediaUrl}
                        mime={props.item.mime}
                        id={props.item.id}
                        cursor="zoom-out"
                        onMediaClick={() => setZoomImageModalOpen(false)}
                        isFullPostScreen
                    />
                </Modal>
            )}

            <Box sx={{ height: "calc(100% - 40px)", display: "flex", flexDirection: "column" }}>
                <Text sx={{ fontSize: 3, fontWeight: "bold", color: "text" }} as={"p"}>
                    {props.item.title}
                </Text>
                <Box
                    sx={{ maxHeight: "100%", textAlign: "center", overflowY: "hidden" }}
                    onClick={() => console.log("clicked")}
                >
                    <Media
                        mediaUrl={props.item.mediaUrl}
                        mime={props.item.mime}
                        id={props.item.id}
                        cursor="zoom-in"
                        onMediaClick={() => setZoomImageModalOpen(true)}
                        isFullPostScreen
                    />
                </Box>
            </Box>
            <Flex sx={{ mx: "4px", height: "40px" }}>
                <UpvoteButton
                    id={props.item.id}
                    checked={checkVoteState(props.item.vote, authState.isLoggedIn, Vote.UPVOTED)}
                />
                <Text sx={{ fontSize: 3, px: "0.5rem", py: "6px" }}>
                    {props.item.voteSum ? props.item.voteSum : "0"}
                </Text>
                <DownvoteButton
                    id={props.item.id}
                    checked={checkVoteState(props.item.vote, authState.isLoggedIn, Vote.DOWNVOTED)}
                />
            </Flex>
        </Box>
    );
};

export default FullScreenPostItem;
