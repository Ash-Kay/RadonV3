import React, { useContext, useState } from "react";
import { authService } from "../../state/auth/auth.service";
import CreatePostButton from "../CreatePostButton";
import SignupModal from "../SignupModal";
import LoginModal from "../LoginModal";
import { Flex, Text, Box, Button, Link } from "theme-ui";
import Avatar from "../core/Avatar";
import { AuthContext } from "../../context/auth.context";
import { Logout, Cog, Globe } from "../Icons";
import DropDownItem from "../core/DropDownItem";
import { useColorMode } from "theme-ui";
import { DarkModeSwitch } from "react-toggle-dark-mode";

interface Props {}

const Navbar = (props: Props) => {
    const authState = useContext(AuthContext);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [colorMode, setColorMode] = useColorMode();

    return (
        <Flex
            sx={{
                px: [1, 2, 3],
                color: "white",
                bg: "black",
                alignItems: "center",
                height: "70px",
                position: "fixed",
                width: "100%",
                top: 0,
                zIndex: 100,
                borderBottomWidth: "3px",
                borderBottomStyle: "solid",
                borderBottomColor: "white",
            }}
        >
            <Link
                href="/"
                sx={{
                    border: "3px solid white",
                    textDecoration: "none",
                    ":hover,:focus,:active": {
                        color: "primary",
                    },
                }}
            >
                <Text
                    sx={{
                        color: "white",
                        px: "6px",
                        height: "40px",
                        width: "40px",
                        fontSize: "40px",
                        lineHeight: "35px",
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
                    R
                </Text>
            </Link>
            <Box mx="auto" />
            <>
                <Box
                    sx={{
                        mr: "0.5rem",
                        p: 1,
                        borderRadius: "circle",
                        cursor: "pointer",
                        ":hover": {
                            background: "rgba(255, 255, 255, 0.15)",
                        },
                    }}
                >
                    <DarkModeSwitch
                        style={{}}
                        checked={colorMode === "dark"}
                        onChange={() => {
                            setColorMode(colorMode === "default" ? "dark" : "default");
                        }}
                        size={25}
                        sunColor="#fff"
                        moonColor="#fff"
                    />
                </Box>

                {authState.isLoggedIn && <CreatePostButton authState={authState} />}
                {!authState.isLoggedIn && <LoginModal />}
                {!authState.isLoggedIn && false && <SignupModal />}
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
                                backgroundColor: "debugColorBackground",
                            }}
                            onClick={() => setDropdownOpen(false)}
                        />

                        <Box
                            sx={{
                                position: "fixed",
                                color: "text",
                                backgroundColor: "foreground",
                                top: 50,
                                right: 2,
                                border: "1px solid rgba(0, 0, 0, 0.15)",
                            }}
                        >
                            <DropDownItem text={"Settings"} icon={<Cog color="gray" />} />
                            <DropDownItem text={"Privacy"} icon={<Globe color="gray" />} />
                            <DropDownItem
                                text={"Logout"}
                                icon={<Logout color="gray" />}
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
