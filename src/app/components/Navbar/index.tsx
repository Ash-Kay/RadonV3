import React, { useContext, useState } from "react";
import { authService } from "../../state/auth/auth.service";
import CreatePostButton from "../CreatePostButton";
import SignupModal from "../SignupModal";
import LoginModal from "../LoginModal";
import { Flex, Text, Box, Link } from "theme-ui";
import Avatar from "../core/Avatar";
import { AuthContext } from "../../context/auth.context";
import DropDownItem from "../core/DropDownItem";
import { useColorMode } from "theme-ui";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import DropDown from "../core/DropDown";
import { HiCog } from "react-icons/hi";
import { BsFillEyeFill } from "react-icons/bs";
import { RiLogoutBoxRFill } from "react-icons/ri";

interface Props {}

const Navbar = (props: Props) => {
    const authState = useContext(AuthContext);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [colorMode, setColorMode] = useColorMode();

    return (
        <Flex
            sx={{
                px: [1, 2, 3],
                bg: "secondary",
                alignItems: "center",
                height: "50px",
                position: "fixed",
                width: "100%",
                top: 0,
                zIndex: "nav",
            }}
        >
            <Link
                href="/"
                sx={{
                    textDecoration: "none",
                }}
            >
                <Text
                    sx={{
                        fontSize: 4,
                        color: "primary",
                        p: "6px",
                        borderRadius: "5px",
                        fontWeight: "bold",
                        bg: "secondary",
                        ":hover, :focus, :active": {
                            filter: "brightness(110%)",
                        },
                    }}
                >
                    Radon
                </Text>
            </Link>
            <Box mx="auto" />
            <>
                {/* <Box
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
                </Box> */}

                {authState.isLoggedIn && <CreatePostButton authState={authState} />}
                {!authState.isLoggedIn && <LoginModal />}
                {!authState.isLoggedIn && false && <SignupModal />}
                {authState.isLoggedIn && (
                    <Box
                        sx={{
                            height: "30px",
                            ml: "0.5rem",
                            borderRadius: "circle",
                            cursor: "pointer",
                            ":hover": {
                                boxShadow: (theme) => `0px 0px 0px 4px ${theme.colors.secondaryLight}`,
                            },
                        }}
                        onClick={() => setDropdownOpen(!isDropdownOpen)}
                    >
                        <Avatar
                            avatarUrl={authState.avatarUrl}
                            sx={{
                                transition: "all 0.3s ease-in-out",
                                ":hover": {
                                    transform: "scale(0.8, 0.8)",
                                },
                            }}
                        />
                    </Box>
                )}
                {isDropdownOpen && authState.isLoggedIn && (
                    <DropDown
                        sx={{
                            top: 42,
                            right: 2,
                        }}
                        onOutsideClick={() => setDropdownOpen(false)}
                    >
                        <DropDownItem text={"Settings"} icon={<HiCog size="iconSmall" />} />
                        <DropDownItem text={"Privacy"} icon={<BsFillEyeFill />} />
                        <DropDownItem
                            text={"Logout"}
                            icon={<RiLogoutBoxRFill />}
                            onClickCallback={authService.logout}
                        />
                    </DropDown>
                )}
            </>
        </Flex>
    );
};

export default Navbar;
