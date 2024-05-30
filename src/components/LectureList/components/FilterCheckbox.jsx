import React from "react";

const FilterCheckbox = (props) => {
    return (
        <div>
            <input
                type="checkbox"
                id={props.filter}
                name={props.filter}
                checked={props.state}
                onChange={() =>
                    props.onClick({ type: props.filter, value: !props.state })
                }
            />
            <label htmlFor={props.filter}>{props.label}</label>
        </div>
    );
};

export default FilterCheckbox;
