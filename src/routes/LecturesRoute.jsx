import React from "react";
import { useEffect, useContext, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { Outlet } from "react-router-dom";
import { getExtraLessons } from "../aws/aws.js";
import { freePerms } from "../data/freePerms.js";
import { useAllLecturesDataQuery } from "../hooks/userDataQueryHook.js";
import { Spinner } from "react-bootstrap";

const LecturesRoute = (props) => {
    const { perms } = props;

    const { loggedIn, dispatch, freeLectures, gotLectures } =
        useContext(AppContext);

    // en /lectures creo la query global para todas las lecciones
    const allLecturesDataQuery = useAllLecturesDataQuery(
        loggedIn ? true : false
    );

    //State
    const [extraLessonMessage, setExtraLessonMessage] = useState("");
    const [extraKanjiSetMessage, setExtraKanjiSetMessage] = useState("");
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
        jlptn5: false,
        jlptn4: false,
        jlptn3: false,
        jlptn2: false,
        jlptn1: false,
        extra1: false,
    });
    const [orderingState, setOrderingState] = useState(null);
    const [japaneseDateButtonState, setJapaneseDateButtonState] =
        useState(null);
    const [spanishDateButtonState, setSpanishDateButtonState] = useState(null);
    const [sizeButtonState, setSizeButtonState] = useState(null);

    //Functions
    function cycleState(name, state, callback) {
        setJapaneseDateButtonState(null);
        setSpanishDateButtonState(null);
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

                //si ambas queries fallan o estan vacias
                if (
                    response.error ||
                    (response.data.length === 0 &&
                        response.kanjiData.length === 0)
                ) {
                    setExtraLessonMessage(
                        "Hubo un error obteniendo tus lecciones, intentalo mas tarde."
                    );

                    setExtraKanjiSetMessage(
                        "Hubo un error obteniendo tus lecciones, intentalo mas tarde."
                    );
                    return dispatch({
                        type: "SET_LECTURES_FLAG",
                        payload: true,
                    });
                }

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

                // si falla la query de los set de kanji
                if (response.error || response.kanjiData.length === 0) {
                    setExtraKanjiSetMessage(
                        "Hubo un error obteniendo tus lecciones, intentalo mas tarde."
                    );
                    return dispatch({
                        type: "SET_LECTURES_FLAG",
                        payload: true,
                    });
                }

                //TODO FIX
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
                }

                if (response.kanjiData.length > 0) {
                    const orderedKanjiSets = response.kanjiData.sort(
                        (a, b) => a.orderNumber - b.orderNumber
                    );
                    const kanjiSets = orderedKanjiSets.map((item) =>
                        JSON.parse(item.lecture)
                    );

                    dispatch({
                        type: "SET_KANJI_SETS",
                        payload: kanjiSets,
                    });
                }

                dispatch({ type: "SET_LECTURES_FLAG", payload: true });
            } catch (error) {
                console.log(
                    "🚀 ~ file: LectureList.js:25 ~ getLectures ~ error:",
                    error
                );
            }
        };

        if (loggedIn) {
            //&& !gotLectures
            getLectures();
        }
    }, []);

    if (!gotLectures) {
        return (
            <div className="lectureScreen">
                <Spinner
                    id="spinner-lectureScreen"
                    animation="border"
                    role="status"
                >
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p style={{ color: "white" }}>Cargando Lecciones...</p>
            </div>
        );
    }

    return (
        <Outlet
            context={{
                allLecturesDataQuery,
                extraLessonMessage,
                extraKanjiSetMessage,
                orderingState,
                japaneseDateButtonState,
                spanishDateButtonState,
                sizeButtonState,
                filterState,
                perms: [...perms.data, ...freePerms],
                setJapaneseDateButtonState,
                setSpanishDateButtonState,
                setSizeButtonState,
                cycleState,
                handleFilterClick,
            }}
        />
    );
};

export default LecturesRoute;
