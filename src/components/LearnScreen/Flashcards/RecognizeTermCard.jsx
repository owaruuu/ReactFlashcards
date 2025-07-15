import React, { useEffect, useRef, useState } from "react";
import TermCard from "../TermCard";
import { max, min } from "lodash";

const RecognizeTermCard = (props) => {
    const ref = useRef(null);
    const { termId, termsDict, flipped, pointsInfo } = props;

    const [width, setWidth] = useState(0);

    useEffect(() => {
        setWidth(ref.current.offsetWidth);
        const getwidth = () => {
            setWidth(ref.current.offsetWidth);
        };
        window.addEventListener("resize", getwidth);
        return () => window.removeEventListener("resize", getwidth);
    }, []);

    const term = termId !== undefined ? termsDict[termId].extra : "Cargando...";

    const answer =
        termId !== undefined
            ? termsDict[termId].term + " - " + termsDict[termId].answer
            : "Cargando...";

    const fontSize = ref.current
        ? `${min([width / term.length, 140])}px`
        : `${8 / term.length}rem`;

    const style = {
        fontSize: fontSize,
    };

    const termContent = (
        <span style={style} ref={ref}>
            {term}
        </span>
    );
    const answerContent = <span>{answer}</span>;

    const espSentence =
        termId !== undefined ? termsDict[termId].espSentence : "";
    const japSentence =
        termId !== undefined ? termsDict[termId].japSentence : "";

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

export default RecognizeTermCard;
