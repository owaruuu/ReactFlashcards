import TestAnswersSummary from "../TestAnswersSummary";
import BackButton from "../Util/BackButton";
import TestResultSticker from "../ResultStage/TestResultSticker";
import { useState } from "react";

const HighscoreStage = (props) => {
    console.log(props.progress);
    const results = props.progress[props.lectureId].highScore;
    const date = new Date(results.date);
    const score = results.score[props.version];
    const maxScore = results.drag.length + results.multiple.length;

    const [showWonMedal] = useState(() => {
        if (props.hasWonMedal) {
            console.log("mostrar medalla ganada");
            return 1;
        } else {
            console.log("no tengo medalla y no la gane ahora");
            return -1;
        }
    });

    return (
        <div className="highScoreResume">
            <div className="panel">
                <p>Fecha: {date.toLocaleDateString()}</p>
                <p></p>
                <BackButton
                    text={"volver"}
                    stage={"last"}
                    callback={props.back}
                ></BackButton>
            </div>
            <div className="scoreParent">
                <span className="score">{score}</span> out of{" "}
                <span className="maxScore">{maxScore}</span> pts
            </div>

            <TestResultSticker
                show={showWonMedal}
                lectureId={props.lectureId}
                lectureName={props.lectureName}
            />
            <hr></hr>
            <p>
                Tus respuestas<span className="goldAccent">:</span>
            </p>
            <TestAnswersSummary results={results}></TestAnswersSummary>
        </div>
    );
};

export default HighscoreStage;
