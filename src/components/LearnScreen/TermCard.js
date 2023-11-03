import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";

const TermCard = (props) => {
    return (
        <div className="termCard">
            <div className="term">
                <span>
                    {props.terms[props.index].term}
                    {props.terms[props.index].extra && " - "}
                    {props.terms[props.index].extra}
                </span>
            </div>
            <hr></hr>
            <div className="answerSection" onClick={props.answerFunction}>
                {props.showAnswer && (
                    <div>
                        <span>{props.terms[props.index].answer}</span>
                    </div>
                )}

                {!props.showAnswer && (
                    <div>
                        <span>Click to reveal answer</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TermCard;
