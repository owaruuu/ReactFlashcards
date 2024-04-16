import "./Styles/LectureScreen.css";
import TermList from "./TermList";
import { tests } from "../../data/tests";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import LectureScreenButtons from "./LectureScreenButtons";
import BackToTopButton from "../Buttons/BackToTopButton";
import UpperDivider from "./UpperDivider";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { QueryClient, QueryClientProvider } from "react-query";
// import { lectures } from "../../data/lectures";

import DismissableBanner from "../Misc/DismissableBanner";

const LectureScreen = () => {
    const queryClient = new QueryClient();
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

            <UpperDivider />

            <QueryClientProvider client={queryClient}>
                <div className="termListDiv">
                    <h2>Lista Palabras</h2>
                    <Tabs defaultActiveKey="japanese" id="lists-tab" fill>
                        <Tab eventKey="japanese" title="Japones">
                            <TermList lecture={lecture}></TermList>
                        </Tab>
                        <Tab eventKey="spanish" title="Espaniol">
                            <TermList lecture={lecture} flipped></TermList>
                        </Tab>
                    </Tabs>

                    <BackToTopButton />
                </div>
            </QueryClientProvider>
        </div>
    );
};

export default LectureScreen;
