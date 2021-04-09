import React, { useContext, useState } from "react";
import { authService } from "../../state/auth/auth.service";
import CreatePostButton from "../CreatePostButton";
import SignupModal from "../SignupModal";
import LoginModal from "../LoginModal";
import { Flex, Text, Box } from "theme-ui";
import { Link } from "react-router-dom";
import Avatar from "../core/Avatar";
import { AuthContext } from "../../context/auth.context";
import DropDownItem from "../core/DropDownItem";
// import { useColorMode } from "theme-ui";
// import { DarkModeSwitch } from "react-toggle-dark-mode";
import DropDown from "../core/DropDown";
import { HiCog } from "react-icons/hi";
import { BsFillEyeFill } from "react-icons/bs";
import { RiLogoutBoxRFill } from "react-icons/ri";

const Navbar: React.FC = () => {
    const authState = useContext(AuthContext);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    // const [colorMode, setColorMode] = useColorMode();

    return (
        <Flex
            sx={{
                px: [1, 2, 3],
                bg: "secondary",
                alignItems: "center",
                height: "nav",
                position: "fixed",
                width: "100%",
                top: 0,
                zIndex: "nav",
            }}
        >
            <Link
                to={{ pathname: "/" }}
                style={{
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
                                boxShadow: (theme: any) => `0px 0px 0px 4px ${theme.colors.secondaryLight}`,
                            },
                        }}
                        onClick={() => setDropdownOpen(!isDropdownOpen)}
                    >
                        <Avatar avatarUrl={authState.avatarUrl} />
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
                        <DropDownItem text={"Settings"} icon={<HiCog />} />
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
