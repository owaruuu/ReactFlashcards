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
                <p>{props.loadingMsg}</p>
                <Spinner />
            </div>
        );
    }
    return <></>;
};

export default InteractionBlocker;
