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
            <p>
                {props.score} out of {props.maxScore} pts!
            </p>
            {props.newRecord ? <p>New Record!!</p> : ""}
            {props.previousRecord > 0 ? (
                <p>Your HighScore: {props.previousRecord} pts.</p>
            ) : (
                ""
            )}
            {congrats}
            <button className="resultBackButton" onClick={props.onClick}>
                Back to Lecture
            </button>
        </div>
    );
};

export default ResultStage;
