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

const LectureListView = (props) => {
    const { isKanjiView } = props;
    const outCtx = useOutletContext();
    const { loggedIn, lectures, kanjiSets, gotLectures } =
        useContext(AppContext);

    let filters = new Set();
    let kanjiFilters = new Set();

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
            {!loggedIn && (
                <DismissableBanner
                    text={
                        "Inicia sesion o crea una cuenta para guardar tu progreso."
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

export default LectureListView;
