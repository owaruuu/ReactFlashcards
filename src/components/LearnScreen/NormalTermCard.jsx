import React from "react";
import TermCard from "./TermCard";

const NormalTermCard = (props) => {
    let term = <span>{props.term}</span>;
    let answer = (
        <div>
            <span>{props.answer}</span>
        </div>
    );

    const termContent = props.flipped ? answer : term;
    const answerContent = props.flipped ? term : answer;

    return <TermCard {...props} term={termContent} answer={answerContent} />;
};

export default NormalTermCard;
