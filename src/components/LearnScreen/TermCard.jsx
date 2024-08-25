const TermCard = (props) => {
    let classNames =
        props.state === "highlighted"
            ? "termCard gold"
            : props.state === "muted"
            ? "termCard muted"
            : "termCard";

    return (
        <div className={classNames}>
            <div className="term">
                <span>{props.term}</span>
            </div>
            <div className="divider"></div>
            <div className="answerSection">
                {props.showAnswer && props.answer}

                {!props.showAnswer && (
                    <div className="clickReveal" onClick={props.answerFunction}>
                        <span>Haz click para ver la respuesta</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TermCard;
