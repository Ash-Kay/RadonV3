import React from "react";
import { Box } from "theme-ui";
import { ChevronDown } from "../../Icons";

interface Props {
    onClick: () => void;
}

const ChevronDownButton = (props: Props) => {
    return (
        <Box
            sx={{
                minWidth: "22px",
                cursor: "pointer",
                height: "22px",
                px: "5px",
                pt: "8px",
                borderRadius: "circle",
                ":hover": {
                    backgroundColor: "secondaryLight",
                },
            }}
            onClick={props.onClick}
        >
            <ChevronDown size="12px" color="gray" />
        </Box>
    );
};

export default ChevronDownButton;
