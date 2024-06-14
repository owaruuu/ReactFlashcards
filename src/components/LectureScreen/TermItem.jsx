import TermOptionsContainer from "../TermOptionButtons/TermOptionsContainer";

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

    const classNames = props.termData
        ? `termItem ${props.termData}`
        : "termItem";

    const termData = props.flipped ? (
        <div
            className={props.loggedIn ? "termData termDataDivider" : "termData"}
        >
            <div className="answer">{props.answer}</div>
            <div className="verticalRule"></div>
            <div className="term" style={{ textAlign: "end" }}>
                {term()}
            </div>
        </div>
    ) : (
        <div
            className={props.loggedIn ? "termData termDataDivider" : "termData"}
        >
            <div className="term">{term()}</div>
            <div className="verticalRule"></div>
            <div className="answer" style={{ textAlign: "end" }}>
                {props.answer}
            </div>
        </div>
    );

    return (
        <div className={classNames}>
            {termData}
            {props.showControls && (
                <TermOptionsContainer
                    globalQuery={props.globalQuery}
                    queryStatus={props.queryStatus}
                    queryIsRefetching={props.queryIsRefetching}
                    hasQueryData={props.hasQueryData}
                    state={props.termData}
                    language={props.flipped ? "spanish" : "japanese"}
                    onIconClick={props.onIconClick}
                    termId={props.id}
                />
            )}
        </div>
    );
};

export default TermItem;
