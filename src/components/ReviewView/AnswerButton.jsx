import React from "react";
import LearnButtonContent from "./LearnButtonContent.jsx";
import { Spinner } from "react-bootstrap";

const AnswerButton = (props) => {
    const { loading, onClick, content, type, level, helper } = props;
    return (
        <button
            className={`answerButton ${type}`}
            disabled={loading}
            onClick={() => onClick(level)}
        >
            {loading ? (
                <Spinner size="sm" />
            ) : (
                <LearnButtonContent content={content} helper={helper} />
            )}
        </button>
    );
};

export default AnswerButton;
