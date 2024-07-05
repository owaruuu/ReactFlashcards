import React from "react";
import { MdArrowDropDown } from "react-icons/md";
import { MdArrowDropUp } from "react-icons/md";
import { TiArrowSortedUp } from "react-icons/ti";
import { TiArrowSortedDown } from "react-icons/ti";

const ReorderButton = ({ name, text, state, onClick, callback }) => {
    const arrow =
        state === null ? (
            <div className="emptyDiv"></div>
        ) : state === "ASC" ? (
            <TiArrowSortedUp />
        ) : (
            <TiArrowSortedDown />
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
