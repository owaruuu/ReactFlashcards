import React from "react";
import ProgressBarSection from "./LectureProgressBar.jsx";
import LectureProgressBar from "./LectureProgressBar.jsx";
import LectureBigProgressBar from "./LectureBigProgressBar.jsx";
import { FaRegSnowflake } from "react-icons/fa";

const ProgressInfoForTab = ({ progress, total }) => {
    // console.log("🚀 ~ ProgressInfoForTab ~ progress:", progress);

    return (
        <div className="ProgressInfoForTabContainer">
            <div className="ProgressInfoForTabHeader">Tu progreso:</div>
            <div className="ProgressBarsContainer">
                <LectureBigProgressBar
                    amount={progress.memorized}
                    total={total}
                    color="memorized"
                    text="Memorizado"
                />
                <LectureProgressBar
                    amount={progress.noView}
                    total={total}
                    color="noView"
                    text="No visto"
                    position="left"
                />
                <LectureProgressBar
                    amount={progress.learning}
                    total={total}
                    color="learning"
                    text="Estudiando"
                />
                <LectureProgressBar
                    amount={progress.midPoint}
                    total={total}
                    color="midPoint"
                    text="Ya casi"
                    position="right"
                />
            </div>
            {/* <div className="ProgressText">
                <div className="progressBarLabel noView">
                    {progress.noView} No visto
                </div>
                <div className="progressBarLabel learning">
                    {progress.learning} Estudiando
                </div>
                <div className="progressBarLabel midPoint">
                    {progress.midPoint} Ya casi
                </div>
                <div className="progressBarLabel memorized">
                    {progress.memorized} Memorizado
                </div>
            </div> */}
            {/* <div className="snowflakeIconContainer">
                <FaRegSnowflake className="snowflakeIcon" />
            </div> */}
        </div>
    );
};

export default ProgressInfoForTab;
