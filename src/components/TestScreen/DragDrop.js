import { useEffect, useState } from "react";
import {
    DndContext,
    DragOverlay,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import AnswersBox from "./AnswersBox";
import Draggable from "./Draggable";
import TestDivider from "../Misc/TestDivider";
import { shuffleArray } from "../../utils/utils";
import { Item } from "./Item";
import { MultipleContainers } from "./DndTest";

const DragDrop = (props) => {
    const { test, problem, correct, incorrect, thinking, handleClick } = props;

    const currentPhrase = test.dragDrop[problem][0];
    const currentCorrectAnswer = test.dragDrop[problem][1];
    const currentOptions = [
        ...test.dragDrop[problem][2],
        ...test.dragDrop[problem][3],
    ];

    return (
        <div className="testContent">
            <div className="testPhrase">
                <p>"{currentPhrase}"</p>
            </div>
            {/* <TestDivider /> */}
            <MultipleContainers />
            <button onClick={handleClick}>Answer</button>
        </div>
    );
};

export default DragDrop;
