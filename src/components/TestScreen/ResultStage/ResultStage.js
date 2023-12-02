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
            <p>
                <span className="score">{props.score}</span> out of{" "}
                <span className="maxScore">{props.maxScore}</span> pts!
            </p>
            {props.newRecord ? (
                <div className="waviy">
                    <span style={{ "--i": 1 }}>N</span>
                    <span style={{ "--i": 2 }}>e</span>
                    <span style={{ "--i": 3 }}>w</span>
                    <span style={{ "--i": 4 }}> </span>
                    <span style={{ "--i": 5 }}>R</span>
                    <span style={{ "--i": 6 }}>e</span>
                    <span style={{ "--i": 7 }}>c</span>
                    <span style={{ "--i": 8 }}>o</span>
                    <span style={{ "--i": 9 }}>r</span>
                    <span style={{ "--i": 10 }}>d</span>
                    <span style={{ "--i": 11 }}>!</span>
                    <span style={{ "--i": 12 }}>!</span>
                    {/* <span style="--i:2">e</span>
                    <span style="--i:3">w</span>
                    <span> </span>
                    <span style="--i:5">R</span>
                    <span style="--i:6">e</span>
                    <span style="--i:7">c</span>
                    <span style="--i:8">o</span>
                    <span style="--i:9">r</span>
                    <span style="--i:10">d</span> */}
                </div>
            ) : (
                ""
            )}
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
