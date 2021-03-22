import React, { ReactNode } from "react";
import { Box, SxStyleProp } from "theme-ui";

interface Props {
    isOpen: boolean;
    onModalClose: (param: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    children: ReactNode;
    sx?: SxStyleProp;
}

const Modal = (props: Props) => {
    return (
        <Box
            sx={{
                height: "100%",
                width: "100%",
                position: "fixed",
                zIndex: 1,
                display: `${props.isOpen ? "flex" : "none"}`,
                alignItems: "center",
                justifyContent: "center",
                top: 0,
                left: 0,
            }}
        >
            <Box
                sx={{
                    position: "fixed",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0.5)",
                }}
                onClick={(e) => props.onModalClose(e)}
            />
            <Box
                sx={{
                    position: "relative",
                    maxHeight: "80vh",
                    padding: 20,
                    boxSizing: "border-box",
                    backgroundColor: "secondary",
                    margin: "40px auto",
                    borderRadius: 3,
                    zIndex: 2,
                    textAlign: "left",
                    boxShadow: "0 20px 30px rgba(0, 0, 0, 0.2)",
                    overflowY: "auto",
                    ...props.sx,
                }}
            >
                {props.children}
            </Box>
        </Box>
    );
};

export default Modal;
