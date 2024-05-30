import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { lectures } from "../../data/lectures";
import { tests } from "../../data/tests";
import TestDivider from "../Misc/TestDivider";
import FeedbackText from "./FeedbackText";
import { randomInt, shuffleArray } from "../../utils/utils";

const TestOptionsButtons = (props) => {
    const [optionsArray] = useState(
        shuffleArray(props.test.mondai[props.problem][1])
    );

    const optionsElements = optionsArray.map((option, index) => {
        let className = "testOptionButton";
        if (props.correct === index) className += " correct";
        return (
            <button
                className={className}
                key={index}
                onClick={(event) => props.answerProblem(index)}
                // disabled={thinking}
            >
                {option}
            </button>
        );
    });

    return <div className="mondaiOptions">{optionsElements}</div>;
};

// export default TestOptionsButtons;
