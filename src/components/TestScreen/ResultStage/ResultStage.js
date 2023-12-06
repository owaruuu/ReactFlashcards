import { TiArrowBack } from "react-icons/ti";

const ResultStage = (props) => {
    const percent = (props.score * 100) / props.maxScore;

    const getMessage = () => {
        if (percent === 100) return "Perfect !!";
        if (percent >= 90) return "Amazing !!";
        if (percent >= 80) return "Great !";

        return "";
    };
    const congrats = getMessage();

    return (
        <div className="resultContent">
            <div className="scoreParent">
                <span className="score">{props.score}</span> out of{" "}
                <span className="maxScore">{props.maxScore}</span> pts{" "}
                {props.newRecord ? (
                    <span className="newRecord">New Record!</span>
                ) : (
                    ""
                )}
            </div>
            <div></div>

            {props.previousRecord > 0 ? (
                <p>Your HighScore: {props.previousRecord} pts.</p>
            ) : (
                ""
            )}

            {congrats}
            <button className="resultBackButton" onClick={props.onClick}>
                <TiArrowBack /> Back to Lecture
            </button>
        </div>
    );
};

export default ResultStage;
