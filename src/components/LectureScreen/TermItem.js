const TermItem = (props) => {
    const term = () => {
        if (props.extra) {
            return (
                <div>
                    {props.term} ({props.extra})
                </div>
            );
        } else {
            return <div>{props.term}</div>;
        }
    };

    return (
        <div className="termItem">
            <div className="term">{term()}</div>
            <div className="verticalRule"></div>
            <div className="answer">{props.answer}</div>
        </div>
    );
};

export default TermItem;
