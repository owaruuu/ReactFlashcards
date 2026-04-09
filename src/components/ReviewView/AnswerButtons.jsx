import React from "react";
import { Spinner } from "react-bootstrap";
import LearnButtonContent from "./LearnButtonContent.jsx";
import AnswerButton from "./AnswerButton.jsx";

const AnswerButtons = (props) => {
    const MID_WAY_POINT = 6;
    const {
        termLevelsData,
        currentTermId,
        termsIds,
        onClick,
        fixSession,
        loading,
        validId,
    } = props;
    const currentTermData = termLevelsData?.[currentTermId]
        ? termLevelsData[currentTermId]
        : { level: 1 };

    const lowerButtons = (
        <>
            <AnswerButton
                loading={loading}
                onClick={onClick}
                content={"Aun no"}
                level={-1}
                type={"red"}
                helper="-1 nivel"
            />
            <AnswerButton
                loading={loading}
                onClick={onClick}
                content={"Ya casi"}
                level={0}
                type={"yellow"}
                helper="mantener nivel"
            />
            <AnswerButton
                loading={loading}
                onClick={onClick}
                content={"Lo se"}
                level={1}
                type={"green"}
                helper="+1 nivel"
            />
        </>
    );

    const higherButtons = (
        <>
            <AnswerButton
                loading={loading}
                onClick={onClick}
                content={"Lo olvide"}
                level={-2}
                type={"darkRed"}
                helper="-2 nivel"
            />
            <AnswerButton
                loading={loading}
                onClick={onClick}
                content={"Ya casi"}
                level={0}
                type={"yellow"}
                helper="mantener nivel"
            />
            <AnswerButton
                loading={loading}
                onClick={onClick}
                content={"Memorizado"}
                level={+1}
                type={"purple"}
                helper="+1 nivel"
            />
        </>
    );

    return validId ? (
        <div className="containerAnswerButtons">
            {currentTermData.level >= MID_WAY_POINT
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
