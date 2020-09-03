import React from "react";
import theme from "../../../theme";

interface Props {
    isChecked: boolean;
    color?: string;
    activeColor?: string;
}

const Upvote = (props: Props) => {
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
                d="M 12.042969 0 L 0 12.425781 L 7.75 12.425781 L 7.75 23.976562 L 16.335938 23.976562 L 16.335938 12.425781 L 24.085938 12.425781 Z M 12.042969 0"
            />
        </svg>
    );
};

export default Upvote;

Upvote.defaultProps = {
    color: theme.colors.upvote.default,
    activeColor: theme.colors.upvote.active,
};

//https://uxwing.com/arrow-top-icon/
