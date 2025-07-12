import React from "react";
import TermCard from "./TermCard";

const NormalTermCard = (props) => {
    const { termId, termsDict, flipped, pointsInfo } = props;
    // console.log("🚀 ~ NormalTermCard ~ pointsInfo:", pointsInfo);
    // console.log("🚀 ~ NormalTermCard ~ termId:", termId);

    const term =
        termId !== undefined
            ? termsDict[termId].extra
                ? termsDict[termId].term + " - " + termsDict[termId].extra
                : termsDict[termId].term
            : "Cargando...";

    const answer =
        termId !== undefined ? termsDict[termId].answer : "Cargando...";

    const espSentence =
        termId !== undefined ? termsDict[termId].espSentence : "";
    const japSentence =
        termId !== undefined ? termsDict[termId].japSentence : "";

    const termContent = <span>{flipped ? answer : term}</span>;
    const answerContent = <span>{flipped ? term : answer}</span>;

    return (
        <TermCard
            {...props}
            term={termContent}
            answer={answerContent}
            espSentence={espSentence}
            japSentence={japSentence}
            points={pointsInfo?.[termId]}
        />
    );
};

export default NormalTermCard;
