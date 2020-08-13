import React from "react";

interface Props {
    size: number;
    sizeViewbox?: number;
    isChecked: boolean;
}

const Downvote = (props: Props) => {
    const getColor = () => {
        if (props.isChecked) return "#4287f5";
        else return "#2e2e2e";
    };

    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={getColor()} xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                strokeWidth="2"
                d="M17.1495 24.2872C16.4821 24.8743 15.5179 24.8743 14.8505 24.2872C14.0693 23.6 12.8797 22.5047 11.25 20.875C9.55681 19.1818 8.33861 17.7261 7.56005 16.72C7.07806 16.0972 7.52677 15.25 8.31433 15.25L12 15.25L12 8.96842C12 8.2201 12.4366 7.56497 13.1749 7.44316C13.8019 7.33973 14.7159 7.25 16 7.25C17.2841 7.25 18.1981 7.33973 18.8251 7.44317C19.5634 7.56497 20 8.2201 20 8.96842L20 15.25L23.6857 15.25C24.4732 15.25 24.9219 16.0972 24.44 16.72C23.6614 17.7261 22.4432 19.1818 20.75 20.875C19.1203 22.5047 17.9307 23.6 17.1495 24.2872Z"
            />
        </svg>
    );
};

export default Downvote;
