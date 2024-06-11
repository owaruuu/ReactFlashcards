import React from "react";
import OptionsButton from "../OptionsButton";
import BackButton from "../BackButton";
import { useParams } from "react-router-dom";

const ReviewPanel = (props) => {
    const { lectureId } = useParams();
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
                    dir={`/lectures/${lectureId}`}
                />
            </div>
        </div>
    );
};

export default ReviewPanel;
