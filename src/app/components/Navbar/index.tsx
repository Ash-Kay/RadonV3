import React, { useContext, useState, useEffect, useRef } from "react";
import { authService } from "../../state/auth/auth.service";
import CreatePostButton from "../CreatePostButton";
import SignupModal from "../SignupModal";
import LoginModal from "../LoginModal";
import { Flex, Text, Box, Button, Link } from "rebass";
import Avatar from "../core/Avatar";
import { AuthContext } from "../../context/auth.context";
import { PaperClip } from "../Icons";
import DropDownItem from "../core/DropDownItem";

interface Props {}

const Navbar = (props: Props) => {
    const authState = useContext(AuthContext);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    return (
        <Flex
            sx={{
                px: [1, 2, 3],
                color: "white",
                bg: "black",
                alignItems: "center",
                height: "50px",
                position: "fixed",
                width: "100%",
                top: 0,
                zIndex: 100,
            }}
        >
            <Text
                sx={{
                    px: "6px",
                    height: "30px",
                    lineHeight: "30px",
                    fontWeight: "bold",
                    borderRadius: "2px",
                    ":hover": {
                        backgroundColor: "#ffffff24",
                    },
                    ":focus": {
                        backgroundColor: "#ffffff24",
                    },
                }}
            >
                RadonV3
            </Text>
            <Box mx="auto" />
            <>
                {authState.isLoggedIn && <CreatePostButton authState={authState} />}
                {!authState.isLoggedIn && <LoginModal />}
                {!authState.isLoggedIn && <SignupModal />}
                {authState.isLoggedIn && (
                    <Box
                        sx={{
                            ml: "0.5rem",
                            borderRadius: "circle",
                            cursor: "pointer",
                            ":hover": {
                                boxShadow: "0px 0px 0px 4px rgba(255,255,255,0.3)",
                            },
                        }}
                        onClick={() => setDropdownOpen(!isDropdownOpen)}
                    >
                        <Avatar avatarUrl={authState.avatarUrl} />
                    </Box>
                )}
                {isDropdownOpen && authState.isLoggedIn && (
                    <Box>
                        <Box
                            sx={{
                                position: "fixed",
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                width: "100%",
                                height: "100%",
                            }}
                            onClick={() => setDropdownOpen(false)}
                        />

                        <Box
                            sx={{
                                width: "200px",
                                position: "fixed",
                                color: "black",
                                backgroundColor: "white",
                                top: 50,
                                right: 2,
                                border: "1px solid rgba(0, 0, 0, 0.15)",
                                borderRadius: "5px",
                            }}
                        >
                            <DropDownItem text={"Settings"} icon={<PaperClip color="gray" />} />
                            <DropDownItem text={"Privacy"} icon={<PaperClip color="gray" />} />
                            <DropDownItem
                                text={"Logout"}
                                icon={<PaperClip color="gray" />}
                                onClickCallback={authService.logout}
                            />
                        </Box>
                    </Box>
                )}
            </>
        </Flex>
    );
};

export default Navbar;
