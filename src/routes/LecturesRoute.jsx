import React from "react";
import { useEffect, useContext, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { Outlet } from "react-router-dom";
import { getExtraLessons, getFreeLessons } from "../aws/aws.js";
import { freePerms } from "../data/freePerms.js";
import { kanjiSetsId } from "../data/extraKanjiLessons.js";
import { useAllLecturesDataQuery } from "../hooks/userDataQueryHook.js";
import { Spinner } from "react-bootstrap";
import { isAvailable } from "../utils/utils.js";

const LecturesRoute = (props) => {
    const { perms } = props;
    // console.log("🚀 ~ LecturesRoute ~ perms:", perms)

    const {
        loggedIn,
        dispatch,
        freeLectures,
        lectures,
        kanjiSets,
        gotLectures,
    } = useContext(AppContext);
    // console.log("🚀 ~ LecturesRoute ~ kanjiSets:", kanjiSets);
    // console.log("🚀 ~ LecturesRoute ~ lectures:", lectures);

    // en /lectures creo la query global para todas las lecciones
    const allLecturesDataQuery = useAllLecturesDataQuery(
        loggedIn ? true : false,
    );

    const dataObject =
        allLecturesDataQuery.status === "success"
            ? buildLectureData(allLecturesDataQuery.data)
            : {};
    // console.log("🚀 ~ LecturesRoute ~ dataObject:", dataObject);

    const filledLectures = insertSessionData(
        { lectures, kanjiSets },
        dataObject,
    );

    const amountCanLearn = filledLectures
        ? calculateAmountReady(filledLectures)
        : {};

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
        favoritos: false,
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
        const fetchLessons = async (hasNormalPerms, hasKanjiPerms) => {
            try {
                const response = await getExtraLessons(perms);

                if (!hasNormalPerms) {
                    setExtraLessonMessage("No tienes acceso a mas lecciones.");
                } else {
                    setLectures(response);
                }

                if (!hasKanjiPerms) {
                    setExtraKanjiSetMessage(
                        "No tienes acceso a mas lecciones Kanji.",
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
                    error,
                );
                return "aaaaaaaaaaaaaa";
            }
        };

        const fetchFreeLessons = async () => {
            try {
                const response = await getFreeLessons(freePerms);
                // console.log("🚀 ~ fetchFreeLessons ~ response:", response);

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
                    error,
                );
                return "Hubo un error";
            }
        };

        const setLectures = async (response) => {
            //si ambas queries fallan o estan vacias
            if (
                response.error ||
                response.data.length === 0 ||
                response.kanjiData?.length === 0
            ) {
                setExtraLessonMessage(
                    "Hubo un error obteniendo tus lecciones, intentalo mas tarde.",
                );

                return;
            }

            //TODO FIX
            if (response.data.length > 0) {
                const orderedResults = response.data.sort(
                    (a, b) => a.orderNumber - b.orderNumber,
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
            //si ambas queries fallan o estan vacias
            if (response.error || response.kanjiData.length === 0) {
                setExtraKanjiSetMessage(
                    "Hubo un error obteniendo tus lecciones, intentalo mas tarde.",
                );
                return;
            }

            if (response.kanjiData.length > 0) {
                const orderedKanjiSets = response.kanjiData.sort(
                    (a, b) => a.orderNumber - b.orderNumber,
                );
                const kanjiSets = orderedKanjiSets.map((item) =>
                    JSON.parse(item.lecture),
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
                    "Hubo un error obteniendo tus permisos, intentalo mas tarde.",
                );
                setExtraKanjiSetMessage(
                    "Hubo un error obteniendo tus permisos, intentalo mas tarde.",
                );
                return dispatch({
                    type: "SET_LECTURES_FLAG",
                    payload: true,
                });
            }

            const hasNormalPerms = perms.access.length > 0;
            const hasKanjiPerms = perms.kanjiAccess.length > 0;

            //Case: no tiene ninguna leccion extra
            if (!hasNormalPerms && !hasKanjiPerms) {
                fetchFreeLessons();
            } else {
                fetchLessons(hasNormalPerms, hasKanjiPerms);
            }
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
                dataObject,
                filledLectures,
                amountCanLearn,
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
                perms: [...perms.access, ...perms.kanjiAccess, ...freePerms],
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

function buildLectureData(dataArray) {
    let result = {};

    dataArray.forEach((element) => {
        result[element.lecture_id] = {
            bookmarked: element["bookmarked"],
            japanese_session: element["japanese_session"],
            japanese_terms_data: element["japanese_terms_data"],
            japanese_terms_levels: element["japanese_terms_levels"],
            spanish_session: element["spanish_session"],
            spanish_terms_data: element["spanish_terms_data"],
            spanish_terms_levels: element["spanish_terms_levels"],
            recognize_session: element["recognize_session"],
            recognize_terms_data: element["recognize_terms_data"],
            recognize_terms_levels: element["recognize_terms_levels"],
            write_session: element["write_session"],
            write_terms_data: element["write_terms_data"],
            write_terms_levels: element["write_terms_levels"],
        };
    });

    return result;
}

function insertSessionData(lectures, dataObject) {
    let filledLectures = JSON.parse(JSON.stringify(lectures.lectures));
    let filledKanjiSets = JSON.parse(JSON.stringify(lectures.kanjiSets));

    filledLectures = filledLectures.map((lecture) => {
        //NEW agregar mapa de lectures
        //sera un objeto
        lecture["termListObject"] = {};

        lecture.termList.map((term) => {
            lecture["termListObject"][term.id] = term;
        });

        if (dataObject[lecture.lectureId]) {
            if (dataObject[lecture.lectureId]["japanese_session"]) {
                lecture["japanese_session"] =
                    dataObject[lecture.lectureId]["japanese_session"];
            }
            if (dataObject[lecture.lectureId]["spanish_session"]) {
                lecture["spanish_session"] =
                    dataObject[lecture.lectureId]["spanish_session"];
            }
            if (dataObject[lecture.lectureId]["japanese_terms_levels"]) {
                lecture["japanese_terms_levels"] =
                    dataObject[lecture.lectureId]["japanese_terms_levels"];
            }
            if (dataObject[lecture.lectureId]["spanish_terms_levels"]) {
                lecture["spanish_terms_levels"] =
                    dataObject[lecture.lectureId]["spanish_terms_levels"];
            }
            if (dataObject[lecture.lectureId]["japanese_terms_data"]) {
                lecture["japanese_terms_data"] =
                    dataObject[lecture.lectureId]["japanese_terms_data"];
            }
            if (dataObject[lecture.lectureId]["spanish_terms_data"]) {
                lecture["spanish_terms_data"] =
                    dataObject[lecture.lectureId]["spanish_terms_data"];
            }
            if (dataObject[lecture.lectureId]["bookmarked"]) {
                lecture["bookmarked"] =
                    dataObject[lecture.lectureId]["bookmarked"];
            }
        }

        return lecture;
    });

    filledKanjiSets = filledKanjiSets.map((lecture) => {
        lecture["termListObject"] = {};

        lecture.termList.map((term) => {
            lecture["termListObject"][term.id] = term;
        });

        //NEW agregar mapa de kanjis
        lecture["kanjiListObject"] = {};

        lecture.kanjiList.map((kanji) => {
            lecture["kanjiListObject"][kanji.id] = kanji;
        });

        if (dataObject[lecture.lectureId]) {
            if (dataObject[lecture.lectureId]["recognize_session"]) {
                lecture["recognize_session"] =
                    dataObject[lecture.lectureId]["recognize_session"];
            }
            if (dataObject[lecture.lectureId]["write_session"]) {
                lecture["write_session"] =
                    dataObject[lecture.lectureId]["write_session"];
            }
            if (dataObject[lecture.lectureId]["recognize_terms_data"]) {
                lecture["recognize_terms_data"] =
                    dataObject[lecture.lectureId]["recognize_terms_data"];
            }
            if (dataObject[lecture.lectureId]["recognize_terms_levels"]) {
                lecture["recognize_terms_levels"] =
                    dataObject[lecture.lectureId]["recognize_terms_levels"];
            }
            if (dataObject[lecture.lectureId]["write_terms_data"]) {
                lecture["write_terms_data"] =
                    dataObject[lecture.lectureId]["write_terms_data"];
            }
            if (dataObject[lecture.lectureId]["write_terms_levels"]) {
                lecture["write_terms_levels"] =
                    dataObject[lecture.lectureId]["write_terms_levels"];
            }
            if (dataObject[lecture.lectureId]["bookmarked"]) {
                lecture["bookmarked"] =
                    dataObject[lecture.lectureId]["bookmarked"];
            }
        }

        return lecture;
    });

    return { filledLectures, filledKanjiSets };
}

function calculateAmountReady(lecturesObject) {
    const amountReady = {
        lectures: {},
        kanjiSets: {},
    };

    lecturesObject.filledLectures.forEach((lecture) => {
        let aMuted = 0;
        let bMuted = 0;
        let aAmountReviewedToday = 0;
        let bAmountReviewedToday = 0;

        //calcular muteados

        const japaneseData = lecture["japanese_terms_data"]
            ? lecture["japanese_terms_data"]
            : {}; //ADD default value
        const spanishData = lecture["spanish_terms_data"]
            ? lecture["spanish_terms_data"]
            : {}; //ADD default value

        const japaneseLevelsData = lecture["japanese_terms_levels"];
        // console.log(
        //     "🚀 ~ calculateAmountReady ~ japaneseLevelsData:",
        //     japaneseLevelsData,
        // );
        const spanishLevelsData = lecture["spanish_terms_levels"];

        if (japaneseData) {
            Object.entries(japaneseData).forEach((element) => {
                if (lecture["termListObject"][element[0]]) {
                    if (element[1] === "muted") {
                        aMuted += 1;
                    }
                }
            });
        }

        if (spanishData) {
            Object.entries(spanishData).forEach((element) => {
                if (lecture["termListObject"][element[0]]) {
                    if (element[1] === "muted") {
                        bMuted += 1;
                    }
                }
            });
        }

        //TODO cambiar logica para usar nextDate
        if (japaneseLevelsData) {
            for (const [key, value] of Object.entries(japaneseLevelsData)) {
                if (japaneseData[key] !== "muted") {
                    const isTermAvailable = isAvailable(value.nextDate);
                    if (!isTermAvailable) {
                        aAmountReviewedToday += 1;
                    }
                }
            }
        }
        //TODO cambiar logica para usar nextDate
        if (spanishLevelsData) {
            for (const [key, value] of Object.entries(spanishLevelsData)) {
                if (spanishData[key] !== "muted") {
                    const isTermAvailable = isAvailable(value.nextDate);
                    if (!isTermAvailable) {
                        bAmountReviewedToday += 1;
                    }
                }
            }
        }

        amountReady.lectures[lecture.lectureId] = {
            aAmount: lecture.termList.length - aMuted - aAmountReviewedToday,
            bAmount: lecture.termList.length - bMuted - bAmountReviewedToday,
        };

        // amountReady[lecture.lectureId] = {
        //     aAmount: lecture.termList.length - aMuted - aAmountReviewedToday,
        //     bAmount: lecture.kanjiList.length - bMuted - bAmountReviewedToday,
        // };
    });

    lecturesObject.filledKanjiSets.forEach((lecture) => {
        // console.log("🚀 ~ calculateAmountReady ~ here");
        let aMuted = 0;
        let bMuted = 0;
        let aAmountReviewedToday = 0;
        let bAmountReviewedToday = 0;

        const recognizeData = lecture["recognize_terms_data"]
            ? lecture["recognize_terms_data"]
            : {}; //ADD default value
        const writeData = lecture["write_terms_data"]
            ? lecture["write_terms_data"]
            : {}; //ADD default value
        const recognizeLevelsData = lecture["recognize_terms_levels"];
        const writeLevelsData = lecture["write_terms_levels"];

        //NEW ahora revisa que el id del muted exista en la leccion
        if (recognizeData) {
            Object.entries(recognizeData).forEach((element) => {
                if (lecture["termListObject"][element[0]]) {
                    if (element[1] === "muted") {
                        aMuted += 1;
                    }
                }
            });
        }

        if (writeData) {
            Object.entries(writeData).forEach((element) => {
                if (lecture["kanjiListObject"][element[0]]) {
                    if (element[1] === "muted") {
                        bMuted += 1;
                    }
                }
            });
        }

        if (recognizeLevelsData) {
            for (const [key, value] of Object.entries(recognizeLevelsData)) {
                if (recognizeData[key] !== "muted") {
                    //ADD check for muted state
                    const isTermAvailable = isAvailable(value.nextDate);
                    if (!isTermAvailable) {
                        aAmountReviewedToday += 1;
                    }
                }
            }
        }
        if (writeLevelsData) {
            for (const [key, value] of Object.entries(writeLevelsData)) {
                if (writeData[key] !== "muted") {
                    //ADD check for muted state
                    const isTermAvailable = isAvailable(value.nextDate);
                    if (!isTermAvailable) {
                        bAmountReviewedToday += 1;
                    }
                }
            }
        }

        amountReady.kanjiSets[lecture.lectureId] = {
            aAmount: lecture.termList.length - aMuted - aAmountReviewedToday,
            bAmount: lecture.kanjiList.length - bMuted - bAmountReviewedToday,
        };
    });

    return amountReady;
}

export default LecturesRoute;
