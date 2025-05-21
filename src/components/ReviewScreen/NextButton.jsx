import React from "react";
import { BiSolidRightArrow } from "react-icons/bi";
import { PiArrowBendUpLeftFill } from "react-icons/pi";
import { Spinner } from "react-bootstrap";

const NextButton = (props) => {
    // console.log("🚀 ~ NextButton ~ props:", props);
    if (props.loading) {
        return (
            <button className="next thinking" disabled>
                <Spinner />
            </button>
        );
    }
    if (props.next) {
        return (
            <button
                className="next continue"
                onClick={() => props.onClick(null)}
            >
                Siguiente<BiSolidRightArrow></BiSolidRightArrow>
            </button>
        );
    }

    return (
        <button className="next close" onClick={() => props.onClick(null)}>
            Terminar sesión <PiArrowBendUpLeftFill />
        </button>
    );
};

export default NextButton;
