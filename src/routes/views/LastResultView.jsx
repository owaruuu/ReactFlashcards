import React from "react";
import { useOutletContext } from "react-router-dom";
import BackButton from "../../components/BackButton";
import TestAnswersSummary from "../../components/TestScreen/TestAnswersSummary";
import { TiArrowBack } from "react-icons/ti";

const LastResultView = () => {
    const { test, lastTestResults, lectureId } = useOutletContext();
    const date = new Date(lastTestResults.date);

    return (
        <div className="lastTestResume">
            <div className="panel">
                <p>Fecha: {date.toLocaleDateString()}</p>
                <p>Puntaje: {lastTestResults.score[test.version]}</p>
                <BackButton
                    className="testBackButton"
                    dir={`/lectures/${lectureId}/test`}
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
