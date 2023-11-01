const TermItem = (props) => {
    return (
        <div className="termItem">
            <div>
                {props.term} ({props.extra})
            </div>
            <div className="verticalRule"></div>
            <div className="answer">{props.answer}</div>
        </div>
    );
};

export default TermItem;
