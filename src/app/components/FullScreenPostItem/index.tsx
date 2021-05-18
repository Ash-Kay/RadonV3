import React, { useContext, useState } from "react";
import { Post, Vote, postService } from "../../state/posts";
import { Box, Text, Flex } from "theme-ui";
import Media from "../core/Media";
import UpvoteButton from "../core/Buttons/UpvoteButton";
import { AuthContext } from "../../context/auth.context";
import { checkVoteState } from "../../../utils/checkVoteState";
import DownvoteButton from "../core/Buttons/DownvoteButton";
import Modal from "../core/Modal";
import TagsBar from "../TagsBar";
import ChevronDownButton from "../core/Buttons/ChevronDownButton";
import DropDownItem from "../core/DropDownItem";
import DropDown from "../core/DropDown";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { isDesktop } from "react-device-detect";
import Avatar from "../core/Avatar";
import { MdDelete } from "react-icons/md";
import { GoAlert } from "react-icons/go";

interface Props extends RouteComponentProps {
    item: Post;
}
const FullScreenPostItem: React.FC<Props> = (props: Props) => {
    const authState = useContext(AuthContext);
    const [isZoomImageModalOpen, setZoomImageModalOpen] = React.useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const closeZoomImageModal = () => {
        setZoomImageModalOpen(false);
    };

    const openZoomImageModalIfDesktop = () => {
        if (isDesktop) setZoomImageModalOpen(true);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", width: ["100%", "100%", "65%"], mr: 3 }}>
            {props.item.mime.startsWith("image") && (
                <Modal
                    isOpen={isZoomImageModalOpen}
                    onModalClose={closeZoomImageModal}
                    sx={{ p: 0, height: "90vh", width: "90vw" }}
                >
                    <Media
                        mediaUrl={props.item.mediaUrl}
                        mime={props.item.mime}
                        id={props.item.id}
                        cursor="zoom-out"
                        onMediaClick={closeZoomImageModal}
                        imageSx={{ width: "100%" }}
                    />
                </Modal>
            )}

            <Box sx={{ height: "calc(100% - 40px)", display: "flex", flexDirection: "column" }}>
                <Flex sx={{ justifyContent: "space-between" }}>
                    <Text sx={{ fontSize: 2, fontWeight: "bold", color: "text", mb: 1 }} as={"p"}>
                        {props.item.title}
                    </Text>

                    {authState.isLoggedIn && (
                        <Box sx={{ position: "relative", minWidth: 22 }}>
                            <ChevronDownButton
                                onClick={() => {
                                    setDropdownOpen(true);
                                }}
                            />

                            {isDropdownOpen && (
                                <DropDown
                                    sx={{
                                        position: "absolute",
                                        right: 0,
                                        zIndex: "modal",
                                    }}
                                    onOutsideClick={() => setDropdownOpen(false)}
                                >
                                    {/* <DropDownItem text={"Report"} icon={<GoAlert />} /> */}
                                    {props.item.user.id === authState.id && (
                                        <DropDownItem
                                            text={"Delete"}
                                            icon={<MdDelete />}
                                            onClickCallback={() =>
                                                postService.softDeletePost(props.item.id, authState.token, () => {
                                                    props.history.push("/");
                                                })
                                            }
                                            iconColor="error"
                                            textColor="error"
                                        />
                                    )}
                                </DropDown>
                            )}
                        </Box>
                    )}
                </Flex>
                <Box
                    sx={{
                        height: "100%",
                        textAlign: "center",
                        overflowY: "hidden",
                        width: "100%",
                        backgroundColor: "secondary",
                    }}
                >
                    <Media
                        mediaUrl={props.item.mediaUrl}
                        mime={props.item.mime}
                        id={props.item.id}
                        cursor={isDesktop ? "zoom-in" : "auto"}
                        onMediaClick={openZoomImageModalIfDesktop}
                        isFullPostScreen
                        imageSx={{
                            objectFit: "contain",
                            width: "100%",
                            height: "100%",
                        }}
                    />
                </Box>
                {props.item.tag && <TagsBar tags={props.item.tag} />}
            </Box>
            <Flex sx={{ mx: "4px", height: "40px", justifyContent: "space-between" }}>
                <Flex>
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

                <Flex sx={{ fontSize: 1, fontWeight: "bold", my: "auto" }}>
                    <Flex sx={{ flexDirection: "column", alignItems: "flex-end" }}>
                        <Text as="div" sx={{ mr: 2 }}>
                            {props.item.user.username}
                        </Text>
                        <Text as="div" sx={{ mr: 2, color: "rgba(255, 255, 255, 0.4)" }}>
                            {props.item.timeago}
                        </Text>
                    </Flex>
                    <Avatar avatarUrl={props.item.user.avatarUrl} height={30} width={30} />
                </Flex>
            </Flex>
        </Box>
    );
};

export default withRouter(FullScreenPostItem);
