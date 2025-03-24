import React from "react";
import { useEffect, useContext, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { Outlet } from "react-router-dom";
import { getExtraLessons, getFreeLessons } from "../aws/aws.js";
import { freePerms } from "../data/freePerms.js";
import { kanjiSetsId } from "../data/extraKanjiLessons.js";
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
        extra1: false,
    });
    const [kanjiFilterState, setKanjiFilterState] = useState({
        jlptn5: false,
        jlptn4: false,
        jlptn3: false,
        jlptn2: false,
        jlptn1: false,
    });
    const [orderingState, setOrderingState] = useState(null);
    const [kanjiOrderingState, setKanjiOrderingState] = useState(null);
    const [japaneseDateButtonState, setJapaneseDateButtonState] =
        useState(null);
    const [spanishDateButtonState, setSpanishDateButtonState] = useState(null);
    const [recognizeDateButtonState, setRecognizeDateButtonState] =
        useState(null);
    const [writeDateButtonState, setWriteDateButtonState] = useState(null);

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

    function cycleKanjiState(name, state, callback) {
        setRecognizeDateButtonState(null);
        setWriteDateButtonState(null);
        if (state === null) {
            callback("ASC");
            setKanjiOrderingState(name + "ASC");
        } else if (state === "ASC") {
            callback("DESC");
            setKanjiOrderingState(name + "DESC");
        } else if (state === "DESC") {
            callback(null);
            setKanjiOrderingState(null);
        }
    }

    function handleFilterClick(payload) {
        setFilterState((prev) => {
            return { ...prev, [payload.type]: payload.value };
        });
    }
    function handleKanjiFilterClick(payload) {
        setKanjiFilterState((prev) => {
            return { ...prev, [payload.type]: payload.value };
        });
    }

    //Obtener lectures extras con permisos
    useEffect(() => {
        const fetchLessons = async () => {
            // console.log("🚀 ~ fetchLessons ~ perms.data:", perms.data);
            const hasNormalPerms = perms.data.some((id) => {
                return !kanjiSetsId.includes(id);
            });
            const hasKanjiPerms = perms.data.some((id) => {
                return kanjiSetsId.includes(id);
            });

            if (!hasNormalPerms === 0 && !hasKanjiPerms) {
                setExtraLessonMessage("No tienes acceso a mas lecciones.");
                setExtraKanjiSetMessage(
                    "No tienes acceso a mas lecciones Kanji."
                );
                return dispatch({
                    type: "SET_LECTURES_FLAG",
                    payload: true,
                });
            }

            try {
                const response = await getExtraLessons(perms.data);

                if (!hasNormalPerms) {
                    setExtraLessonMessage("No tienes acceso a mas lecciones.");
                } else {
                    setLectures(response);
                }

                if (!hasKanjiPerms) {
                    setExtraKanjiSetMessage(
                        "No tienes acceso a mas lecciones Kanji."
                    );
                } else {
                    setKanjiLectures(response);
                }

                return dispatch({
                    type: "SET_LECTURES_FLAG",
                    payload: true,
                });
            } catch (error) {
                console.log(
                    "🚀 ~ file: LectureList.js:25 ~ getLectures ~ error:",
                    error
                );
                return "aaaaaaaaaaaaaa";
            }
        };

        const fetchFreeLessons = async () => {
            try {
                const response = await getFreeLessons(freePerms);

                //Temporal, hasta que hayan lecciones kanji libres
                setExtraKanjiSetMessage("No tienes acceso a lecciones Kanji.");
                setLectures(response);
                return dispatch({
                    type: "SET_LECTURES_FLAG",
                    payload: true,
                });
            } catch (error) {
                console.log(
                    "🚀 ~ file: LectureList.js:25 ~ getLectures ~ error:",
                    error
                );
                return "Hubo un error";
            }
        };

        const setLectures = async (response) => {
            // console.log("🚀 ~ getLectures ~ response:", response);
            //si ambas queries fallan o estan vacias
            if (response.error || response.data.length === 0) {
                setExtraLessonMessage(
                    "Hubo un error obteniendo tus lecciones, intentalo mas tarde."
                );

                return;
            }

            //TODO FIX
            if (response.data.length > 0) {
                const orderedResults = response.data.sort(
                    (a, b) => a.orderNumber - b.orderNumber
                );

                const extraLectures = orderedResults.map((item) => {
                    const lecture = JSON.parse(item.lecture);
                    lecture["testId"] = item.testId;
                    return lecture;
                });

                const newLectures = [...freeLectures, ...extraLectures];

                dispatch({
                    type: "SET_LECTURES",
                    payload: newLectures,
                });
            }
        };

        const setKanjiLectures = async (response) => {
            // console.log("🚀 ~ getKanjiLectures ~ response:", response);
            //si ambas queries fallan o estan vacias
            if (response.error || response.kanjiData.length === 0) {
                setExtraKanjiSetMessage(
                    "Hubo un error obteniendo tus lecciones, intentalo mas tarde."
                );
                return;
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
        };

        if (loggedIn) {
            //&& !gotLectures
            if (perms.error) {
                setExtraLessonMessage(
                    "Hubo un error obteniendo tus permisos, intentalo mas tarde."
                );
                setExtraKanjiSetMessage(
                    "Hubo un error obteniendo tus permisos, intentalo mas tarde."
                );
                return dispatch({
                    type: "SET_LECTURES_FLAG",
                    payload: true,
                });
            }

            fetchLessons();
        } else {
            fetchFreeLessons();
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
                kanjiOrderingState,
                japaneseDateButtonState,
                spanishDateButtonState,
                recognizeDateButtonState,
                writeDateButtonState,
                sizeButtonState,
                filterState,
                kanjiFilterState,
                perms: [...perms.data, ...freePerms],
                setJapaneseDateButtonState,
                setSpanishDateButtonState,
                setRecognizeDateButtonState,
                setWriteDateButtonState,
                setSizeButtonState,
                cycleState,
                cycleKanjiState,
                handleFilterClick,
                handleKanjiFilterClick,
            }}
        />
    );
};

export default LecturesRoute;
