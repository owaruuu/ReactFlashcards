import React from "react";

const ProgressBar = ({ amount, total, color }) => {
    const percentage = (amount / total) * 100;
    return (
        <div className="progressBar">
            <div
                className={`progressBarFill ${color}`}
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    );
};

export default ProgressBar;
