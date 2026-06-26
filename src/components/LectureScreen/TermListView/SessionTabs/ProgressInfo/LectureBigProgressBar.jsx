import React from "react";

const LectureBigProgressBar = ({ amount, total, color, text }) => {
    const percentage = amount > 0 ? (amount / total) * 100 : 0;
    const zeroedClass = amount === 0 ? "zeroed" : "";
    return (
        <div className={`lectureBigProgressBar ${zeroedClass}`}>
            <div
                className={`ProgressBarFill ${color}`}
                style={{ width: `${percentage}%` }}
            ></div>
            <p className="lectureBigProgressBarLabel">
                {amount} de {total} {text}
            </p>
        </div>
    );
};

export default LectureBigProgressBar;
