import React from "react";
import TermCard from "./TermCard";

const NormalTermCard = (props) => {
    const { termId, termsDict, flipped } = props;

    const term =
        termId !== undefined
            ? termsDict[termId].extra
                ? termsDict[termId].term + " - " + termsDict[termId].extra
                : termsDict[termId].term
            : "Cargando...";

    const answer =
        termId !== undefined ? termsDict[termId].answer : "Cargando...";

    const termContent = <span>{flipped ? answer : term}</span>;
    const answerContent = <span>{flipped ? term : answer}</span>;

    return <TermCard {...props} term={termContent} answer={answerContent} />;
};

export default NormalTermCard;
