import React from "react";

const QuizQueue = (props) => {
    let queue = 0;

    if (props.japaneseQuizQueue) {
        queue += props.japaneseQuizQueue.length;
    }

    if (props.spanishQuizQueue) {
        queue += props.spanishQuizQueue.length;
    }

    if (queue > 99) {
        queue = "99+";
    }

    return <div className="memo">cola: {queue}</div>;
};

export default QuizQueue;
