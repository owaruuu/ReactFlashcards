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
const ProgressSection = ({ progress }) => {
    if (!progress) return null;
    return (
        <div className="progressSection">
            <ProgressBar
                amount={progress.memorized}
                total={progress.total}
                color="memorized"
            />
            <ProgressBar
                amount={progress.midPoint}
                total={progress.total}
                color="midPoint"
            />
            <ProgressBar
                amount={progress.learning}
                total={progress.total}
                color="learning"
            />

            <ProgressBar
                amount={progress.noView}
                total={progress.total}
                color="noView"
            />
        </div>
    );
};

export default ProgressSection;
