import React from "react";

const LectureProgressBar = ({ amount, total, color, text, position = "" }) => {
    const percentage = amount > 0 ? (amount / total) * 100 : 0;
    const zeroedClass = amount === 0 ? "zeroed" : "";

    return (
        <div className={`lectureProgressBar ${position}`}>
            <div
                className={`ProgressBarFill ${color}`}
                style={{ width: `${percentage}%` }}
            ></div>
            <p className={`lectureProgressBarLabel ${zeroedClass}`}>
                {amount} {text}
            </p>
        </div>
    );
};

export default LectureProgressBar;
