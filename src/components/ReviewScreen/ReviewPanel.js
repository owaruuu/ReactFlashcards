import React from "react";
import OptionsButton from "../OptionsButton";
import BackButton from "../BackButton";

const ReviewPanel = (props) => {
    const left = props.terms.length - 1;
    const info =
        props.terms.length === 0
            ? `quedan 0 terminos.`
            : props.terms.length === 2
            ? `queda ${left} termino.`
            : `quedan ${left} terminos.`;
    return (
        <div className="reviewScreenPanel">
            <div className="panel">
                <OptionsButton showFunc={props.showFunc} disabled={true} />
                <p>{info}</p>
                <BackButton
                    options={{ currentScreen: `lecture-${props.language}` }}
                />
            </div>
        </div>
    );
};

export default ReviewPanel;
