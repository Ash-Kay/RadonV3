import React from "react";
import { Image, ThemeUIStyleObject } from "theme-ui";

interface Props {
    mediaUrl: string;
    mime: string;
    id: number;
    imageSx?: ThemeUIStyleObject;
    isFullPostScreen?: boolean;
    cursor?: string;
    onMediaClick?: (param: React.MouseEvent<HTMLImageElement | HTMLVideoElement, MouseEvent>) => void;
}

const Media: React.FC<Props> = (props: Props) => {
    if (props.mime.startsWith("image"))
        return (
            <Image
                sx={{
                    cursor: props.cursor,
                    ...props.imageSx,
                }}
                src={props.mediaUrl}
                onClick={(e) => props.onMediaClick && props.onMediaClick(e)}
                alt=""
            />
        );
    else
        return (
            <video
                width="100%"
                controls
                style={{
                    height: props.isFullPostScreen ? "100%" : "auto",
                    maxHeight: props.isFullPostScreen ? "100%" : "60vh",
                }}
                onClick={(e) => props.onMediaClick && props.onMediaClick(e)}
            >
                <source src={props.mediaUrl} type={props.mime} />
            </video>
        );
};

export default Media;

Media.defaultProps = {
    isFullPostScreen: false,
    cursor: "auto",
};
