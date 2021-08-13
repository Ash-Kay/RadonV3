import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { FiLogOut } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import {
    Box,
    Typography,
    makeStyles,
    Avatar,
    Popper,
    Paper,
    ClickAwayListener,
    CardContent,
    Card,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
} from "@material-ui/core";
import authService from "../../state/auth/auth.service";
import CreatePostButton from "../CreatePostButton";
import LoginModal from "../LoginModal";

const useNavbarStyles = makeStyles((theme) => ({
    navRoot: {
        display: "flex",
        paddingLeft: 10,
        paddingRight: 10,
        background: theme.palette.background.paper,
        alignItems: "center",
        height: 50, //TODO: dynamic
        position: "fixed",
        width: "100%",
        top: 0,
        zIndex: theme.zIndex.appBar,
    },
    logoRoot: {
        height: 50,
        width: 50,
    },
    fullWidth: {
        margin: "0 auto 0 auto",
    },
    headerAvatar: {
        height: 35,
        width: 35,
        cursor: "pointer",
        margin: "8px 0 8px 8px !important",
    },
    profileChip: {
        color: theme.palette.grey[800],
        height: 40,
        alignItems: "center",
        borderRadius: 22,
        transition: "all .2s ease-in-out",
        borderColor: theme.palette.grey[700],
        backgroundColor: theme.palette.secondary.main,
    },
    avatarLabel: {
        fontWeight: theme.typography.fontWeightBold,
    },
    cardContent: {
        padding: "4px !important",
        width: 300,
    },
    flex: {
        display: "flex",
    },
    listItem: {
        borderRadius: theme.shape.borderRadius,
    },
    postButton: {
        borderRadius: 22,
        marginRight: 8,
    },
}));

const Navbar: React.FC = () => {
    const classes = useNavbarStyles();

    const authState = useContext(AuthContext);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const anchorRef = React.useRef(null);

    const handleClose = (event: unknown) => {
        setDropdownOpen(false);
    };

    const handleToggle = () => {
        setDropdownOpen((isDropdownOpen) => !isDropdownOpen);
    };

    const loggedOutItems = () => {
        return <LoginModal />;
    };

    const loggedInItems = () => {
        return (
            <>
                <CreatePostButton />
                <Avatar
                    src={authState.avatarUrl}
                    className={classes.headerAvatar}
                    ref={anchorRef}
                    aria-controls={isDropdownOpen ? "menu-list-grow" : undefined}
                    aria-haspopup="true"
                    alt={authState.username}
                    onClick={handleToggle}
                />
                <Popper
                    placement="bottom-end"
                    open={isDropdownOpen}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                >
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                            <Card elevation={16}>
                                <CardContent className={classes.cardContent}>
                                    <Grid container direction="column" spacing={0}>
                                        <List component="nav">
                                            <ListItem className={classes.listItem} button onClick={authService.logout}>
                                                <ListItemIcon>
                                                    <FiLogOut />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={<Typography variant="body2">Logout</Typography>}
                                                />
                                            </ListItem>
                                        </List>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </ClickAwayListener>
                    </Paper>
                </Popper>
            </>
        );
    };

    return (
        <Box className={classes.navRoot}>
            <Link href="/">
                <IconButton className={classes.logoRoot}>
                    <Image src="/logo.png" height={30} width={24} quality={1} />
                </IconButton>
            </Link>
            <Box className={classes.fullWidth} />
            {!authState.isLoggedIn && loggedOutItems()}
            {authState.isLoggedIn && loggedInItems()}
        </Box>
    );
};

export default Navbar;
