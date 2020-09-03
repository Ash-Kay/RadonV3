import React, { useContext } from "react";
import { authService } from "../../state/auth/auth.service";
import CreatePostButton from "../CreatePostButton";
import RegisterLoginModal from "../RegisterLoginModal";
import { Flex, Text, Box, Button } from "rebass";
import Avatar from "../core/Avatar";
import { AuthContext } from "../../context/auth.context";

interface Props {}

const Navbar = (props: Props) => {
    const authState = useContext(AuthContext);

    return (
        <Flex sx={{ px: [1, 2, 3], py: [2, 3, 3], color: "white", bg: "black", alignItems: "center" }}>
            <Text
                sx={{
                    p: "2",
                    fontWeight: "bold",
                    borderRadius: "3px",
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
            <Flex sx={{ columnGap: "1rem" }}>
                {authState.isLoggedIn && <CreatePostButton authState={authState} />}
                {authState.isLoggedIn && <Button onClick={authService.logout}>Logout</Button>}
                {!authState.isLoggedIn && <RegisterLoginModal />}
                {authState.isLoggedIn && <Avatar avatarUrl={authState.avatarUrl} />}
            </Flex>
        </Flex>
    );
};

export default Navbar;
