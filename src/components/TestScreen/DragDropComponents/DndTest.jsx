import React, { useCallback, useEffect, useRef, useState } from "react";
import _ from "lodash";
import { LuArrowDownUp } from "react-icons/lu";
import { createPortal } from "react-dom";
import {
    closestCenter,
    closestCorners,
    pointerWithin,
    rectIntersection,
    // CollisionDetection,
    DndContext,
    DragOverlay,
    // DropAnimation,
    getFirstCollision,
    MouseSensor,
    TouchSensor,
    // Modifiers,
    useDroppable,
    useSensors,
    useSensor,
    MeasuringStrategy,
    defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import {
    SortableContext,
    useSortable,
    arrayMove,
    defaultAnimateLayoutChanges,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Container } from "../Container";
import { Item } from "../Item";

const animateLayoutChanges = (args) =>
    defaultAnimateLayoutChanges({ ...args, wasDragging: true });

function DroppableContainer({
    children,
    columns = 1,
    disabled,
    id,
    items,
    style,
    ...props
}) {
    const {
        active,
        attributes,
        isDragging,
        listeners,
        over,
        setNodeRef,
        transition,
        transform,
    } = useSortable({
        id,
        data: {
            type: "container",
            children: items,
        },
        animateLayoutChanges,
    });

    const isOverContainer = over
        ? (id === over.id && active?.data.current?.type !== "container") ||
          items.includes(over.id)
        : false;

    return (
        <Container
            ref={disabled ? undefined : setNodeRef}
            style={{
                ...style,
                transition,
                transform: CSS.Translate.toString(transform),
                opacity: isDragging ? 0.1 : undefined,
            }}
            hover={isOverContainer}
            handleProps={{
                ...attributes,
                ...listeners,
            }}
            columns={columns}
            {...props}
        >
            {children}
            {/* {props.isFirst} */}
        </Container>
    );
}

const dropAnimationConfig = {
    sideEffects: defaultDropAnimationSideEffects({
        styles: {
            active: {
                opacity: "0.3",
            },
        },
    }),
};

export function MultipleContainers(
    props,
    {
        adjustScale = true,
        itemCount = 3,
        cancelDrop,
        columns,
        handle = false,
        items: initialItems,
        containerStyle,
        dropAnimation = dropAnimationConfig,
        getItemStyles = () => ({}),
        wrapperStyle = () => ({}),
        minimal = false,
        modifiers,
        renderItem,
        strategy = () => ({}),
        scrollable,
    }
) {
    const populateItems = (options) => {
        let items = {
            FirstRowAnswer: [],
            SecondRowAnswer: [],
            FirstOptions: [],
            SecondOptions: [],
        };
        const half = options.length / 2;
        let firstHalf = options.slice(0, half);
        let secondHalf = options.slice(half);
        items["FirstOptions"] = firstHalf.map((word) => {
            return { id: word.id + 1, drag: word.drag };
            //si no le sumo +1, el item con id 0 no se mueve.
        });
        items["SecondOptions"] = secondHalf.map((word) => {
            return { id: word.id + 1, drag: word.drag };
        });

        return items;
    };

    const [items, setItems] = useState(() => populateItems(props.options));
    useEffect(() => {
        setItems(populateItems(props.options));
    }, [props.options]);

    const [answersContainers, setAnswersContainers] = useState([
        "FirstRowAnswer",
        "SecondRowAnswer",
    ]);
    const [optionsContainers, setOptionsContainers] = useState([
        "FirstOptions",
        "SecondOptions",
    ]);
    const [activeId, setActiveId] = useState(null);
    const [activeValue, setActiveValue] = useState(null);
    const lastOverId = useRef(null);
    const recentlyMovedToNewContainer = useRef(false);
    const containerWidth = useRef(null);
    const [width, setWidth] = useState(0);
    const paddingSize = 20;
    const letterSize = width === 769 ? 15 : 12;
    const minWidthOption = 55;

    /**
     * Custom collision detection strategy optimized for multiple containers
     *
     * - First, find any droppable containers intersecting with the pointer.
     * - If there are none, find intersecting containers with the active draggable.
     * - If there are no intersecting containers, return the last matched intersection
     *
     */
    const collisionDetectionStrategy = useCallback(
        (args) => {
            // Start by finding any intersecting droppable
            const pointerIntersections = pointerWithin(args);
            const intersections =
                pointerIntersections.length > 0
                    ? // If there are droppables intersecting with the pointer, return those
                      pointerIntersections
                    : rectIntersection(args);

            let overId = getFirstCollision(intersections, "id");

            if (overId != null) {
                if (overId in items) {
                    const containerItems = items[overId];

                    // If a container is matched and it contains items (columns 'A', 'B', 'C')
                    if (containerItems.length > 0) {
                        // Return the closest droppable within that container
                        overId = closestCenter({
                            ...args,
                            droppableContainers:
                                args.droppableContainers.filter((container) => {
                                    const isDifferent = container.id !== overId;
                                    let includes = false;
                                    containerItems.forEach((element) => {
                                        if (element.id === container.id) {
                                            includes = true;
                                        }
                                    });

                                    return isDifferent && includes;
                                }),
                        })[0]?.id;
                    }
                }

                lastOverId.current = overId;
                return [{ id: overId }];
            }

            // When a draggable item moves to a new container, the layout may shift
            // and the `overId` may become `null`. We manually set the cached `lastOverId`
            // to the id of the draggable item that was moved to the new container, otherwise
            // the previous `overId` will be returned which can cause items to incorrectly shift positions
            if (recentlyMovedToNewContainer.current) {
                lastOverId.current = activeId;
            }

            // If no droppable is matched, return the last match
            return lastOverId.current ? [{ id: lastOverId.current }] : [];
        },
        [activeId, items]
    );
    const [clonedItems, setClonedItems] = useState(null);
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
    const findContainer = (id) => {
        if (id in items) {
            return id;
        }

        return Object.keys(items).find((key) => {
            let includes = false;
            items[key].forEach((element) => {
                if (element.id === id) {
                    includes = true;
                }
            });

            return includes;
        });
    };

    const getDrag = (container, id) => {
        let value = "";
        items[container].forEach((element) => {
            if (element.id === id) {
                value = element.drag;
            }
        });

        return value;
    };

    const getIndexOf = (items, id) => {
        let indexOf = -1;
        items.forEach((element, index) => {
            if (element.id === id) {
                indexOf = index;
            }
        });

        return indexOf;
    };

    const getIndex = (id) => {
        const container = findContainer(id);

        if (!container) {
            return -1;
        }

        const index = items[container].indexOf(id);

        return index;
    };

    const onDragCancel = () => {
        if (clonedItems) {
            // Reset items to their original state in case items have been
            // Dragged across containers
            setItems(clonedItems);
            // console.log(
            //     "cancele el drag y devolvi los items al estado anterior"
            // );
        }

        setActiveId(null);
        setActiveValue(null);
        setClonedItems(null);
    };

    useEffect(() => {
        function handleWindowResize() {
            setWidth(containerWidth.current.clientWidth);
        }

        setWidth(containerWidth.current.offsetWidth);

        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    useEffect(() => {
        props.updateAnswer(items);
        requestAnimationFrame(() => {
            recentlyMovedToNewContainer.current = false;
        });
        //console.warn("items a sido modificado");
    }, [items]);

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={collisionDetectionStrategy}
            measuring={{
                droppable: {
                    strategy: MeasuringStrategy.Always,
                },
            }}
            onDragStart={({ active }) => {
                setActiveId(active.id);
                const activeContainer = findContainer(active.id);
                const dragValue = getDrag(activeContainer, active.id);
                setActiveValue(dragValue);
                setClonedItems(items);
            }}
            onDragOver={({ active, over }) => {
                const overId = over?.id;

                const overContainer = findContainer(overId);
                const activeContainer = findContainer(active.id);

                if (activeContainer !== overContainer) {
                    //console.log("Mi active container es: ", activeContainer);
                    //console.log("Mi over container es: ", overContainer);
                    let copy = _.cloneDeep(items[overContainer]);

                    const activeIndex = getIndexOf(
                        items[activeContainer],
                        active.id
                    );
                    copy.push(items[activeContainer][activeIndex]);

                    let pixelLength = 0;

                    copy.forEach((element) => {
                        let optionLength =
                            paddingSize + letterSize * element.drag.length;
                        if (optionLength < minWidthOption) {
                            pixelLength += minWidthOption;
                        } else {
                            pixelLength += optionLength;
                        }
                    });

                    if (pixelLength > width + 15) {
                        //console.log("too long");
                        return;
                    }

                    //Esto controla un error causado por el estado actual de Active en dispositivos lentos
                    if (!active.rect.current.translated) {
                        //console.error("ERROR, cancelare el movimiento");
                        return;
                    }

                    //console.log("entre a setItems((items) => {");
                    //items del container de donde vengo
                    const activeItems = items[activeContainer];
                    //items del container al que me estoy moviendo
                    const overItems = items[overContainer];

                    const overIndex = getIndexOf(overItems, overId);

                    let newIndex;

                    if (overId in items) {
                        //si el overId es un container
                        newIndex = overItems.length + 1;
                    } else {
                        //calculo en que posicion meter el nuevo item
                        const activeHalf =
                            active.rect.current.translated.width / 2;
                        const overHalf = over.rect.width / 2;

                        const isAfterOverItem =
                            over &&
                            active.rect.current.translated &&
                            active.rect.current.translated.left + activeHalf >
                                over.rect.left + overHalf;

                        const modifier = isAfterOverItem ? 1 : 0;

                        newIndex =
                            overIndex >= 0
                                ? overIndex + modifier
                                : overItems.length;
                    }

                    recentlyMovedToNewContainer.current = true;

                    const newItems = {
                        ...items,
                        [activeContainer]: items[activeContainer].filter(
                            (item) => item.id !== active.id
                        ),
                        [overContainer]: [
                            ...items[overContainer].slice(0, newIndex),
                            items[activeContainer][activeIndex],
                            ...items[overContainer].slice(
                                newIndex,
                                items[overContainer].length
                            ),
                        ],
                    };

                    setItems(newItems);
                } else {
                    //console.log("On Drag Over same container");
                    const overId = over?.id;

                    const overContainer = findContainer(overId);

                    if (overContainer) {
                        let indexOf = -1;
                        items[activeContainer].forEach((element, index) => {
                            if (element.id === active.id) {
                                indexOf = index;
                            }
                        });

                        const activeIndex = indexOf;

                        indexOf = -1;

                        items[overContainer].forEach((element, index) => {
                            if (element.id === overId) {
                                indexOf = index;
                            }
                        });
                        const overIndex = indexOf;

                        if (activeIndex !== overIndex) {
                            setItems((items) => ({
                                ...items,
                                [overContainer]: arrayMove(
                                    items[overContainer],
                                    activeIndex,
                                    overIndex
                                ),
                            }));
                        }
                    }
                }
            }}
            onDragEnd={() => {
                setActiveId(null);
                setActiveValue(null);
            }}
            cancelDrop={cancelDrop}
            onDragCancel={onDragCancel}
            modifiers={modifiers}
        >
            <div ref={containerWidth} className="dragAndDrop">
                {/* {width} */}
                <div className="answerDropContainers">
                    {answersContainers.map((containerId, index) => (
                        <DroppableContainer
                            key={containerId}
                            id={containerId}
                            label={`Column ${containerId}`}
                            columns={columns}
                            items={items[containerId]}
                            scrollable={scrollable}
                            style={containerStyle}
                            unstyled={minimal}
                            isfirst={index === 0}
                            showtip={items["FirstRowAnswer"].length < 1}
                        >
                            <SortableContext
                                items={items[containerId]}
                                strategy={strategy}
                            >
                                {items[containerId].map((value, index) => {
                                    return (
                                        <SortableItem
                                            disabled={props.disabled}
                                            key={value.id}
                                            id={value.id}
                                            value={value.drag}
                                            index={value}
                                            handle={handle}
                                            style={getItemStyles}
                                            wrapperStyle={wrapperStyle}
                                            renderItem={renderItem}
                                            containerId={containerId}
                                            getIndex={getIndex}
                                        />
                                    );
                                })}
                            </SortableContext>
                        </DroppableContainer>
                    ))}
                </div>
                <LuArrowDownUp className="upArrow" />
                <div className="optionsDropContainers">
                    {optionsContainers.map((containerId) => (
                        <DroppableContainer
                            key={containerId}
                            id={containerId}
                            label={`Column ${containerId}`}
                            columns={columns}
                            items={items[containerId]}
                            scrollable={scrollable}
                            style={containerStyle}
                            unstyled={minimal}
                        >
                            <SortableContext
                                items={items[containerId]}
                                strategy={strategy}
                            >
                                {items[containerId].map((value, index) => {
                                    return (
                                        <SortableItem
                                            disabled={props.disabled}
                                            key={value.id}
                                            id={value.id}
                                            value={value.drag}
                                            index={index}
                                            handle={handle}
                                            style={getItemStyles}
                                            wrapperStyle={wrapperStyle}
                                            renderItem={renderItem}
                                            containerId={containerId}
                                            getIndex={getIndex}
                                        />
                                    );
                                })}
                            </SortableContext>
                        </DroppableContainer>
                    ))}
                </div>
            </div>
            {createPortal(
                <DragOverlay
                    // className="optionsParent"
                    // adjustScale={adjustScale}
                    dropAnimation={dropAnimation}
                >
                    {renderSortableItemDragOverlay(activeId, activeValue)}
                </DragOverlay>,
                document.body
            )}
        </DndContext>
    );

    function renderSortableItemDragOverlay(id, value) {
        return (
            <Item
                value={value}
                handle={handle}
                style={getItemStyles({
                    containerId: findContainer(id),
                    overIndex: -1,
                    index: getIndex(id),
                    value: id,
                    isSorting: true,
                    isDragging: true,
                    isDragOverlay: true,
                })}
                wrapperStyle={wrapperStyle({ index: 0 })}
                renderItem={renderItem}
                dragOverlay
            />
        );
    }
}

function SortableItem({
    disabled,
    id,
    index,
    value,
    handle,
    renderItem,
    style,
    containerId,
    getIndex,
    wrapperStyle,
}) {
    const {
        setNodeRef,
        setActivatorNodeRef,
        listeners,
        isDragging,
        isSorting,
        over,
        overIndex,
        transform,
        transition,
    } = useSortable({
        id,
    });
    const mounted = useMountStatus();
    const mountedWhileDragging = isDragging && !mounted;

    return (
        <Item
            ref={disabled ? undefined : setNodeRef}
            disabled={disabled}
            value={value}
            dragging={isDragging}
            sorting={isSorting}
            handle={handle}
            handleProps={handle ? { ref: setActivatorNodeRef } : undefined}
            index={index}
            wrapperStyle={wrapperStyle({ index })}
            style={style({
                index,
                value: id,
                isDragging,
                isSorting,
                overIndex: over ? getIndex(over.id) : overIndex,
                containerId,
            })}
            transition={transition}
            transform={transform}
            fadeIn={mountedWhileDragging}
            listeners={listeners}
            renderItem={renderItem}
        />
    );
}

function useMountStatus() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setIsMounted(true), 500);

        return () => clearTimeout(timeout);
    }, []);

    return isMounted;
}
