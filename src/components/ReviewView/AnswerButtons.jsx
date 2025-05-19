import React from "react";
import("react").CSSProperties;
import { Spinner } from "react-bootstrap";

const AnswerButtons = (props) => {
    const { termPointsData, termsIds, onClick, fixSession, loading, validId } =
        props;
    // console.log("🚀 ~ AnswerButtons ~ termPointsData:", termPointsData);
    return validId ? (
        <div className="containerAnswerButtons">
            <button disabled={loading} onClick={() => onClick(-1)}>
                {loading ? <Spinner /> : "Aun no"}
            </button>
            <button disabled={loading} onClick={() => onClick(1)}>
                {loading ? <Spinner /> : "Ya casi"}
            </button>
            <button disabled={loading} onClick={() => onClick(2)}>
                {loading ? <Spinner /> : "Lo se"}
            </button>
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
