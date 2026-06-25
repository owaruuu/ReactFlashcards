import "./Styles/LectureList.css";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useOutletContext } from "react-router-dom";
import LectureButtons from "./LectureButtons";
import BackToTopButton from "../Buttons/BackToTopButton";
import Spinner from "react-bootstrap/Spinner";
import DismissableBanner from "../DismissableBanner/DismissableBanner";
import ReorderButton from "./components/ReorderButton";
import FilterContainer from "./components/FilterContainer";
import { isAvailable } from "../../utils/utils.js";

const LectureListView = ({ isKanjiView = false }) => {
    // console.log("🚀 ~ LectureListView ~ isKanjiView:", isKanjiView);
    // const { isKanjiView } = props;
    const outCtx = useOutletContext();
    // console.log("🚀 ~ LectureListView ~ outCtx:", outCtx);
    const { serverError, loggedIn, lectures, kanjiSets, gotLectures } =
        useContext(AppContext);
    // console.log("🚀 ~ LectureListView ~ kanjiSets:", kanjiSets);
    // console.log("🚀 ~ LectureListView ~ lectures:", lectures);

    let filters = new Set();
    let kanjiFilters = new Set();

    // const dataObject =
    //     outCtx.allLecturesDataQuery?.status === "success"
    //         ? buildLectureData(outCtx.allLecturesDataQuery.data)
    //         : {};
    // console.log("🚀 ~ LectureButtons ~ dataObject:", dataObject);

    // const filledLectures = insertSessionData(
    //     lectures,
    //     outCtx.dataObject,
    //     isKanjiView,
    // );
    // console.log("🚀 ~ LectureButtons ~ filledLectures:", filledLectures);

    // const amountCanLearn = outCtx.filledLectures
    //     ? calculateAmountReady(outCtx.filledLectures, isKanjiView)
    //     : {};
    // console.log("🚀 ~ LectureListView ~ amountCanLearn:", amountCanLearn);

    if (isKanjiView) {
        kanjiSets.forEach((lecture) => {
            kanjiFilters.add(lecture.lectureGroup);
        });
    } else {
        lectures.forEach((lecture) => {
            filters.add(lecture.lectureGroup);
        });
    }

    return (
        <div className="lectureList">
            {!loggedIn && !serverError && (
                <DismissableBanner
                    text={
                        "Inicia sesion o crea una cuenta para guardar tu progreso y acceder a las funcionalidades premium."
                    }
                    bgColor={"#ab071d"}
                    color={"white"}
                    transition={1}
                ></DismissableBanner>
            )}
            <div className="titleContainer">
                <h2 className="lectureListTitle">Lecciones</h2>
                {loggedIn && (
                    <>
                        <div className="ordering">
                            <span>ordernar por: </span>
                            <ReorderButton
                                name={isKanjiView ? "recDate" : "jpnDate"} //Cambiar
                                text={
                                    isKanjiView
                                        ? "fecha sesión reconocer"
                                        : "fecha sesión jpn"
                                }
                                state={
                                    isKanjiView
                                        ? outCtx.recognizeDateButtonState
                                        : outCtx.japaneseDateButtonState
                                }
                                onClick={
                                    isKanjiView
                                        ? outCtx.cycleKanjiState
                                        : outCtx.cycleState
                                }
                                callback={
                                    isKanjiView
                                        ? outCtx.setRecognizeDateButtonState
                                        : outCtx.setJapaneseDateButtonState
                                }
                            />
                            <ReorderButton
                                name={isKanjiView ? "wrtDate" : "espDate"}
                                text={
                                    isKanjiView
                                        ? "fecha sesión escribir"
                                        : "fecha sesión esp"
                                }
                                state={
                                    isKanjiView
                                        ? outCtx.writeDateButtonState
                                        : outCtx.spanishDateButtonState
                                }
                                onClick={
                                    isKanjiView
                                        ? outCtx.cycleKanjiState
                                        : outCtx.cycleState
                                }
                                callback={
                                    isKanjiView
                                        ? outCtx.setWriteDateButtonState
                                        : outCtx.setSpanishDateButtonState
                                }
                            />
                            {/* {!isKanjiView && (
                                <ReorderButton
                                    name={"size"}
                                    text={"tamaño sesión jpn"}
                                    state={outCtx.sizeButtonState}
                                    onClick={outCtx.cycleState}
                                    callback={outCtx.setSizeButtonState}
                                />
                            )} */}
                        </div>
                        <FilterContainer
                            state={
                                isKanjiView
                                    ? outCtx.kanjiFilterState
                                    : outCtx.filterState
                            }
                            onClick={
                                isKanjiView
                                    ? outCtx.handleKanjiFilterClick
                                    : outCtx.handleFilterClick
                            }
                            filters={isKanjiView ? kanjiFilters : filters}
                        />
                    </>
                )}
            </div>

            {isKanjiView && !loggedIn ? (
                <div className="noLecturesMessage">
                    Necesitas iniciar sesion para acceder a esta pagina.
                </div>
            ) : (
                <div className="lectureButtons">
                    <LectureButtons
                        filledLectures={outCtx.filledLectures}
                        dataObject={outCtx.dataObject}
                        amountCanLearn={outCtx.amountCanLearn}
                        allLecturesDataQuery={outCtx.allLecturesDataQuery}
                        orderingState={
                            isKanjiView
                                ? outCtx.kanjiOrderingState
                                : outCtx.orderingState
                        }
                        filterState={
                            isKanjiView
                                ? outCtx.kanjiFilterState
                                : outCtx.filterState
                        }
                        lectures={isKanjiView ? kanjiSets : lectures}
                        isKanjiView={isKanjiView}
                    />

                    <p>
                        {isKanjiView && outCtx.extraKanjiSetMessage}
                        {!isKanjiView && outCtx.extraLessonMessage}
                    </p>
                </div>
            )}

            <div className="backToTopDiv">
                <BackToTopButton />
            </div>
        </div>
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
    let filledLectures = JSON.parse(JSON.stringify(lectures));

    filledLectures = filledLectures.map((lecture) => {
        //NEW agregar mapa de lectures
        //sera un objeto
        lecture["termListObject"] = {};

        lecture.termList.map((term) => {
            lecture["termListObject"][term.id] = term;
        });

        lecture["kanjiListObject"] = {};

        if (lecture.kanjiList) {
            lecture.kanjiList.map((kanji) => {
                lecture["kanjiListObject"][kanji.id] = kanji;
            });
        } else {
            lecture.kanjiList = [];
        }

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

    return filledLectures;
}

function calculateAmountReady(dataArray, isKanjiView) {
    // console.log("🚀 ~ calculateAmountReady ~ isKanjiView:", isKanjiView);
    // console.log("🚀 ~ calculateAmountReady ~ dataArray:", dataArray);
    const amountReady = {};

    dataArray.forEach((lecture) => {
        let aMuted = 0;
        let bMuted = 0;
        let aAmountReviewedToday = 0;
        let bAmountReviewedToday = 0;

        //calcular muteados
        if (!isKanjiView) {
            // console.warn("here ?");

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

            amountReady[lecture.lectureId] = {
                aAmount:
                    lecture.termList.length - aMuted - aAmountReviewedToday,
                bAmount:
                    lecture.termList.length - bMuted - bAmountReviewedToday,
            };
        } else {
            // console.log("🚀 ~ calculateAmountReady ~ here");

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
                for (const [key, value] of Object.entries(
                    recognizeLevelsData,
                )) {
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

            amountReady[lecture.lectureId] = {
                aAmount:
                    lecture.termList.length - aMuted - aAmountReviewedToday,
                bAmount:
                    lecture.kanjiList.length - bMuted - bAmountReviewedToday,
            };
        }

        // amountReady[lecture.lectureId] = {
        //     aAmount: lecture.termList.length - aMuted - aAmountReviewedToday,
        //     bAmount: lecture.kanjiList.length - bMuted - bAmountReviewedToday,
        // };
    });

    return amountReady;
}

export default LectureListView;
