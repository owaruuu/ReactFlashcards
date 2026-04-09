import CardAnswerSection from "./CardAnswerSection.jsx";

const TermCard = (props) => {
    let classNames =
        props.state === "highlighted"
            ? "termCard gold"
            : props.state === "muted"
              ? "termCard muted"
              : "termCard";

    const level = props.level;
    // console.log("🚀 ~ TermCard ~ level:", level);

    return (
        <div className={classNames}>
            <div className="term">
                {level && <div className="points">nivel:{level.level}</div>}
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
