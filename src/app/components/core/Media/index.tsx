import React from "react";
import { Image, Link } from "theme-ui";

interface Props {
    mediaUrl: string;
    mime: string;
    id: number;
    showFull?: boolean;
}

const Media = (props: Props) => {
    if (props.mime.startsWith("image"))
        return (
            <Image
                sx={{
                    objectFit: "cover",
                }}
                src={props.mediaUrl}
                alt=""
            />
        );
    else
        return (
            <video width="100%" controls>
                <source src={props.mediaUrl} type={props.mime} />
            </video>
        );
};

export default Media;
