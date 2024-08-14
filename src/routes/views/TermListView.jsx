import React from "react";
import "../../components/LectureScreen/Styles/LectureScreen.css";
import TermList from "../../components/LectureScreen/TermList";
import LectureScreenButtons from "../../components/LectureScreen/LectureScreenButtons";
import UpperDivider from "../../components/LectureScreen/UpperDivider";
import { tests } from "../../data/tests";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate, useOutletContext } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { getLectureQueryString } from "../../utils/utils";

import {
    useLectureMutation,
    useSessionMutation,
} from "../../hooks/userDataQueryHook";

const TermListView = () => {
    const navigate = useNavigate();
    const {
        tab,
        setTab,
        allLecturesDataQuery,
        lectureQuery,
        lecture,
        hasTest,
        isKanjiView,
    } = useOutletContext();
    // console.log("🚀 ~ TermListView ~ isKanjiView:", isKanjiView);
    const { loggedIn } = useContext(AppContext);

    const [createSessionError, setCreateSessionError] = useState(false);

    //MUTATIONS
    const lectureMutation = useLectureMutation(
        getLectureQueryString(lecture.lectureId)
    );

    const lectureSessionMutation = useSessionMutation(
        getLectureQueryString(lecture.lectureId)
    );

    // const hasTest = tests[lecture.lectureId] !== undefined ? true : false;

    //funcion para los botones de highlight y mute
    function onIconClick(language, termId, newValue) {
        lectureMutation.mutate({
            lectureId: lecture.lectureId,
            attributeName: `${language}_terms_data`,
            newValue: {
                ...lectureQuery.data.data[`${language}_terms_data`],
                [termId]: newValue,
            },
        });
    }

    function changeToReviewScreen() {
        window.scrollTo(0, 0);

        navigate(`${tab}/study-session`);
    }

    async function onNewSessionCreate(language, newValue) {
        try {
            await lectureSessionMutation.mutateAsync({
                lectureId: lecture.lectureId,
                attributeName: `${language}_session`,
                newValue: newValue,
            });
            changeToReviewScreen();
        } catch (error) {
            console.log("🚀 ~ onNewSessionCreate ~ error:", error);
            setCreateSessionError(true);
        }
    }

    //TEMP
    // const logData = (
    //     <div style={{ color: "white", width: "100%", wordBreak: "break-all" }}>
    //         {JSON.stringify(lectureQuery.data.data)}
    //         {/* {JSON.stringify(spanishTermsQuery.data.data)} */}
    //     </div>
    // );

    return (
        <div className="lectureScreen">
            <h2 id="title" className="lectureTitle" string={lecture.name}>
                {lecture.name}
            </h2>
            <LectureScreenButtons
                hasTest={hasTest}
                loggedIn={loggedIn}
                isKanjiView={isKanjiView}
            />

            <UpperDivider />

            <div className="termListDiv">
                <h2>Lista Palabras</h2>
                {/* {logData} */}
                <Tabs
                    activeKey={tab}
                    onSelect={(k) => setTab(k)}
                    id="lists-tab"
                    fill
                >
                    <Tab
                        eventKey={isKanjiView ? "recognize" : "japanese"}
                        title={isKanjiView ? "Reconocer" : "Japones"}
                    >
                        <TermList
                            termList={lecture.termList}
                            globalQuery={allLecturesDataQuery}
                            queryStatus={lectureQuery.status}
                            queryIsRefetching={lectureQuery.isRefetching}
                            queryData={
                                isKanjiView
                                    ? lectureQuery.data?.data?.[
                                          "recognize_terms_data"
                                      ]
                                    : lectureQuery.data?.data?.[
                                          "japanese_terms_data"
                                      ]
                            }
                            sessionData={
                                isKanjiView
                                    ? lectureQuery.data?.data?.[
                                          "recognize_session"
                                      ]
                                    : lectureQuery.data?.data?.[
                                          "japanese_session"
                                      ]
                            }
                            onIconClick={onIconClick}
                            onReviewClick={onNewSessionCreate}
                            onContinueClick={changeToReviewScreen}
                            showControls={loggedIn ? true : false}
                            sessionMutationStatus={
                                lectureSessionMutation.status
                            }
                            loggedIn={loggedIn}
                            isKanjiView={isKanjiView}
                        ></TermList>
                    </Tab>
                    <Tab
                        eventKey={isKanjiView ? "write" : "spanish"}
                        title={isKanjiView ? "Escribir" : "Español"}
                    >
                        <TermList
                            termList={lecture.termList}
                            globalQuery={allLecturesDataQuery}
                            queryStatus={lectureQuery.status}
                            queryIsRefetching={lectureQuery.isRefetching}
                            queryData={
                                isKanjiView
                                    ? lectureQuery.data?.data?.[
                                          "write_terms_data"
                                      ]
                                    : lectureQuery.data?.data?.[
                                          "spanish_terms_data"
                                      ]
                            }
                            sessionData={
                                isKanjiView
                                    ? lectureQuery.data?.data?.["write_session"]
                                    : lectureQuery.data?.data?.[
                                          "spanish_session"
                                      ]
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
                            isKanjiView={isKanjiView}
                        ></TermList>
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
};

export default TermListView;
