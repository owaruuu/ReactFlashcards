import React from "react";
import TermOptionButton from "./TermOptionButton";
import { Spinner } from "react-bootstrap";

const TermOptionsContainer = (props) => {
    if (props.query.status === "error") {
        return "";
    }

    if (
        props.query.status === "loading" ||
        props.query.data.data === undefined
    ) {
        return (
            <div className="termOptions">
                <Spinner size="sm" />
            </div>
        );
    }

    let selected = props.termData;

    return (
        <div className="termOptions">
            <TermOptionButton
                selected={selected}
                termId={props.termId}
                onIconClick={props.onIconClick}
                language={props.language}
                star
            />
            <TermOptionButton
                selected={selected}
                termId={props.termId}
                onIconClick={props.onIconClick}
                language={props.language}
            />
        </div>
    );
};

export default TermOptionsContainer;
