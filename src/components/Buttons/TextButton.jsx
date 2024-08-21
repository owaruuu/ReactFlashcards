import React from "react";

const TextButton = (props) => {
    const { content, small, onClick } = props;

    let classNames = "";
    if (small) {
        classNames = "textButton small";
    } else {
        classNames = "textButton";
    }
    return (
        <button className={classNames} onClick={onClick}>
            {content}
        </button>
    );
};

export default TextButton;
