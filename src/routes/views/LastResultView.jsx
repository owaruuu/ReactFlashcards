import React from "react";
import { useOutletContext } from "react-router-dom";
import BackButton from "../../components/TestScreen/Util/BackButton";
import TestAnswersSummary from "../../components/TestScreen/TestAnswersSummary";

const LastResultView = () => {
    const { test, lastTestResults, lectureId } = useOutletContext();
    const date = new Date(lastTestResults.date);

    return (
        <div className="lastTestResume">
            <div className="panel">
                <p>Fecha: {date.toLocaleDateString()}</p>
                <p>Puntaje: {lastTestResults.score[test.version]}</p>
                <BackButton
                    dir={`/lectures/${lectureId}/test`}
                    text={"volver"}
                ></BackButton>
            </div>
            <TestAnswersSummary results={lastTestResults}></TestAnswersSummary>
        </div>
    );
};

export default LastResultView;
