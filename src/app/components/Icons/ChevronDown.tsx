import React from "react";

interface Props {
    size?: string;
    color?: string;
    activeColor?: string;
}

const ChevronDown: React.FC<Props> = (props: Props) => {
    return (
        <svg width={props.size} viewBox="0 0 24 24" fill={props.color} xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                strokeWidth="2"
                d="M 23.976562 0 L 23.976562 6.089844 L 11.988281 15.917969 L 0 6.089844 L 0 0 L 11.988281 9.832031 Z M 23.976562 0"
            />
        </svg>
    );
};

export default ChevronDown;

//TODO: FIX
ChevronDown.defaultProps = {
    size: "24",
    color: "#464646",
    activeColor: "#9c1b1b",
};

//https://uxwing.com/arrow-top-icon/
