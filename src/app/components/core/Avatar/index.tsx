import React from "react";
import { Image, SxStyleProp, Link } from "theme-ui";

interface Props {
    avatarUrl?: string | null;
    height?: number;
    width?: number;
    sx?: SxStyleProp;
}

const Avatar = (props: Props) => {
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
};

export default Avatar;
