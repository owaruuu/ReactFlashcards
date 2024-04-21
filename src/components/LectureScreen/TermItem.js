import TermOptionsContainer from "./TermOptionButtons/TermOptionsContainer";

const TermItem = (props) => {
    // console.log("🚀 ~ TermItem ~ props:", props);
    let japaneseLectureData = undefined;
    // console.log(
    //     "🚀 ~ TermItem ~ japaneseLectureData:",
    //     japaneseLectureData === undefined
    // );
    let spanishLectureData = undefined;
    if (props.japaneseLectureData) {
        japaneseLectureData = props.japaneseLectureData;
    }
    if (props.spanishLectureData) {
        spanishLectureData = props.spanishLectureData;
    }

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

    // console.log(japaneseLectureData?.[props.id]);
    const japaneseClassName = japaneseLectureData?.[props.id]
        ? `termItem ${japaneseLectureData?.[props.id]}`
        : "termItem";

    const spanishClassName = spanishLectureData?.[props.id]
        ? `termItem ${spanishLectureData?.[props.id]}`
        : "termItem";

    if (props.flipped) {
        return (
            <div className={spanishClassName}>
                <div className="termData">
                    <div className="answer">{props.answer}</div>
                    <div className="verticalRule"></div>
                    <div className="term" style={{ textAlign: "end" }}>
                        {term()}
                    </div>
                </div>
                <TermOptionsContainer
                    queryLoaded={
                        spanishLectureData === undefined ? false : true
                    }
                    termData={spanishLectureData?.[props.id]}
                    language={"spanish"}
                    onIconClick={props.onIconClick}
                    termId={props.id}
                />
            </div>
        );
    }

    return (
        <div className={japaneseClassName}>
            <div className="termData">
                <div className="term">{term()}</div>
                <div className="verticalRule"></div>
                <div className="answer" style={{ textAlign: "end" }}>
                    {props.answer}
                </div>
            </div>
            <TermOptionsContainer
                queryLoaded={japaneseLectureData === undefined ? false : true}
                termData={japaneseLectureData?.[props.id]}
                language={"japanese"}
                onIconClick={props.onIconClick}
                termId={props.id}
            />
        </div>
    );
};

export default TermItem;
