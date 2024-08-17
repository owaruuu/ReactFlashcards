import React, { useContext } from "react";
import BackToTopButton from "../../../Buttons/BackToTopButton";
import SessionControls from "../SessionControls";
import { AppContext } from "../../../../context/AppContext";

const SessionTab = (props) => {
    const { loggedIn } = useContext(AppContext);
    const { termList, language, lectureId, terms, sessionData, termsData } =
        props;

    return (
        <div className="termTab">
            {loggedIn && (
                <SessionControls
                    language={language}
                    lectureId={lectureId}
                    terms={terms}
                    sessionData={sessionData}
                    termsData={termsData}
                />
            )}
            {termList}
            <div className="backToTopDiv">
                <BackToTopButton />
            </div>
        </div>
    );
};

export default SessionTab;
