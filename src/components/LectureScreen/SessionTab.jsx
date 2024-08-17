import React from "react";
import SessionButtons from "./SessionButtons";
import BackToTopButton from "../Buttons/BackToTopButton";

const SessionTab = (props) => {
    const { termItems, showControls } = props;
    return (
        <div className="termTab">
            {showControls && <SessionButtons />}
            {termItems}
            <div className="backToTopDiv">
                <BackToTopButton />
            </div>
        </div>
    );
};

export default SessionTab;
