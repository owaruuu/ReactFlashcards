import React from "react";
import { useDroppable } from "@dnd-kit/core";

function AnswersBox(props) {
    const { isOver, setNodeRef } = useDroppable({
        id: "answersBox",
    });
    const style = {
        backgroundColor: isOver ? "green" : undefined,
    };

    return (
        <div className="answersBox" ref={setNodeRef} style={style}>
            {props.children}
        </div>
    );
}

export default AnswersBox;
