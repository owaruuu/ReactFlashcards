import "./Styles/LectureScreen.css";
import TermList from "./TermList";
import { tests } from "../../data/tests";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useParams, useNavigate } from "react-router-dom";
import LectureScreenButtons from "./LectureScreenButtons";
import UpperDivider from "./UpperDivider";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import { useQueryClient } from "react-query";
import { Spinner } from "react-bootstrap";

import {
    useLectureQuery,
    useLectureMutation,
    useSessionMutation,
} from "../../hooks/userDataQueryHook";

import DismissableBanner from "../DismissableBanner/DismissableBanner";
import { getLectureQueryString } from "../../utils/utils";

const LectureScreen = (props) => {
    const navigate = useNavigate();
    const { loggedIn, lectures, gotLectures } = useContext(AppContext);

    const { lectureId } = useParams();
    const [createSessionError, setCreateSessionError] = useState(false);

    //QUERIES
    const globalQuery = useQueryClient().getQueryState("allDataForUser");
    const lectureQuery = useLectureQuery(lectureId, loggedIn ? true : false);

    //MUTATIONS
    const lectureMutation = useLectureMutation(
        getLectureQueryString(lectureId)
    );

    const lectureSessionMutation = useSessionMutation(
        getLectureQueryString(lectureId)
    );

    if (!gotLectures) {
        return (
            <div className="lectureScreen">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    //TODO rework
    const lecture = lectures.find((lecture) => {
        return lecture.lectureId === lectureId;
    });

    const hasTest = tests[lecture.lectureId] !== undefined ? true : false;
    const showTestButton = hasTest ? true : false;

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

    function changeToReviewScreen(language) {
        window.scrollTo(0, 0);

        navigate(`${language}-session`);
        // dispatch({
        //     type: "CHANGE_SCREEN",
        //     payload: {
        //         currentScreen:
        //             language === "japanese"
        //                 ? "reviewV2Japanese"
        //                 : "reviewV2Spanish",
        //     },
        // });
    }

    async function onNewSessionCreate(language, newValue) {
        try {
            await lectureSessionMutation.mutateAsync({
                lectureId: lectureId,
                attributeName: `${language}_session`,
                newValue: newValue,
            });
            changeToReviewScreen(language);
        } catch (error) {
            console.log("🚀 ~ onNewSessionCreate ~ error:", error);
            setCreateSessionError(true);
        }
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
                    text={"Accede al modo Prueba o Repaso con tu cuenta."}
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
                {/* {logData} */}
                <Tabs defaultActiveKey={props.defaultTab} id="lists-tab" fill>
                    <Tab eventKey="japanese" title="Japones">
                        <TermList
                            termList={lecture.termList}
                            globalQuery={globalQuery}
                            queryStatus={lectureQuery.status}
                            queryData={
                                lectureQuery.data?.data?.["japanese_terms_data"]
                            }
                            sessionData={
                                lectureQuery.data?.data?.["japanese_session"]
                            }
                            onIconClick={onIconClick}
                            onReviewClick={onNewSessionCreate}
                            onContinueClick={changeToReviewScreen}
                            showControls={loggedIn ? true : false}
                            sessionMutationStatus={
                                lectureSessionMutation.status
                            }
                            loggedIn={loggedIn}
                        ></TermList>
                    </Tab>
                    <Tab eventKey="spanish" title="Español">
                        <TermList
                            termList={lecture.termList}
                            globalQuery={globalQuery}
                            queryStatus={lectureQuery.status}
                            queryData={
                                lectureQuery.data?.data?.["spanish_terms_data"]
                            }
                            sessionData={
                                lectureQuery.data?.data?.["spanish_session"]
                            }
                            onIconClick={onIconClick}
                            onReviewClick={onNewSessionCreate}
                            onContinueClick={changeToReviewScreen}
                            flipped
                            showControls={loggedIn ? true : false}
                            sessionMutationStatus={
                                lectureSessionMutation.status
                            }
                            createSessionError={createSessionError}
                            loggedIn={loggedIn}
                        ></TermList>
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
};

export default LectureScreen;
