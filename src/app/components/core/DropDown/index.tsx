import React from "react";
import { Box, SxStyleProp } from "theme-ui";

interface Props {
    children: React.ReactNode;
    sx?: SxStyleProp;
    onOutsideClick: () => void;
}

const DropDown = (props: Props) => {
    return (
        <>
            <Box
                sx={{
                    position: "fixed",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: "modal",
                    backgroundColor: "debugColorBackground",
                }}
                onClick={() => props.onOutsideClick()}
            />
            <Box
                sx={{
                    position: "fixed",
                    color: "text",
                    backgroundColor: "secondary",
                    borderRadius: "default",
                    border: (theme) => `1px solid ${theme.colors.secondaryLight}`,
                    zIndex: "modal",
                    ...props.sx,
                }}
            >
                {props.children}
            </Box>
        </>
    );
};

DropDown.defaultProps = {};

export default DropDown;
