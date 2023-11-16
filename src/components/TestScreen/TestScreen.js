import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { lectures } from "../../data/lectures";
import { tests } from "../../data/tests";
import TestDivider from "../Misc/TestDivider";

const TestScreen = () => {
    const { appState } = useContext(AppContext);
    const [problem, setProblem] = useState(0);
    const [phrase, setPhrase] = useState(0);

    const lectureId = appState.currentLecture;
    console.log(
        "🚀 ~ file: TestScreen.js:11 ~ TestScreen ~ lectureId:",
        lectureId
    );
    const lecture = lectures.find((lecture) => {
        return lecture.lectureId === lectureId;
    });
    const test = tests[lecture.testId];
    console.log("🚀 ~ file: TestScreen.js:18 ~ TestScreen ~ test:", test);

    const currentPhrase = test.mondai[0][problem][phrase];

    const optionsObject = test.mondai[0][1];
    console.log(
        "🚀 ~ file: TestScreen.js:26 ~ TestScreen ~ optionsObject:",
        optionsObject
    );
    const optionsArray = Object.values(test.mondai[0][1]);
    console.log(
        "🚀 ~ file: TestScreen.js:25 ~ TestScreen ~ optionsArray:",
        optionsArray
    );

    const optionsElements = optionsArray.map((option, index) => {
        return <button>{option}</button>;
    });

    return (
        <div className="testScreen">
            <h2>Test - {lecture.name}</h2>
            <h3>Select the correct translation</h3>
            <div className="testContent">
                <div className="testPhrase">{currentPhrase}</div>
                <TestDivider />
                <div className="mondaiOptions">{optionsElements}</div>
            </div>
        </div>
    );
};

export default TestScreen;
