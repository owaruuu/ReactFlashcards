import React from "react";
import { Spinner } from "react-bootstrap";

const InteractionBlocker = (props) => {
    if (props.error) {
        return (
            <div className="interactionBlocker error">
                <p>{props.errorMsg}</p>
            </div>
        );
    }

    if (props.loading) {
        return (
            <div className="interactionBlocker loading">
                <div className="interactionBlockerBackground"></div>
                <span className="interactionBlockerContent">
                    <p>{props.loadingMsg}</p>
                    <Spinner />
                </span>
            </div>
        );
    }
    return <></>;
};

export default InteractionBlocker;
