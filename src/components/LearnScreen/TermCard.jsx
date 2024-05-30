import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";

const TermCard = (props) => {
    // const termId = props.termsIds[props.index];
    // const termComp = props.termsDict[termId] ? (
    //     <span>
    //         {props.termsDict[termId]?.term}
    //         {props.termsDict[termId]?.extra}
    //         {" - "}
    //         {props.termsDict[termId]?.extra}
    //     </span>
    // ) : (
    //     <span>Guardando...</span>
    // );

    // const answerComp = props.termsDict[termId] ? (
    //     <div>
    //         <span>{props.termsDict[termId]?.answer}</span>
    //     </div>
    // ) : (
    //     <span>Guardando...</span>
    // );

    let classNames =
        props.state === "highlighted"
            ? "termCard gold"
            : props.state === "muted"
            ? "termCard muted"
            : "termCard";
    // console.log("🚀 ~ TermCard ~ classNames:", classNames);
    let termContent, answerContent;
    let term = <span>{props.term}</span>;
    let answer = (
        <div>
            <span>{props.answer}</span>
        </div>
    );

    const fillContent = () => {
        if (props.flipped) {
            termContent = answer;
            answerContent = term;
        } else {
            termContent = term;
            answerContent = answer;
        }
    };

    fillContent();

    return (
        <div className={classNames}>
            <div className="term">{termContent}</div>
            <div className="divider"></div>
            <div className="answerSection">
                {props.showAnswer && answerContent}

                {!props.showAnswer && (
                    <div className="clickReveal" onClick={props.answerFunction}>
                        <span>Haz click para ver la respuesta</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TermCard;
