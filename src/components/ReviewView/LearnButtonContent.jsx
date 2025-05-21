import React from "react";

const LearnButtonContent = (props) => {
    const { content, points } = props;
    return (
        <>
            <p>{content}</p>
            <div className="points">
                {points >= 0 ? `+${points}` : `${points.toString()}`}
            </div>
        </>
    );
};

export default LearnButtonContent;
