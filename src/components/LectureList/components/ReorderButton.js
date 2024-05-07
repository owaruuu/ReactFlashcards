import React from "react";
import { MdArrowDropDown } from "react-icons/md";
import { MdArrowDropUp } from "react-icons/md";

const ReorderButton = ({ name, text, state, onClick, callback }) => {
    const arrow =
        state === null ? (
            <div className="emptyDiv"></div>
        ) : state === "ASC" ? (
            <MdArrowDropUp />
        ) : (
            <MdArrowDropDown />
        );

    return (
        <button
            className={state !== null ? "active" : ""}
            onClick={() => onClick(name, state, callback)}
        >
            {arrow}
            {text}
        </button>
    );
};

export default ReorderButton;
