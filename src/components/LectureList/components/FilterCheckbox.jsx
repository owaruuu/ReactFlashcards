import React from "react";

const FilterCheckbox = ({
    filter,
    state,
    onClick,
    disabled = false,
    label,
}) => {
    return (
        <div>
            <input
                type="checkbox"
                id={filter}
                name={filter}
                checked={state}
                onChange={() => onClick({ type: filter, value: !state })}
                disabled={disabled}
            />
            <label htmlFor={filter}>{label}</label>
        </div>
    );
};

export default FilterCheckbox;
