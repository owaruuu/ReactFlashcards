import React from "react";
import TermOptionButton from "./TermOptionButton";
import { Spinner } from "react-bootstrap";
import "./Styles/TermOptions.css";

const TermOptionsContainer = (props) => {
    //reviso si viene un validId para evitar bloquear los botones del termList
    const disabled = props.validId !== undefined ? !props.validId : false;

    if (props.queryStatus === "error") {
        return "";
    }

    if (
        (props.globalQuery.status !== "success" &&
            props.queryIsRefetching === true) ||
        props.hasQueryData === false
    ) {
        return (
            <div className="termOptions">
                <Spinner size="sm" />
            </div>
        );
    }

    return (
        <div className="termOptions">
            <TermOptionButton
                state={props.state}
                termId={props.termId}
                onIconClick={props.onIconClick}
                language={props.language}
                star
                disabled={disabled}
            />
            <TermOptionButton
                state={props.state}
                termId={props.termId}
                onIconClick={props.onIconClick}
                language={props.language}
                disabled={disabled}
            />
        </div>
    );
};

export default TermOptionsContainer;
