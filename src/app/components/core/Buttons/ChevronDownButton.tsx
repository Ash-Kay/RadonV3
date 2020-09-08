import React from "react";
import { Box } from "rebass";
import { ChevronDown } from "../../Icons";

interface Props {}

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
                    backgroundColor: "gray",
                },
            }}
        >
            <ChevronDown size="12px" color="gray" />
        </Box>
    );
};

export default ChevronDownButton;
