import React from "react";
import TermOptionButton from "./TermOptionButton";
import { Spinner } from "react-bootstrap";

const TermOptionsContainer = (props) => {
    // console.log("🚀 ~ TermOptionsContainer ~ props:", props.queryLoaded);
    // console.log("🚀 ~ TermOptionsContainer ~ props:", props);
    let selected = props.termData;

    if (!props.queryLoaded) {
        return (
            <div className="termOptions">
                <Spinner size="sm" />
            </div>
        );
    }

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
