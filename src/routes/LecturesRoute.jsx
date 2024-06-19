import React from "react";
import { useEffect, useContext, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { Outlet } from "react-router-dom";
import { getExtraLessons } from "../aws/aws.js";
import { freePerms } from "../data/freePerms.js";
import { useAllLecturesDataQuery } from "../hooks/userDataQueryHook.js";

const LecturesRoute = (props) => {
    const { perms } = props;

    const { loggedIn, dispatch, freeLectures } = useContext(AppContext);

    // en /lectures creo la query global para todas las lecciones
    const allLecturesDataQuery = useAllLecturesDataQuery(
        loggedIn ? true : false
    );

    //State
    const [extraLessonMessage, setExtraLessonMessage] = useState("");
    const [filterState, setFilterState] = useState({
        basico1: false,
        basico2: false,
        basico3: false,
        basico4: false,
        basico5: false,
        basico6: false,
        basico7: false,
        basico8: false,
        basico9: false,
        basico10: false,
        extra1: false,
    });
    const [orderingState, setOrderingState] = useState(null);
    const [dateButtonState, setDateButtonState] = useState(null);
    const [sizeButtonState, setSizeButtonState] = useState(null);

    //Functions
    function cycleState(name, state, callback) {
        setDateButtonState(null);
        setSizeButtonState(null);
        if (state === null) {
            callback("ASC");
            setOrderingState(name + "ASC");
        } else if (state === "ASC") {
            callback("DESC");
            setOrderingState(name + "DESC");
        } else if (state === "DESC") {
            callback(null);
            setOrderingState(null);
        }
    }
    function handleFilterClick(payload) {
        setFilterState((prev) => {
            return { ...prev, [payload.type]: payload.value };
        });
    }

    //Obtener lectures extras con permisos
    useEffect(() => {
        const getLectures = async () => {
            try {
                if (perms.error) {
                    setExtraLessonMessage(
                        "Hubo un error obteniendo tus permisos, intentalo mas tarde."
                    );
                    return dispatch({
                        type: "SET_LECTURES_FLAG",
                        payload: true,
                    });
                }

                if (perms.data.length === 0) {
                    setExtraLessonMessage("No tienes acceso a mas lecciones.");
                    return dispatch({
                        type: "SET_LECTURES_FLAG",
                        payload: true,
                    });
                }

                const response = await getExtraLessons(perms.data);

                //si el query falla
                if (response.error || response.data.length === 0) {
                    setExtraLessonMessage(
                        "Hubo un error obteniendo tus lecciones, intentalo mas tarde."
                    );
                    return dispatch({
                        type: "SET_LECTURES_FLAG",
                        payload: true,
                    });
                }

                if (response.data.length > 0) {
                    const orderedResults = response.data.sort(
                        (a, b) => a.orderNumber - b.orderNumber
                    );

                    const extraLectures = orderedResults.map((item) => {
                        return JSON.parse(item.lecture);
                    });

                    const newLectures = [...freeLectures, ...extraLectures];

                    dispatch({
                        type: "SET_LECTURES",
                        payload: newLectures,
                    });
                    dispatch({ type: "SET_LECTURES_FLAG", payload: true });
                }
            } catch (error) {
                console.log(
                    "🚀 ~ file: LectureList.js:25 ~ getLectures ~ error:",
                    error
                );
            }
        };

        if (loggedIn) {
            //&& !gotLectures
            console.warn("GETTING LECTURES");
            getLectures();
        }
    }, []);

    return (
        <Outlet
            context={{
                allLecturesDataQuery,
                extraLessonMessage,
                orderingState,
                dateButtonState,
                sizeButtonState,
                filterState,
                perms: [...perms.data, ...freePerms],
                setDateButtonState,
                setSizeButtonState,
                cycleState,
                handleFilterClick,
            }}
        />
    );
};

export default LecturesRoute;
