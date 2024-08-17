import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import SessionTab from "./SessionTab";

const KanjiSessionTabs = (props) => {
    const { tab, setTab, recognizeList, writeList, lecture, lectureQueryData } =
        props;

    return (
        <Tabs activeKey={tab} onSelect={(k) => setTab(k)} id="lists-tab" fill>
            <Tab eventKey="recognize" title="Reconocer">
                <SessionTab
                    termList={recognizeList}
                    language="recognize"
                    lectureId={lecture.lectureId}
                    terms={lecture.termList}
                    sessionData={lectureQueryData.recognize_session}
                    termsData={lectureQueryData.recognize_terms_data}
                />
            </Tab>
            <Tab eventKey="write" title="Escribir">
                <SessionTab
                    termList={writeList}
                    language="write"
                    lectureId={lecture.lectureId}
                    terms={lecture.kanjiList}
                    sessionData={lectureQueryData.write_session}
                    termsData={lectureQueryData.write_terms_data}
                />
            </Tab>
        </Tabs>
    );
};

export default KanjiSessionTabs;
