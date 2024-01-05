import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";

const TermCard = (props) => {
    const termComp = (
        <span>
            {props.terms[props.index].term}
            {props.terms[props.index].extra && " - "}
            {props.terms[props.index].extra}
        </span>
    );
    const answerComp = (
        <div>
            <span>{props.terms[props.index].answer}</span>
        </div>
    );

    let termContent, answerContent;

    const fillContent = () => {
        if (props.flipped) {
            termContent = answerComp;
            answerContent = termComp;
        } else {
            termContent = termComp;
            answerContent = answerComp;
        }
    };

    fillContent();

    return (
        <div className="termCard">
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
