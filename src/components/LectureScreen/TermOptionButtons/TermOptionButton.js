import React from "react";
import TermOptionButtonIcon from "./TermOptionButtonIcon";

const TermOptionButton = (props) => {
    // console.log("🚀 ~ TermOptionButton ~ props:", props);

    function onClick(option) {
        let newValue = option;

        if (newValue === props.selected) {
            newValue = "";
        }

        props.onIconClick(props.language, props.termId, newValue);
        //TODO use debounce para actualizar db
    }

    if (props.star) {
        return (
            <button onClick={() => onClick("highlighted")}>
                <TermOptionButtonIcon
                    star
                    id={props.id}
                    selected={props.selected}
                />
            </button>
        );
    }
    return (
        <button onClick={() => onClick("muted")}>
            <TermOptionButtonIcon id={props.id} selected={props.selected} />
        </button>
    );
};

export default TermOptionButton;
