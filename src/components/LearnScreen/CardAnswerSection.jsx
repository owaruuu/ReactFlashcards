import React from "react";
import ExampleSentenceSpan from "./ExampleSentenceSpan.jsx";

const CardAnswerSection = ({
    answerText,
    japExampleSentence,
    espExampleSentence,
}) => {
    return (
        <>
            <span>{answerText}</span>
            {japExampleSentence && (
                <ExampleSentenceSpan string={japExampleSentence} />
            )}
            {espExampleSentence && (
                <ExampleSentenceSpan string={espExampleSentence} />
            )}
        </>
    );
};

export default CardAnswerSection;
