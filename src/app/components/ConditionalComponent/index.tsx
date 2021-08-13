import React from "react";

interface Props {
    shouldShow: boolean;
    children: any;
}

const ConditionalComponent: React.FC<Props> = React.forwardRef((props, ref) => {
    return <>{props.shouldShow && props.children}</>;
});

export default ConditionalComponent;
