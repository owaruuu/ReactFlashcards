import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import SessionTab from "./SessionTab";

const KanjiSessionTabs = (props) => {
    const {
        tab,
        setTab,
        recognizeList,
        writeList,
        lecture,
        lectureQueryData,
        lectureQuery,
        amountCanLearn,
        progress,
    } = props;

    const localProgress = {
        left: progress?.recognize,
        right: progress?.write,
    };

    return (
        <Tabs activeKey={tab} onSelect={(k) => setTab(k)} id="lists-tab" fill>
            <Tab eventKey="recognize" title="Reconocer">
                <SessionTab
                    termList={recognizeList}
                    language="recognize"
                    lectureId={lecture.lectureId}
                    terms={lecture.termList}
                    sessionData={lectureQueryData?.recognize_session}
                    termsData={lectureQueryData?.recognize_terms_data}
                    levelsData={lectureQueryData?.recognize_terms_levels}
                    lectureQuery={lectureQuery}
                    amountCanLearn={amountCanLearn[lecture.lectureId].aAmount}
                    progress={localProgress.left}
                />
            </Tab>
            <Tab eventKey="write" title="Escribir">
                <SessionTab
                    termList={writeList}
                    language="write"
                    lectureId={lecture.lectureId}
                    terms={lecture.kanjiList}
                    sessionData={lectureQueryData?.write_session}
                    termsData={lectureQueryData?.write_terms_data}
                    levelsData={lectureQueryData?.write_terms_levels}
                    lectureQuery={lectureQuery}
                    amountCanLearn={amountCanLearn[lecture.lectureId].bAmount}
                    progress={localProgress.right}
                />
            </Tab>
        </Tabs>
    );
};

export default KanjiSessionTabs;
