const TermList = (props) => {
    const { isWriteList, termItems } = props;
    const listClassNames = isWriteList ? "termList write" : "termList";
    return <div className={listClassNames}>{termItems}</div>;
};

export default TermList;
