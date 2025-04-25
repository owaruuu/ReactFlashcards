import React from "react";
import "../../components/LectureScreen/Styles/LectureScreen.css";
import LectureScreenButtons from "../../components/LectureScreen/LectureScreenButtons";
import UpperDivider from "../../components/LectureScreen/UpperDivider";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useOutletContext } from "react-router-dom";
import { getLectureQueryString } from "../../utils/utils";

import { useTermOptionsMutation } from "../../hooks/userDataQueryHook";
import NormalSessionTabs from "../../components/LectureScreen/TermListView/SessionTabs/NormalSessionTabs";
import KanjiSessionTabs from "../../components/LectureScreen/TermListView/SessionTabs/KanjiSessionTabs";
import NormalTermList from "../../components/LectureScreen/TermListView/SessionTabs/TermLists/NormalTermList";
import SpanishTermList from "../../components/LectureScreen/TermListView/SessionTabs/TermLists/SpanishTermList";
import RecognizeTermList from "../../components/LectureScreen/TermListView/SessionTabs/TermLists/RecognizeTermList";
import WriteTermList from "../../components/LectureScreen/TermListView/SessionTabs/TermLists/WriteTermList";

// path: "/lectures/:lectureId",
const TermListView = () => {
    const {
        tab,
        setTab,
        allLecturesDataQuery,
        lectureQuery,
        testQuery,
        lecture,
        hasTest,
        isKanjiView,
    } = useOutletContext();
    const { loggedIn } = useContext(AppContext);

    //MUTATIONS
    const termOptionsMutation = useTermOptionsMutation(
        getLectureQueryString(lecture.lectureId)
    );

    //funcion para los botones de highlight y mute
    //No va con fecha ya que no cuenta como estudio en si
    function onIconClick(language, termId, newValue) {
        termOptionsMutation.mutate({
            lectureId: lecture.lectureId,
            attributeName: `${language}_terms_data`,
            newValue: {
                ...lectureQuery.data.data[`${language}_terms_data`],
                [termId]: newValue,
            },
        });
    }

    const japaneseTermList = (
        <NormalTermList
            lecture={lecture}
            globalQuery={allLecturesDataQuery}
            lectureQuery={lectureQuery}
            queryData={lectureQuery.data?.data?.["japanese_terms_data"]}
            sessionData={lectureQuery.data?.data?.["japanese_session"]}
            onIconClick={onIconClick}
            loggedIn={loggedIn}
            isKanjiView={isKanjiView}
        />
    );
    const spanishTermList = (
        <SpanishTermList
            lecture={lecture}
            globalQuery={allLecturesDataQuery}
            lectureQuery={lectureQuery}
            queryData={lectureQuery.data?.data?.["spanish_terms_data"]}
            sessionData={lectureQuery.data?.data?.["spanish_session"]}
            onIconClick={onIconClick}
            loggedIn={loggedIn}
            isKanjiView={isKanjiView}
        />
    );

    const recognizeTermList = (
        <RecognizeTermList
            lecture={lecture}
            globalQuery={allLecturesDataQuery}
            lectureQuery={lectureQuery}
            queryData={lectureQuery.data?.data?.["recognize_terms_data"]}
            sessionData={lectureQuery.data?.data?.["recognize_session"]}
            onIconClick={onIconClick}
            loggedIn={loggedIn}
            isKanjiView={isKanjiView}
        />
    );
    const writeTermList = (
        <WriteTermList
            lecture={lecture}
            globalQuery={allLecturesDataQuery}
            lectureQuery={lectureQuery}
            queryData={lectureQuery.data?.data?.["write_terms_data"]}
            sessionData={lectureQuery.data?.data?.["write_session"]}
            onIconClick={onIconClick}
            loggedIn={loggedIn}
            isKanjiView={isKanjiView}
        />
    );

    const tabs = makeTabs();

    function makeTabs() {
        if (isKanjiView) {
            return (
                <KanjiSessionTabs
                    tab={tab}
                    setTab={setTab}
                    lecture={lecture}
                    recognizeList={recognizeTermList}
                    writeList={writeTermList}
                    lectureQueryData={lectureQuery.data?.data}
                />
            );
        } else {
            return (
                <NormalSessionTabs
                    tab={tab}
                    setTab={setTab}
                    lecture={lecture}
                    japaneseList={japaneseTermList}
                    spanishList={spanishTermList}
                    lectureQueryData={lectureQuery.data?.data}
                />
            );
        }
    }

    return (
        <div className="lectureScreen">
            <h2 id="title" className="lectureTitle" string={lecture.name}>
                {lecture.name}
            </h2>
            <LectureScreenButtons
                testQuery={testQuery}
                hasTest={hasTest}
                loggedIn={loggedIn}
                isKanjiView={isKanjiView}
            />
            <UpperDivider />
            <div className="termListDiv">
                <h2>Lista Palabras</h2>
                {/* {logData} */}
                {tabs}
            </div>
        </div>
    );
};

export default TermListView;
