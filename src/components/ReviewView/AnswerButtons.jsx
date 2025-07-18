import React from "react";
import { Spinner } from "react-bootstrap";
import LearnButtonContent from "./LearnButtonContent.jsx";
import AnswerButton from "./AnswerButton.jsx";

const AnswerButtons = (props) => {
    const MIN_POINTS = 5;
    const MID_WAY_POINTS = 50;
    const {
        termPointsData,
        currentTermId,
        termsIds,
        onClick,
        fixSession,
        loading,
        validId,
    } = props;
    const currentTermData = termPointsData?.[currentTermId]
        ? termPointsData[currentTermId]
        : { points: MIN_POINTS };

    const lowerButtons = (
        <>
            <AnswerButton
                loading={loading}
                onClick={onClick}
                content={"Aun no"}
                points={-2}
                type={"red"}
            />
            <AnswerButton
                loading={loading}
                onClick={onClick}
                content={"Ya casi"}
                points={3}
                type={"yellow"}
            />
            <AnswerButton
                loading={loading}
                onClick={onClick}
                content={"Lo se"}
                points={7}
                type={"green"}
            />
        </>
    );

    const higherButtons = (
        <>
            <AnswerButton
                loading={loading}
                onClick={onClick}
                content={"Lo olvide"}
                points={-7}
                type={"darkRed"}
            />
            <AnswerButton
                loading={loading}
                onClick={onClick}
                content={"Lo se"}
                points={7}
                type={"green"}
            />
            <AnswerButton
                loading={loading}
                onClick={onClick}
                content={"Memorizado"}
                points={10}
                type={"purple"}
            />
        </>
    );

    return validId ? (
        <div className="containerAnswerButtons">
            {currentTermData.points >= MID_WAY_POINTS
                ? higherButtons
                : lowerButtons}
        </div>
    ) : (
        <div className="containerFixButton">
            <button
                className="fixButton"
                disabled={loading}
                onClick={fixSession}
            >
                {loading ? <Spinner /> : "Arreglar sesion"}
            </button>
        </div>
    );
};

export default AnswerButtons;
