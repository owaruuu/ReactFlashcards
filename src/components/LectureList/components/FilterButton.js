import React from "react";
import { MdArrowDropDown } from "react-icons/md";
import { MdArrowDropUp } from "react-icons/md";

const FilterButton = ({ name, text, state, onClick, callback }) => {
    const arrow =
        state === null ? (
            <div className="emptyDiv"></div>
        ) : state === "ASC" ? (
            <MdArrowDropUp />
        ) : (
            <MdArrowDropDown />
        );

    return (
        <button onClick={() => onClick(name, state, callback)}>
            {arrow}
            {text}
        </button>
    );
};

export default FilterButton;
