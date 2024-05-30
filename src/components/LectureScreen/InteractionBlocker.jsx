import React from "react";
import { Spinner } from "react-bootstrap";

const InteractionBlocker = (props) => {
    if (props.error) {
        return (
            <div className="blockScreen error">
                <p>Hubo un error, lo sentimos, intenta refrescar la pagina.</p>
            </div>
        );
    }

    if (props.loading) {
        return (
            <div className="blockScreen loading">
                <Spinner />
            </div>
        );
    }
    return <></>;
};

export default InteractionBlocker;
