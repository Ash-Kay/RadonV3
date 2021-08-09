interface Props {
    shouldShow: boolean;
    children: any;
}

const ConditionalComponent: React.FC<Props> = (props: Props) => {
    return <>{props.shouldShow && props.children}</>;
};

export default ConditionalComponent;
