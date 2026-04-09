import React from "react";

const LearnButtonContent = (props) => {
    const { content, helper } = props;
    return (
        <>
            <p>{content}</p>
            <div className="points">{helper}</div>
        </>
    );
};

export default LearnButtonContent;
