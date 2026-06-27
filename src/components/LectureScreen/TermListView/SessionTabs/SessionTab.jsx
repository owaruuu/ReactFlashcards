import React, { useContext } from "react";
import BackToTopButton from "../../../Buttons/BackToTopButton";
import SessionControls from "../SessionControls";
import { AppContext } from "../../../../context/AppContext";
import ProgressInfoForTab from "./ProgressInfo/ProgressInfoForTab.jsx";

const SessionTab = (props) => {
    const { loggedIn } = useContext(AppContext);
    const {
        termList,
        language,
        lectureId,
        terms,
        sessionData,
        termsData,
        levelsData,
        lectureQuery,
        amountCanLearn,
        progress,
    } = props;
    // console.log("🚀 ~ SessionTab ~ terms:", terms);
    // console.log("🚀 ~ SessionTab ~ progress:", progress);

    return (
        <div className="termTab">
            {/* <div className="divider"></div> */}
            {loggedIn && (
                <>
                    <ProgressInfoForTab
                        progress={progress}
                        total={terms.length}
                    />
                    <SessionControls
                        language={language}
                        lectureId={lectureId}
                        terms={terms}
                        sessionData={sessionData}
                        termsData={termsData}
                        levelsData={levelsData}
                        lectureQuery={lectureQuery}
                        amountCanLearn={amountCanLearn}
                    />
                </>
            )}
            {termList}
            <div className="backToTopDiv">
                <BackToTopButton />
            </div>
        </div>
    );
};

export default SessionTab;
