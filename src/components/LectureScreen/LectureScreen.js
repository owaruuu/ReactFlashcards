import "./Styles/LectureScreen.css";
import TermList from "./TermList";
import { tests } from "../../data/tests";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import LectureScreenButtons from "./LectureScreenButtons";
import UpperDivider from "./UpperDivider";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import {
    useLectureQuery,
    useLectureMutation,
} from "../../hooks/useUserDataQuery";

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

    //QUERIES
    const lectureQuery = useLectureQuery(lectureId, loggedIn ? true : false);
    console.log("🚀 ~ LectureScreen ~ lectureQuery:", lectureQuery);

    //MUTATIONS
    const lectureMutation = useLectureMutation(`id-${lectureId}-LectureQuery`);

    //funcion para los botoes de highlight y mute
    function onIconClick(language, termId, newValue) {
        lectureMutation.mutate({
            lectureId: lectureId,
            attributeName: `${language}_terms_data`,
            newValue: {
                ...lectureQuery.data.data[`${language}_terms_data`],
                [termId]: newValue,
            },
        });
    }

    function onSessionUpdate(language, newvalue) {
        lectureMutation.mutate({
            lectureId: lectureId,
            attributeName: `${language}_session`,
            newValue: {
                currentIndex: 0,
                terms: [1, 2, 3],
                options: {
                    showHighlighted: true,
                    showNormal: true,
                    showMuted: false,
                },
            },
        });
    }

    //TEMP
    const logData = (
        <div style={{ color: "white", width: "100%", wordBreak: "break-all" }}>
            {JSON.stringify(lectureQuery.data.data)}
            {/* {JSON.stringify(spanishTermsQuery.data.data)} */}
        </div>
    );

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

            <div className="termListDiv">
                <h2>Lista Palabras</h2>
                {logData}
                <Tabs defaultActiveKey="japanese" id="lists-tab" fill>
                    <Tab eventKey="japanese" title="Japones">
                        <TermList
                            termList={lecture.termList}
                            queryStatus={lectureQuery.status}
                            queryData={
                                lectureQuery.data?.data?.["japanese_terms_data"]
                            }
                            onIconClick={onIconClick}
                            showControls={loggedIn ? true : false}
                        ></TermList>
                    </Tab>
                    <Tab eventKey="spanish" title="Español">
                        <TermList
                            termList={lecture.termList}
                            queryStatus={lectureQuery.status}
                            queryData={
                                lectureQuery.data?.data?.["spanish_terms_data"]
                            }
                            onIconClick={onIconClick}
                            flipped
                            showControls={loggedIn ? true : false}
                        ></TermList>
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
};

export default LectureScreen;
