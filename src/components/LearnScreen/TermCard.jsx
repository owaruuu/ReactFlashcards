import CardAnswerSection from "./CardAnswerSection.jsx";

const TermCard = (props) => {
    let classNames =
        props.state === "highlighted"
            ? "termCard gold"
            : props.state === "muted"
            ? "termCard muted"
            : "termCard";

    const points = props.points;

    return (
        <div className={classNames}>
            <div className="term">
                {points && <div className="points">{points.points}</div>}
                <span>{props.term}</span>
            </div>
            <div className="divider"></div>
            <div className="answerSection">
                {props.showAnswer && (
                    <CardAnswerSection
                        answerText={props.answer}
                        japExampleSentence={props.japSentence}
                        espExampleSentence={props.espSentence}
                    />
                )}

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
