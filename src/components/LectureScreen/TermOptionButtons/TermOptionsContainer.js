import React from "react";
import TermOptionButton from "./TermOptionButton";
import { Spinner } from "react-bootstrap";

const TermOptionsContainer = (props) => {
    if (props.queryLoaded.status === "error") {
        return "";
    }
    if (
        props.queryLoaded.status === "loading" ||
        props.queryLoaded.data.data === undefined
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
                star
                lectureId={props.lectureId}
                termId={props.termId}
                onIconClick={props.onIconClick}
                language={props.language}
            />
            <TermOptionButton
                selected={selected}
                lectureId={props.lectureId}
                termId={props.termId}
                onIconClick={props.onIconClick}
                language={props.language}
            />
        </div>
    );
};

export default TermOptionsContainer;
