import React, { useContext, useState, useEffect, useRef } from "react";
import { authService } from "../../state/auth/auth.service";
import CreatePostButton from "../CreatePostButton";
import RegisterLoginModal from "../RegisterLoginModal";
import { Flex, Text, Box, Button } from "rebass";
import Avatar from "../core/Avatar";
import { AuthContext } from "../../context/auth.context";

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
                {authState.isLoggedIn && (
                    <Button variant="nav" onClick={authService.logout}>
                        Logout
                    </Button>
                )}
                {!authState.isLoggedIn && <RegisterLoginModal />}
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
                {isDropdownOpen && (
                    <Box
                        sx={{
                            width: "200px",
                            position: "fixed",
                            color: "black",
                            backgroundColor: "white",
                            top: 50,
                            right: 2,
                            border: "1px solid #ccc",
                            boxShadow: "0 0 6px 0 rgba(0,0,0,0.1)",
                        }}
                    >
                        <Text>SYUF</Text>
                        <Text>SYUF</Text>
                        <Text>SYUF</Text>
                    </Box>
                )}
            </>
        </Flex>
    );
};

export default Navbar;
