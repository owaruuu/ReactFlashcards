import React from "react";
import SessionTab from "./SessionTab";
import SessionControls from "../SessionControls";
// este session tab muestra una lista normal con los terminos normales
const NormalSessionTab = (props) => {
    const { showControls, termItems } = props;

    return (
        <div className="termTab">
            {showControls && <SessionControls />}
            {termItems}
            <div className="backToTopDiv">
                <BackToTopButton />
            </div>
        </div>
    );
};

export default NormalSessionTab;
