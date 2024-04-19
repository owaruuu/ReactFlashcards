import TermOptionButton from "./TermOptionButtons/TermOptionButton";
import TermOptionsContainer from "./TermOptionButtons/TermOptionsContainer";

const TermItem = (props) => {
    // console.log("🚀 ~ TermItem ~ props:", props);
    let lectureData;
    if (props.lectureData) {
        lectureData = props.lectureData;
    }
    // console.log("🚀 ~ TermItem ~ lectureData:", lectureData);
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
                <TermOptionsContainer
                    termData={lectureData?.spanish_terms_data?.[props.id]}
                    language={"spanish"}
                    onIconClick={props.onIconClick}
                    termId={props.id}
                />
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
            <TermOptionsContainer
                termData={lectureData?.japanese_terms_data?.[props.id]}
                language={"japanese"}
                onIconClick={props.onIconClick}
                termId={props.id}
            />
        </div>
    );
};

export default TermItem;
