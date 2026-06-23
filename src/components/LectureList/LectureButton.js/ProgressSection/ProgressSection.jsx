import React from "react";
import ProgressBar from "./ProgressBar.jsx";

/**
 * @typedef {Object} Progress
 * @property {number} noView - The number of terms that have not been seen
 * @property {number} learning - The number of terms that are being learned
 * @property {number} midPoint - The number of terms that are at the mid point
 * @property {number} memorized - The number of terms that are memorized
 * @property {number} total - The total number of terms
 */

/**
 * @typedef {Object} ProgressSectionProps
 * @property {Progress} [progress] - The progress object
 * */

/**
 * ProgressSection reusable component
 * @param {ProgressSectionProps} props - The props object
 * @returns {JSX.Element} - The ProgressSection component
 */
const ProgressSection = ({ progress, total }) => {
    if (!progress) {
        progress = {
            noView: total,
            learning: 0,
            midPoint: 0,
            memorized: 0,
            total: total,
        };
    }

    return (
        <div className="progressSection">
            <div className="progressNumbers">
                <div className="progressBarLabel">{progress.memorized}</div>
                <div className="progressBarLabel">{progress.midPoint}</div>
                <div className="progressBarLabel">{progress.learning}</div>
                <div className="progressBarLabel">{progress.noView}</div>
            </div>
            <div className="progressBars">
                <ProgressBar
                    amount={progress.memorized}
                    total={total}
                    color="memorized"
                    text="Memorizado"
                />
                <ProgressBar
                    amount={progress.midPoint}
                    total={total}
                    color="midPoint"
                    text="Ya casi"
                />
                <ProgressBar
                    amount={progress.learning}
                    total={total}
                    color="learning"
                    text="Estudiando"
                />

                <ProgressBar
                    amount={progress.noView}
                    total={total}
                    color="noView"
                    text="No visto"
                />
            </div>
        </div>
    );
};

export default ProgressSection;
