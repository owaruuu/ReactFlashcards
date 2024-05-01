import React from "react";
import { BiSolidRightArrow } from "react-icons/bi";
import { PiArrowBendUpLeftFill } from "react-icons/pi";
import { Spinner } from "react-bootstrap";

const NextButton = (props) => {
    // console.log("🚀 ~ NextButton ~ props:", props);
    if (props.loading) {
        return (
            <button disabled>
                <Spinner />
            </button>
        );
    }
    if (props.next) {
        return (
            <button className="continue" onClick={props.onClick}>
                Siguiente<BiSolidRightArrow></BiSolidRightArrow>
            </button>
        );
    }

    return (
        <button className="close" onClick={props.onClick}>
            Terminar sesión <PiArrowBendUpLeftFill />
        </button>
    );
};

export default NextButton;
