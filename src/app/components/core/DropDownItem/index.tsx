import React from "react";
import { Box, Flex, Text } from "theme-ui";

interface Props {
    text: string;
    icon?: JSX.Element;
    url?: string;
    iconColor?: string;
    onClickCallback?: () => void;
}

const DropDownItem = (props: Props) => {
    return (
        <Flex
            sx={{
                height: "40px",
                lineHeight: "35px",
                cursor: "pointer",
                "&:not(:last-child)": {
                    borderBottom: (theme) => `1px solid ${theme.colors.secondaryLight}`,
                },
                ":hover": {
                    backgroundColor: "secondaryLight",
                    borderRadius: "default",
                },
            }}
            onClick={props.onClickCallback}
        >
            {props.icon && (
                <Box
                    sx={{
                        paddingLeft: "30px",
                        paddingRight: "10px",
                        display: "flex",
                        alignSelf: "center",
                        justifyContent: "center",
                        color: props.iconColor,
                    }}
                >
                    {props.icon}
                </Box>
            )}
            {!props.icon && <Box sx={{ paddingLeft: "40px" }} />}
            <Text sx={{ paddingRight: "40px" }}>{props.text}</Text>
        </Flex>
    );
};

DropDownItem.defaultProps = {};

export default DropDownItem;
