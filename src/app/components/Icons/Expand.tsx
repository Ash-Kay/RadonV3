import React from "react";
import theme from "../../../theme";

interface Props {
    size?: string;
    color?: string;
    activeColor?: string;
}

const Expand = (props: Props) => {
    return (
        <svg width={props.size} viewBox="0 0 24 24" fill={props.color} xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                strokeWidth="2"
                d="M 24 15.164062 L 24 23.195312 C 24 23.640625 23.640625 24 23.195312 24 L 15.101562 24 L 15.101562 22.121094 L 22.125 22.121094 C 22.125 19.710938 22.125 17.574219 22.125 15.164062 Z M 15.117188 1.863281 L 15.117188 0 L 23.195312 0 C 23.640625 0 24 0.363281 24 0.804688 L 24 8.847656 L 22.117188 8.847656 L 22.117188 1.863281 Z M 1.878906 8.835938 L 0 8.835938 L 0 0.804688 C 0 0.363281 0.359375 0 0.804688 0 L 8.8125 0 L 8.8125 1.882812 L 1.878906 1.882812 Z M 8.804688 22.125 L 8.804688 24 L 0.804688 24 C 0.359375 24 0 23.636719 0 23.191406 L 0 15.152344 L 1.878906 15.152344 L 1.878906 22.125 Z M 8.804688 22.125"
            />
        </svg>
    );
};

export default Expand;

Expand.defaultProps = {
    size: "24",
    color: theme.colors.upvote.default,
    activeColor: theme.colors.upvote.active,
};

//https://uxwing.com/arrow-top-icon/
