import TermOptionsContainer from "../TermOptionButtons/TermOptionsContainer";

const KanjiItem = (props) => {
    const term = <div>{props.extra}</div>;

    const classNames = props.termData
        ? `termItem ${props.termData}`
        : "termItem";

    const termData = props.flipped ? (
        <div
            className={props.loggedIn ? "termData termDataDivider" : "termData"}
        >
            <div className="answer">
                {props.term} - {props.answer}
            </div>
            <div className="verticalRule"></div>
            <div className="term" style={{ textAlign: "end" }}>
                {term}
            </div>
        </div>
    ) : (
        <div
            className={props.loggedIn ? "termData termDataDivider" : "termData"}
        >
            <div className="term">{term}</div>
            <div className="verticalRule"></div>
            <div className="answer" style={{ textAlign: "end" }}>
                {props.term} - {props.answer}
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
                    language={props.flipped ? "write" : "recognize"}
                    onIconClick={props.onIconClick}
                    termId={props.id}
                />
            )}
        </div>
    );
};

export default KanjiItem;
