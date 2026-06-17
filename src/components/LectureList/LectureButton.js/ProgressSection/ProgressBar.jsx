import React from "react";

const ProgressBar = ({ amount, total, color, text }) => {
    const percentage = amount > 0 ? (amount / total) * 100 : 0;
    const zeroedClass = amount === 0 ? "zeroed" : "";
    return (
        <div className="progressBarContainer">
            <div className="progressBarLabel">{amount}</div>
            <div className="progressBar">
                <div
                    className={`progressBarFill ${color}`}
                    style={{ width: `${percentage}%` }}
                ></div>
                <p className={`progressBarText ${zeroedClass}`}>{text}</p>
            </div>
        </div>
    );
};

export default ProgressBar;
