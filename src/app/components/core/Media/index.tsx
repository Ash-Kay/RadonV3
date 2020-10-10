import React from "react";
import { Image, Link } from "rebass";

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
                    maxHeight={!props.showFull ? "500px" : "auto"}
                    sx={{ width: "100%", objectFit: "cover" }}
                    src={"http://localhost:3000/" + props.mediaUrl}
                    alt=""
                />
            </Link>
        );
    else
        return (
            <video width="100%" controls>
                <source src={"http://localhost:3000/" + props.mediaUrl} type={props.mime} />
            </video>
        );
};

export default Media;
