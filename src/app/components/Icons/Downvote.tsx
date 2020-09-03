import React from "react";
import theme from "../../../theme";

interface Props {
    isChecked: boolean;
    color?: string;
    activeColor?: string;
}

const Downvote = (props: Props) => {
    const getColor = () => {
        if (props.isChecked) return props.activeColor;
        else return props.color;
    };

    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={getColor()} xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                strokeWidth="2"
                d="M 12.042969 23.976562 L 0 11.550781 L 7.75 11.550781 L 7.75 0 L 16.335938 0 L 16.335938 11.550781 L 24.085938 11.550781 Z M 12.042969 23.976562"
            />
        </svg>
    );
};

export default Downvote;

Downvote.defaultProps = {
    color: theme.colors.downvote.default,
    activeColor: theme.colors.downvote.active,
};

//https://uxwing.com/arrow-bottom-icon/
