import React from "react";
import LearnButtonContent from "./LearnButtonContent.jsx";
import { Spinner } from "react-bootstrap";

const AnswerButton = (props) => {
    const { loading, onClick, content, points } = props;
    return (
        <button className="answerButton" disabled={loading} onClick={onClick}>
            {loading ? (
                <Spinner />
            ) : (
                <LearnButtonContent content={content} points={points} />
            )}
        </button>
    );
};

export default AnswerButton;
