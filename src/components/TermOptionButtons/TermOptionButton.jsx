import React from "react";
import TermOptionButtonIcon from "./TermOptionButtonIcon";

const TermOptionButton = (props) => {
    function onClick(option) {
        let newValue = option;

        if (newValue === props.state) {
            newValue = "";
        }

        props.onIconClick(props.language, props.termId, newValue);
        //TODO use debounce para actualizar db
    }

    if (props.star) {
        return (
            <button
                disabled={props.disabled}
                onClick={() => onClick("highlighted")}
            >
                <TermOptionButtonIcon star id={props.id} state={props.state} />
            </button>
        );
    }
    return (
        <button disabled={props.disabled} onClick={() => onClick("muted")}>
            <TermOptionButtonIcon id={props.id} state={props.state} />
        </button>
    );
};

export default TermOptionButton;
