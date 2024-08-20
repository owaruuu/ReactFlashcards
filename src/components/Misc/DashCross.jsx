import React from "react";

const DashCross = () => {
    return (
        <svg>
            <path
                fill="none"
                stroke="#cccccc"
                d="M80,0L80,160"
                strokeWidth="0.5"
                strokeDasharray="6,3"
                // style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"
            ></path>
            <path
                fill="none"
                stroke="#cccccc"
                d="M0,80L160,80"
                strokeWidth="0.5"
                strokeDasharray="6, 3"
                // style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"
            ></path>
        </svg>
    );
};

export default DashCross;
