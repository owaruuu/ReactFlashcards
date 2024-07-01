import React from "react";
import { useOutletContext } from "react-router-dom";
import TestAnswersSummary from "../../components/TestScreen/TestAnswersSummary";
import BackButton from "../../components/BackButton";
import { TiArrowBack } from "react-icons/ti";

const LastResultView = () => {
    const { test, lastTestResults, lecture } = useOutletContext();
    const date = new Date(lastTestResults.date);

    return (
        <div className="lastTestResume">
            <div className="panel">
                <p>Fecha: {date.toLocaleDateString()}</p>
                <p>Puntaje: {lastTestResults.score[test.version]}</p>
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
            <TestAnswersSummary results={lastTestResults}></TestAnswersSummary>
        </div>
    );
};

export default LastResultView;
