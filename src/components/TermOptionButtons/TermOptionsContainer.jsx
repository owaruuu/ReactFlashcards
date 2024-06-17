import React from "react";
import TermOptionButton from "./TermOptionButton";
import { Spinner } from "react-bootstrap";
import "./Styles/TermOptions.css";

const TermOptionsContainer = (props) => {
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
            />
            <TermOptionButton
                state={props.state}
                termId={props.termId}
                onIconClick={props.onIconClick}
                language={props.language}
            />
        </div>
    );
};

export default TermOptionsContainer;
