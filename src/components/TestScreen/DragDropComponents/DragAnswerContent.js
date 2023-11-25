const DragAnswerContent = (props) => {
    const content = <span>{props.phrase}</span>;
    return <>{props.phrase !== "" ? content : "..."}</>;
};

export default DragAnswerContent;
