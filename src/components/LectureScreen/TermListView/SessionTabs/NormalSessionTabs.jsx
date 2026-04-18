import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import NormalSessionTab from "./NormalSessionTab";
import SessionTab from "./SessionTab";

const NormalSessionTabs = (props) => {
    const {
        tab,
        setTab,
        japaneseList,
        spanishList,
        lecture,
        lectureQueryData,
        lectureQuery,
    } = props;
    // console.log("🚀 ~ NormalSessionTabs ~ lectureQueryData:", lectureQueryData);
    return (
        <Tabs
            activeKey={tab}
            onSelect={(k) => setTab(k)}
            id="lists-tab"
            justify
        >
            <Tab eventKey="japanese" title="Japones">
                <SessionTab
                    termList={japaneseList}
                    language="japanese"
                    lectureId={lecture.lectureId}
                    terms={lecture.termList}
                    sessionData={lectureQueryData?.japanese_session}
                    termsData={lectureQueryData?.japanese_terms_data}
                    levelsData={lectureQueryData?.japanese_terms_levels}
                    lectureQuery={lectureQuery}
                />
            </Tab>
            <Tab eventKey="spanish" title="Español">
                <SessionTab
                    termList={spanishList}
                    language="spanish"
                    lectureId={lecture.lectureId}
                    terms={lecture.termList}
                    sessionData={lectureQueryData?.spanish_session}
                    termsData={lectureQueryData?.spanish_terms_data}
                    levelsData={lectureQueryData?.spanish_terms_levels}
                    lectureQuery={lectureQuery}
                />
            </Tab>
        </Tabs>
    );
};

export default NormalSessionTabs;
