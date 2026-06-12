import React from "react";
import FilterCheckbox from "./FilterCheckbox";

const FilterContainer = (props) => {
    // console.log("🚀 ~ FilterContainer ~ props:", props);
    // console.log("🚀 ~ checkBoxes ~ props.filters:", props.filters);

    const filters = [...props.filters];
    // const filters = [
    //     "basico1",
    //     "basico2",
    //     "basico3",
    //     "basico4",
    //     "basico5",
    //     "basico6",
    //     "basico7",
    //     "basico8",
    //     "basico9",
    //     "basico10",
    // ];

    const checkBoxes = filters.map((filter) => {
        return (
            <FilterCheckbox
                key={filter}
                label={idToLabel(filter)}
                onClick={props.onClick}
                filter={filter}
                state={props.state[filter]}
                disabled={props.state["favoritos"]}
            />
        );
    });

    const favoritosCheckBox = (
        <FilterCheckbox
            key={"favoritos"}
            label={"Favoritos"}
            onClick={props.onClick}
            filter={"favoritos"}
            state={props.state["favoritos"]}
        />
    );

    // checkBoxes = [...checkBoxes, favoritosCheckBox];

    return (
        <div className="filtering">
            <span>filtrar por: </span>
            <div className="checkboxes">
                {checkBoxes}
                {favoritosCheckBox}
            </div>
        </div>
    );
};

function idToLabel(id) {
    switch (id) {
        case "basico1":
            return "Básico 1";
        case "basico2":
            return "Básico 2";
        case "basico3":
            return "Básico 3";
        case "basico4":
            return "Básico 4";
        case "basico5":
            return "Básico 5";
        case "basico6":
            return "Básico 6";
        case "basico7":
            return "Básico 7";
        case "basico8":
            return "Básico 8";
        case "basico9":
            return "Básico 9";
        case "basico10":
            return "Básico 10";
        case "jlptn5":
            return "JLPT N5";
        case "jlptn4":
            return "JLPT N4";
        case "jlptn3":
            return "JLPT N3";
        case "jlptn2":
            return "JLPT N2";
        case "jlptn1":
            return "JLPT N1";
        case "extra1":
            return "Extra";
        default:
            throw new Error("invalid id");
    }
}

export default FilterContainer;
