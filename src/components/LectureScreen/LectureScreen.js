import TermList from "./TermList";
import { tests } from "../../data/tests";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import LectureScreenButtons from "./LectureScreenButtons";
import BackToTopButton from "../Buttons/BackToTopButton";
// import { lectures } from "../../data/lectures";
import svg from "../../svg/cherry-blossom-petal.svg";
import DismissableBanner from "../Misc/DismissableBanner";

const LectureScreen = () => {
    const { appState, dbError, loggedIn, user, lectures } =
        useContext(AppContext);

    const lectureId = appState.currentLecture;
    const lecture = lectures.find((lecture) => {
        return lecture.lectureId === lectureId;
    });

    const hasTest = tests[lecture.lectureId] !== undefined ? true : false;
    const showTestButton = hasTest ? true : false;

    return (
        <div className="lectureScreen">
            {!loggedIn && (
                <DismissableBanner
                    text={"Accede al modo Memorizar o Prueba con tu cuenta."}
                    bgColor={"#ab071d"}
                    color={"white"}
                    transition={1}
                ></DismissableBanner>
            )}

            <h2 id="title" className="lectureTitle" string={lecture.name}>
                {lecture.name}
            </h2>
            <LectureScreenButtons test={showTestButton} />

            <div
                className="upperDivider"
                style={{
                    marginBottom: "9px",
                }}
            >
                <img
                    className="upperLogo"
                    src={svg}
                    style={{
                        width: "68px",
                        top: "-26px",
                        marginLeft: "calc(50% - 34px)",
                    }}
                ></img>
            </div>
            <div className="termListDiv">
                <h2>Lista Palabras</h2>
                <TermList lecture={lecture}></TermList>
                <BackToTopButton />
            </div>
        </div>
    );
};

export default LectureScreen;
