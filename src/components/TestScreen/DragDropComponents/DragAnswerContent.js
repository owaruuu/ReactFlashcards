const DragAnswerContent = (props) => {
    console.log(
        "🚀 ~ file: DragAnswerContent.js:2 ~ DragAnswerContent ~ props:",
        props
    );
    const content = (
        <span>
            {props.first}
            {props.second}
        </span>
    );
    return (
        <>
            {props.first.length > 0 || props.second.length > 0
                ? content
                : "..."}
        </>
    );
};

export default DragAnswerContent;
