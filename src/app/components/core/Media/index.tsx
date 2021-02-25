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
            <Link href={`/posts/${props.id}`}>
                <Image
                    sx={{ width: "100%", objectFit: "cover", maxHeight: `${!props.showFull ? "500px" : "auto"}` }}
                    src={props.mediaUrl}
                    alt=""
                />
            </Link>
        );
    else
        return (
            <video width="100%" controls>
                <source src={props.mediaUrl} type={props.mime} />
            </video>
        );
};

export default Media;
