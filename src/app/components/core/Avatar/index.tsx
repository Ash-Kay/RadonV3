import React from "react";
import { Image, SxStyleProp, Link, Box } from "rebass";

interface Props {
    avatarUrl?: string | null;
    height?: number;
    width?: number;
    focusRingColor?: string;
    sx?: SxStyleProp;
}

const Avatar: React.FunctionComponent<Props> = (props: Props) => {
    const getAvatarUrl = (avatarUrl: string | null | undefined): string => {
        if (avatarUrl === null || avatarUrl === undefined || avatarUrl === "")
            return `${process.env.PUBLIC_URL}/avatar.jpg`;
        else return avatarUrl;
    };

    return (
        <Link sx={{ minWidth: `${props.width!}px` }}>
            <Image
                src={getAvatarUrl(props.avatarUrl)}
                sx={{
                    minWidth: `${props.width!}px`,
                    height: `${props.height!}px`,
                    borderRadius: "50%",
                    ...props.sx,
                }}
            />
        </Link>
    );
};

Avatar.defaultProps = {
    avatarUrl: `${process.env.PUBLIC_URL}/avatar.jpg`,
    height: 30,
    width: 30,
    focusRingColor: "#ffffff44",
};

export default Avatar;