import React from "react";
import { Image } from "rebass";

interface Props {
    mediaUrl: string;
    mime: string;
}

const Media = (props: Props) => {
    if (props.mime.startsWith("image"))
        return <Image style={{ width: "100%" }} src={"http://localhost:3000/" + props.mediaUrl} alt="" />;
    else
        return (
            <video width="100%" controls>
                <source src={"http://localhost:3000/" + props.mediaUrl} type={props.mime} />
            </video>
        );
};

export default Media;
