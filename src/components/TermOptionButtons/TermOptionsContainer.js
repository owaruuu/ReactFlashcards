import React from "react";
import TermOptionButton from "./TermOptionButton";
import { Spinner } from "react-bootstrap";
import "./Styles/TermOptions.css";

const TermOptionsContainer = (props) => {
    if (props.queryStatus === "error") {
        return "";
    }

    if (props.globalQuery === undefined) {
        if (props.queryStatus === "loading" || props.queryData === undefined) {
            return (
                <div className="termOptions">
                    <Spinner size="sm" />
                </div>
            );
        }
    } else {
        if (
            props.globalQuery.status !== "success" ||
            props.queryStatus === "loading" ||
            props.queryData === undefined
        ) {
            return (
                <div className="termOptions">
                    <Spinner size="sm" />
                </div>
            );
        }
    }

    let selected = props.termData;

    return (
        <div className="termOptions">
            <TermOptionButton
                state={selected}
                termId={props.termId}
                onIconClick={props.onIconClick}
                language={props.language}
                star
            />
            <TermOptionButton
                state={selected}
                termId={props.termId}
                onIconClick={props.onIconClick}
                language={props.language}
            />
        </div>
    );
};

export default TermOptionsContainer;
