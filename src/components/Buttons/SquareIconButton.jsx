import React from "react";
import { Button } from "react-bootstrap";

const SquareIconButton = (props) => {
    const { icon, onClick } = props;
    return (
        <div className="squareIconButton">
            <button onClick={onClick}>{icon}</button>
        </div>
    );
};

export default SquareIconButton;
