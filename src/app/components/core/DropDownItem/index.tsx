import React from "react";
import { Box, Flex, Text } from "rebass";

interface Props {
    text: string;
    icon?: JSX.Element;
    url?: string;
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
                    borderBottom: "1px solid rgba(1, 1, 1, 0.1)",
                },
                ":hover": {
                    backgroundColor: "rgba(1, 1, 1, 0.05)",
                },
            }}
            onClick={props.onClickCallback}
        >
            {props.icon && (
                <Box sx={{ width: "40px", display: "flex", alignSelf: "center", justifyContent: "center" }}>
                    {props.icon}
                </Box>
            )}
            <Text sx={{ px: "40px" }}>{props.text}</Text>
        </Flex>
    );
};

DropDownItem.defaultProps = {};

export default DropDownItem;
