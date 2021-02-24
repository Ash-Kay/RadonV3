import React from "react";
import theme from "../../../theme";

interface Props {
    color?: string;
}

const Logout = (props: Props) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke={props.color}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "block" }}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
        </svg>
    );
};

export default Logout;

Logout.defaultProps = {
    color: theme.colors.defaultIcon,
};

//https://heroicons.com/
//PaperClip