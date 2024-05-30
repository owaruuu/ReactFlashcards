import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Draggable(props) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: props.id });

    // const { attributes, listeners, setNodeRef, transform } = useDraggable({
    //     id: props.id,
    // });

    // const style = transform
    //     ? {
    //           transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    //       }
    //     : undefined;

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <button
            className="draggable"
            id={props.id}
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
        >
            {props.children}
        </button>
    );
}

export default Draggable;
