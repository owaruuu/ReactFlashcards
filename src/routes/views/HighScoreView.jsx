import React from "react";
import { useOutletContext, Link } from "react-router-dom";
import BackButton from "../../components/BackButton";
import { TiArrowBack } from "react-icons/ti";
import TestResultSticker from "../../components/TestScreen/ResultStage/TestResultSticker";
import TestAnswersSummary from "../../components/TestScreen/TestAnswersSummary";

const HighScoreView = () => {
    const { highScore, test, hasWonMedal, lecture } = useOutletContext();

    if (!highScore) {
        return (
            <div className="highScoreResume">
                <p>Nunca has dado esta prueba.</p>
                <Link to={`/lectures/${lecture.lectureId}/test`}>Volver.</Link>
            </div>
        );
    }

    const date = new Date(highScore.date);
    const score = highScore.score[test.version];
    const maxScore = highScore.drag.length + highScore.multiple.length;

    const showWonMedal = () => {
        if (hasWonMedal) {
            //mostrar medalla ganada
            return 1;
        } else {
            //no tengo medalla y no la gane ahora
            return -1;
        }
    };

    return (
        <div className="highScoreResume">
            <div className="panel">
                <p>Fecha: {date.toLocaleDateString()}</p>
                <p></p>
                <BackButton
                    className="testBackButton"
                    dir={`/lectures/${lecture.lectureId}/test`}
                    content={
                        <>
                            <TiArrowBack /> Volver
                        </>
                    }
                ></BackButton>
            </div>
            <div className="scoreParent">
                <span className="score">{score}</span> de{" "}
                <span className="maxScore">{maxScore}</span> pts
            </div>

            <TestResultSticker
                show={showWonMedal()}
                lectureId={lecture.lectureId}
                lectureName={lecture.name}
            />
            <hr></hr>
            <p>
                Tus respuestas<span className="goldAccent">:</span>
            </p>
            <TestAnswersSummary results={highScore}></TestAnswersSummary>
        </div>
    );
};

export default HighScoreView;
