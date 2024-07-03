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

const DragDrop2 = (props) => {
    const { test, problem, correct, incorrect, thinking, handleClick } = props;
    //el array de opciones revueltas
    const [currentOptionsElem, setCurrentOptionsElem] = useState([]);
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

    // function handleDragEnd(event) {
    //     if (event.over && event.over.id === "answersBox") {
    //         setIsDropped(true);
    //     }
    // }

    const [items, setItems] = useState(["1", "2", "3"]);
    const [items2] = useState(["a", "b", "c"]);
    const [activeId, setActiveId] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragStart(event) {
        const { active } = event;

        setActiveId(active.id);
    }

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    return (
        <div className="testContent">
            <div className="testPhrase">
                <p>{currentPhrase}</p>
            </div>
            <TestDivider />
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={items}
                    strategy={verticalListSortingStrategy}
                >
                    {items.map((id) => (
                        <Draggable key={id} id={id}>
                            <p>{id}</p>
                        </Draggable>
                    ))}
                </SortableContext>
                <DragOverlay>
                    {activeId ? <Item id={activeId} /> : null}
                </DragOverlay>

                <div>
                    caja opciones
                    {/* {optionsElements} */}
                </div>
            </DndContext>
        </div>
    );
};

export default DragDrop2;
