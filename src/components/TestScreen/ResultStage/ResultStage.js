import BackButton from "../Util/BackButton";
import TestAnswersSummary from "../TestAnswersSummary";
import TestResultSticker from "./TestResultSticker";
import { useState } from "react";

const ResultStage = (props) => {
    const percent = (props.score * 100) / props.maxScore;
    const perfectScore = props.score === props.maxScore;
    // const perfectScore = true;

    const [showWonMedal] = useState(() => {
        if (props.hasWonMedal) {
            //"mostrar medalla ganada");
            return 1;
        }

        if (perfectScore) {
            //"mostrar medalla por primera vez");
            return 0;
        } else {
            //"no tengo medalla y no la gane ahora");
            return -1;
        }
    });

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
                <span className="score">{props.score}</span> de{" "}
                <span className="maxScore">{props.maxScore}</span> pts{" "}
                {props.newRecord ? (
                    <span className="newRecord">New Record!</span>
                ) : (
                    ""
                )}
            </div>
            <div></div>

            {props.previousRecord > 0 ? (
                <p>
                    Tu mayor puntaje anterior
                    <span className="goldAccent">:</span> {props.previousRecord}{" "}
                    pts.
                </p>
            ) : (
                ""
            )}

            {/* {congrats} */}
            <TestResultSticker
                show={showWonMedal}
                lectureId={props.lectureId}
                lectureName={props.lectureName}
            />
            <BackButton
                text={"Volver a Leccion"}
                stage={"results"}
            ></BackButton>
            <hr></hr>
            <p>
                Tus respuestas<span className="goldAccent">:</span>
            </p>
            <TestAnswersSummary results={props.results}></TestAnswersSummary>
        </div>
    );
};

export default ResultStage;
