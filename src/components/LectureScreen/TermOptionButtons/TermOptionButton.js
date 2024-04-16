import React from "react";

import { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import TermOptionButtonIcon from "./TermOptionButtonIcon";

const TermOptionButton = (props) => {
    const { dispatch, userData } = useContext(AppContext);
    function onClick(option) {
        let newValue = option;
        if (userData.currentData[props.lectureId]?.terms?.[props.id]) {
            if (
                userData.currentData[props.lectureId].terms[props.id]
                    .modifier == option
            ) {
                newValue = "";
            }
        }

        //cambio el estado global
        dispatch({
            type: "UPDATE_USER_DATA",
            payload: {
                currentData: {
                    ...userData.currentData,
                    [props.lectureId]: {
                        ...(userData.currentData[props.lectureId] ?? {}),
                        terms: {
                            ...userData.currentData[props.lectureId]?.terms,
                            [props.id]: { modifier: newValue },
                        },
                    },
                },
            },
        });

        //TODO use debounce para actualizar db
    }

    if (props.star) {
        return (
            <button onClick={() => onClick("highlighted")}>
                <TermOptionButtonIcon
                    data={userData.currentData[props.lectureId]}
                    id={props.id}
                    star
                />
            </button>
        );
    }
    return (
        <button onClick={() => onClick("muted")}>
            <TermOptionButtonIcon
                data={userData.currentData[props.lectureId]}
                id={props.id}
            />
        </button>
    );
};

export default TermOptionButton;
