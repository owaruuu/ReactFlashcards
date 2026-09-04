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
    },
) {
    // console.log("🚀 ~ props.options:", props.options);
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
            // console.log("🚀 ~ items[]=firstHalf.map ~ word:", word);
            return { id: word.id + 1 + word.content, content: word.content };
            //si no le sumo +1, el item con id 0 no se mueve.
        });
        items["SecondOptions"] = secondHalf.map((word) => {
            return { id: word.id + 1 + word.content, content: word.content };
        });

        return items;
    };

    const [items, setItems] = useState(() => populateItems(props.options));
    // console.log("🚀 ~ items:", items);

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
    const lastInsertHint = useRef({ overId: null, after: false });
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
                        //BUG FIX: keep the overId if closestCenter returns nothing
                        overId =
                            closestCenter({
                                ...args,
                                droppableContainers:
                                    args.droppableContainers.filter(
                                        (container) => {
                                            const isDifferent =
                                                container.id !== overId;
                                            let includes = false;
                                            containerItems.forEach(
                                                (element) => {
                                                    if (
                                                        element.id ===
                                                        container.id
                                                    ) {
                                                        includes = true;
                                                    }
                                                },
                                            );

                                            return isDifferent && includes;
                                        },
                                    ),
                            })[0]?.id ?? overId;
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
        [activeId, items],
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
                value = element.content;
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

    const getInsertionIndex = (overItems, overId, active, over) => {
        if (overId in items) {
            return overItems.length;
        }

        const overIndex = getIndexOf(overItems, overId);

        if (over?.rect && active.rect.current?.translated) {
            const activeRect = active.rect.current.translated;
            const isAfterOverItem =
                activeRect.left + activeRect.width / 2 >
                over.rect.left + over.rect.width / 2;

            lastInsertHint.current = { overId, after: isAfterOverItem };

            return overIndex >= 0
                ? overIndex + (isAfterOverItem ? 1 : 0)
                : overItems.length;
        }

        const hint = lastInsertHint.current;
        const modifier = hint.overId === overId && hint.after ? 1 : 0;

        return overIndex >= 0 ? overIndex + modifier : overItems.length;
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
                //BUG FIX: seed lastOverId early to avoid issues when dragging to a new container
                lastOverId.current = active.id;
                lastInsertHint.current = { overId: null, after: false };
                const activeContainer = findContainer(active.id);
                const dragValue = getDrag(activeContainer, active.id);
                setActiveValue(dragValue);
                setClonedItems(items);
            }}
            onDragOver={({ active, over }) => {
                //BUG FIX: use lastOverId instead of over?.id to avoid issues when dragging to a new container
                const overId = over?.id ?? lastOverId.current;

                //BUG FIX: the above fix should be enough, not sure if checking for null should be needed
                if (!overId) {
                    return;
                }

                const overContainer = findContainer(overId);
                const activeContainer = findContainer(active.id);
                if (!overContainer || !activeContainer) {
                    return;
                }

                if (activeContainer !== overContainer) {
                    let copy = _.cloneDeep(items[overContainer]);

                    const activeIndex = getIndexOf(
                        items[activeContainer],
                        active.id,
                    );
                    copy.push(items[activeContainer][activeIndex]);

                    let pixelLength = 0;

                    copy.forEach((element) => {
                        let optionLength =
                            paddingSize + letterSize * element.content.length;
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

                    //items del container al que me estoy moviendo
                    const overItems = items[overContainer];
                    const newIndex = getInsertionIndex(
                        overItems,
                        overId,
                        active,
                        over,
                    );

                    recentlyMovedToNewContainer.current = true;

                    const newItems = {
                        ...items,
                        [activeContainer]: items[activeContainer].filter(
                            (item) => item.id !== active.id,
                        ),
                        [overContainer]: [
                            ...items[overContainer].slice(0, newIndex),
                            items[activeContainer][activeIndex],
                            ...items[overContainer].slice(
                                newIndex,
                                items[overContainer].length,
                            ),
                        ],
                    };

                    setItems(newItems);
                } else {
                    const overItems = items[overContainer];
                    const activeIndex = getIndexOf(overItems, active.id);
                    const insertIndex = getInsertionIndex(
                        overItems,
                        overId,
                        active,
                        over,
                    );

                    if (
                        activeIndex >= 0 &&
                        activeIndex !== insertIndex &&
                        overId !== active.id
                    ) {
                        setItems((items) => ({
                            ...items,
                            [overContainer]: arrayMove(
                                items[overContainer],
                                activeIndex,
                                insertIndex,
                            ),
                        }));
                    }
                }
            }}
            onDragEnd={() => {
                setActiveId(null);
                setActiveValue(null);
                lastInsertHint.current = { overId: null, after: false };
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
                                            value={value.content}
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
                                            value={value.content}
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
                document.body,
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
    // console.log("🚀 ~ value:", value);
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
