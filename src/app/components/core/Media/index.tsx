import React from "react";
import { Image } from "theme-ui";

interface Props {
    mediaUrl: string;
    mime: string;
    id: number;
    isFullPostScreen?: boolean;
    cursor?: string;
    onMediaClick?: (param: React.MouseEvent<HTMLImageElement | HTMLVideoElement, MouseEvent>) => void;
}

const Media: React.FC<Props> = (props: Props) => {
    if (props.mime.startsWith("image"))
        return (
            <Image
                sx={{
                    objectFit: "cover",
                    width: "100%",
                    maxHeight: props.isFullPostScreen ? "100%" : "800px",
                    cursor: props.cursor,
                }}
                src={props.mediaUrl}
                onClick={(e) => props.onMediaClick && props.onMediaClick(e)}
                alt=""
            />
        );
    else
        return (
            <video width="100%" height="100%" controls onClick={(e) => props.onMediaClick && props.onMediaClick(e)}>
                <source src={props.mediaUrl} type={props.mime} />
            </video>
        );
};

export default Media;

Media.defaultProps = {
    isFullPostScreen: false,
    cursor: "auto",
};
