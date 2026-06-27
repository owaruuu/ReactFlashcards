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
        amountCanLearn,
        dataObject,
        progress,
    } = props;
    // console.log("🚀 ~ NormalSessionTabs ~ progress:", progress);
    // console.log("🚀 ~ NormalSessionTabs ~ dataObject:", dataObject);
    // console.log("🚀 ~ NormalSessionTabs ~ lectureQuery:", lectureQuery);
    // console.log("🚀 ~ NormalSessionTabs ~ lectureQueryData:", lectureQueryData);

    // const progress = dataObject?.[lecture.lectureId]
    //     ? getProgress(dataObject[lecture.lectureId], lecture, false)
    //     : {};

    // const progress = {};

    const localProgress = {
        left: progress?.japanese,
        right: progress?.spanish,
    };

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
                    amountCanLearn={amountCanLearn[lecture.lectureId].aAmount}
                    progress={localProgress.left}
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
                    amountCanLearn={amountCanLearn[lecture.lectureId].bAmount}
                    progress={localProgress.right}
                />
            </Tab>
        </Tabs>
    );
};

function getProgress(lectureData, lecture, isKanjiView) {
    // console.log("🚀 ~ getProgress ~ lecture:", lecture);
    let progress = {};

    const leftLevels = getLevels(
        lectureData[
            isKanjiView ? "recognize_terms_levels" : "japanese_terms_levels"
        ],
        lecture.termList.length,
    );
    const rightLevels = getLevels(
        lectureData[
            isKanjiView ? "write_terms_levels" : "spanish_terms_levels"
        ],
        isKanjiView ? lecture.kanjiList.length : lecture.termList.length,
    );

    progress = {
        left: leftLevels,
        right: rightLevels,
    };

    return progress;
}

function getLevels(data, total) {
    // console.log("🚀 ~ getLevels ~ data:", data);
    const levels = {
        noView: total,
        learning: 0,
        midPoint: 0,
        memorized: 0,
    };

    if (!data) return levels;

    for (const termData of Object.values(data)) {
        if (termData.level >= 9) {
            levels.memorized += 1;
            levels.noView -= 1;
        } else if (termData.level >= 6) {
            levels.midPoint += 1;
            levels.noView -= 1;
        } else if (termData.level > 0) {
            levels.learning += 1;
            levels.noView -= 1;
        }
    }

    return levels;
}

export default NormalSessionTabs;
