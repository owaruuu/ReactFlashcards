import { useEffect, useState } from "react";
import { DndContext } from "@dnd-kit/core";
import AnswersBox from "./AnswersBox";
import Draggable from "./Draggable";
import TestDivider from "../Misc/TestDivider";
import { shuffleArray } from "../../utils/utils";

const DragDrop = (props) => {
    const { test, problem, correct, incorrect, thinking, handleClick } = props;
    //el array de opciones revueltas
    const [currentOptionsElem, setCurrentOptionsElem] = useState([]);
    console.log(
        "🚀 ~ file: DragDrop.js:9 ~ DragDrop ~ currentOptionsElem:",
        currentOptionsElem
    );
    const currentPhrase = test.dragDrop[problem][0];

    useEffect(() => {
        setCurrentOptionsElem(shuffleArray(test.dragDrop[problem][2]));
        // setCurrentOptionsElem("shuffleArray(test.mondai[problem][0])");
    }, [problem]);
    //recorro el array revuelto de opciones para crear los botones
    const optionsElements = currentOptionsElem.map((option) => {
        let className = "dragOption";
        return (
            <Draggable className={className} key={option.id} id={option.id}>
                {option.drag}
            </Draggable>
        );
    });

    function handleDragEnd(event) {
        if (event.over && event.over.id === "answersBox") {
            setIsDropped(true);
        }
    }

    return (
        <div className="testContent">
            <div className="testPhrase">
                <p>{currentPhrase}</p>
            </div>
            <TestDivider />
            <DndContext onDragEnd={handleDragEnd}>
                <AnswersBox />
                <div>
                    caja opciones
                    {optionsElements}
                </div>
            </DndContext>
        </div>
    );
};

export default DragDrop;
