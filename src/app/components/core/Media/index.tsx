interface Props {
    mediaUrl: string;
    mime: string;
    id: number;
    cursor?: string;
    onMediaClick?: (param: React.MouseEvent<HTMLImageElement | HTMLVideoElement, MouseEvent>) => void;
    fullScreenPost?: boolean;
    style?: React.CSSProperties;
}

const Media: React.FC<Props> = (props: Props) => {
    if (props.mime.startsWith("image"))
        return (
            <img
                style={{
                    // width: "100%",
                    // maxHeight: props.fullScreenPost ? "unset" : "800px",
                    objectFit: "cover",
                    display: "block",
                    cursor: props.cursor,
                    ...props.style,
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
                    display: "block",
                }}
                onClick={(e) => props.onMediaClick && props.onMediaClick(e)}
            >
                <source src={props.mediaUrl} type={props.mime} />
            </video>
        );
};

export default Media;

Media.defaultProps = {
    cursor: "auto",
};
