import React from "react";
import SmallText from "../Misc/SmallText.jsx";

const TextButton = (props) => {
    const { content, small, onClick, extra = "" } = props;

    let classNames = "";
    if (small) {
        classNames = "textButton small";
    } else {
        classNames = "textButton";
    }
    return (
        <>
            <button className={classNames} onClick={onClick}>
                {content}
            </button>
            <SmallText content={extra} />
        </>
    );
};

export default TextButton;
