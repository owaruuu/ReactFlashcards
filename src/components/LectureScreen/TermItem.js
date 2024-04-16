import TermOptionButton from "./TermOptionButtons/TermOptionButton";

const TermItem = (props) => {
    // console.log("🚀 ~ TermItem ~ props:", props);
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

    if (props.flipped) {
        return (
            <div className="termItem">
                <div className="termData">
                    <div className="answer">{props.answer}</div>
                    <div className="verticalRule"></div>
                    <div className="term" style={{ textAlign: "end" }}>
                        {term()}
                    </div>
                </div>
                <div className="termOptions">
                    <TermOptionButton
                        star
                        lectureId={props.lectureId}
                        id={props.id}
                    />
                    <TermOptionButton
                        lectureId={props.lectureId}
                        id={props.id}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="termItem">
            <div className="termData">
                <div className="term">{term()}</div>
                <div className="verticalRule"></div>
                <div className="answer" style={{ textAlign: "end" }}>
                    {props.answer}
                </div>
            </div>
            <div className="termOptions">
                <TermOptionButton
                    star
                    lectureId={props.lectureId}
                    id={props.id}
                />
                <TermOptionButton lectureId={props.lectureId} id={props.id} />
            </div>
        </div>
    );
};

export default TermItem;
