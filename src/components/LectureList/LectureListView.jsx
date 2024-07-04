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

const LectureListView = () => {
    const outCtx = useOutletContext();
    const { loggedIn, lectures, gotLectures } = useContext(AppContext);

    let filters = new Set();
    lectures.forEach((lecture) => {
        filters.add(lecture.lectureGroup);
    });

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
                                name={"jpnDate"}
                                text={"fecha sesión jpn"}
                                state={outCtx.japaneseDateButtonState}
                                onClick={outCtx.cycleState}
                                callback={outCtx.setJapaneseDateButtonState}
                            />
                            <ReorderButton
                                name={"espDate"}
                                text={"fecha sesión esp"}
                                state={outCtx.spanishDateButtonState}
                                onClick={outCtx.cycleState}
                                callback={outCtx.setSpanishDateButtonState}
                            />
                            <ReorderButton
                                name={"size"}
                                text={"tamaño sesión jpn"}
                                state={outCtx.sizeButtonState}
                                onClick={outCtx.cycleState}
                                callback={outCtx.setSizeButtonState}
                            />
                        </div>
                        <FilterContainer
                            state={outCtx.filterState}
                            onClick={outCtx.handleFilterClick}
                            filters={filters}
                        />
                    </>
                )}
            </div>

            <div className="lectureButtons">
                <LectureButtons
                    allLecturesDataQuery={outCtx.allLecturesDataQuery}
                    orderingState={outCtx.orderingState}
                    filterState={outCtx.filterState}
                    lectures={lectures}
                />
                {loggedIn && !gotLectures ? (
                    <Spinner
                        className="spinner"
                        animation="border"
                        role="status"
                    >
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                ) : (
                    ""
                )}
                <p>{outCtx.extraLessonMessage}</p>
            </div>
            <div className="backToTopDiv">
                <BackToTopButton />
            </div>
        </div>
    );
};

export default LectureListView;
