import React from "react";
import "../../components/LectureScreen/Styles/LectureScreen.css";
import TermList from "../../components/LectureScreen/TermList";
import LectureScreenButtons from "../../components/LectureScreen/LectureScreenButtons";
import UpperDivider from "../../components/LectureScreen/UpperDivider";
import { tests } from "../../data/tests";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import { useQueryClient, useQuery } from "react-query";
import { Spinner } from "react-bootstrap";
import { getLectureQueryString } from "../../utils/utils";

import {
    useLectureQuery,
    useLectureMutation,
    useSessionMutation,
} from "../../hooks/useUserDataQuery";

const TermListView = () => {
    console.warn("render termlistview");
    const navigate = useNavigate();
    const { tab, setTab, lectureQuery } = useOutletContext();
    const { loggedIn, lectures } = useContext(AppContext);

    const { lectureId } = useParams();
    const [createSessionError, setCreateSessionError] = useState(false);

    //QUERIES
    const globalQuery = useQuery("allDataForUser");

    //MUTATIONS
    const lectureMutation = useLectureMutation(
        getLectureQueryString(lectureId)
    );

    const lectureSessionMutation = useSessionMutation(
        getLectureQueryString(lectureId)
    );

    //TODO rework
    const lecture = lectures.find((lecture) => {
        return lecture.lectureId === lectureId;
    });

    const hasTest = tests[lecture.lectureId] !== undefined ? true : false;
    const showTestButton = hasTest ? true : false;

    //funcion para los botones de highlight y mute
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

    function changeToReviewScreen() {
        window.scrollTo(0, 0);

        navigate(`${tab}/study-session`);
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
    // const logData = (
    //     <div style={{ color: "white", width: "100%", wordBreak: "break-all" }}>
    //         {JSON.stringify(lectureQuery.data.data)}
    //         {/* {JSON.stringify(spanishTermsQuery.data.data)} */}
    //     </div>
    // );

    return (
        <div className="lectureScreen">
            <LectureScreenButtons test={showTestButton} />

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
                    <Tab eventKey="japanese" title="Japones">
                        <TermList
                            termList={lecture.termList}
                            globalQuery={globalQuery}
                            queryStatus={lectureQuery.status}
                            queryIsRefetching={lectureQuery.isRefetching}
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
                            queryIsRefetching={lectureQuery.isRefetching}
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

export default TermListView;
