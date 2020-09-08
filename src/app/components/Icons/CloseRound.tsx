import React from "react";
import theme from "../../../theme";

interface Props {
    color?: string;
    height?: number;
    width?: number;
}

const CloseRound = (props: Props) => {
    return (
        <svg
            height={props.height}
            width={props.width}
            viewBox="0 0 24 24"
            fill={props.color}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                strokeWidth="2"
                d="M 11.988281 0 C 18.609375 0 23.976562 5.367188 23.976562 11.988281 C 23.976562 18.609375 18.609375 23.976562 11.988281 23.976562 C 5.367188 23.976562 0 18.609375 0 11.988281 C 0 5.367188 5.367188 0 11.988281 0 Z M 15.945312 7.070312 C 16.210938 6.800781 16.640625 6.800781 16.910156 7.070312 C 17.175781 7.335938 17.175781 7.765625 16.910156 8.03125 L 12.953125 11.988281 L 16.90625 15.945312 C 17.175781 16.210938 17.175781 16.640625 16.90625 16.90625 C 16.640625 17.175781 16.210938 17.175781 15.945312 16.90625 L 11.988281 12.953125 L 8.03125 16.90625 C 7.765625 17.175781 7.335938 17.175781 7.070312 16.90625 C 6.800781 16.640625 6.800781 16.210938 7.070312 15.945312 L 11.023438 11.988281 L 7.070312 8.03125 C 6.800781 7.765625 6.800781 7.335938 7.070312 7.070312 C 7.335938 6.800781 7.765625 6.800781 8.03125 7.070312 L 11.988281 11.023438 Z M 15.945312 7.070312 "
            />
        </svg>
    );
};

export default CloseRound;

CloseRound.defaultProps = {
    color: theme.colors.defaultIcon,
    height: 24,
    width: 24,
};

//https://uxwing.com/close-round-icon/