import React from "react";
import LearnButtonContent from "./LearnButtonContent.jsx";
import { Spinner } from "react-bootstrap";

const AnswerButton = (props) => {
    const { loading, onClick, content, points, type } = props;
    return (
        <button
            className={`answerButton ${type}`}
            disabled={loading}
            onClick={() => onClick(points)}
        >
            {loading ? (
                <Spinner size="sm" />
            ) : (
                <LearnButtonContent content={content} points={points} />
            )}
        </button>
    );
};

export default AnswerButton;
