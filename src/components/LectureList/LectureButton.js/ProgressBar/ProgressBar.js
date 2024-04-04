import React from "react";
import { levelOrder } from "../../../../utils/utils";

const ProgressBar = (props) => {
    const barState = {
        bronze: 0,
        silver: 0,
        gold: 0,
        platinum: 0,
        diamond: 0,
        master: 0,
    };

    for (const value of Object.values(props.terms)) {
        barState[value.level] += 1;
    }

    let progressBar = [];

    levelOrder.forEach((level) => {
        const percentage = (barState[level] / props.amount) * 100;

        progressBar.push(
            <div
                key={level}
                className={`${level}-section`}
                style={{ width: `${percentage}%` }}
            ></div>
        );
    });

    return (
        <div className="progressBarContainer">
            {props.arrow}
            <div className="progressBar">{progressBar}</div>
        </div>
    );
};

export default ProgressBar;
