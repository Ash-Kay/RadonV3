import React from "react";
import { Box, Flex, Text } from "theme-ui";

interface Props {
    text: string;
    icon?: JSX.Element;
    url?: string;
    iconColor?: string;
    textColor?: string;
    onClickCallback?: () => void;
}

const DropDownItem: React.FC<Props> = (props: Props) => {
    return (
        <Flex
            sx={{
                height: "40px",
                lineHeight: "35px",
                cursor: "pointer",
                "&:not(:last-child)": {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    borderBottom: (theme: any) => `1px solid ${theme.colors.secondaryLight}`,
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
                        width: "iconSmall",
                        ml: "30px",
                        mr: "10px",
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
            <Text sx={{ paddingRight: "40px", lineHeight: "37px", color: props.textColor }}>{props.text}</Text>
        </Flex>
    );
};

DropDownItem.defaultProps = {};

export default DropDownItem;
