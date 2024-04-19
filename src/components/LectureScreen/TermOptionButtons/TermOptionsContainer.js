import React from "react";
import TermOptionButton from "./TermOptionButton";

const TermOptionsContainer = (props) => {
    // console.log("🚀 ~ TermOptionsContainer ~ props:", props);
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
