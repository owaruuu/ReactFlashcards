import { useEffect, useState } from "react";
import { shuffleArray } from "../../utils/utils";
import { MultipleContainers } from "./DndTest";
import DragAnswerContent from "./DragDropComponents/DragAnswerContent";

const DragDrop = (props) => {
    const { test, problem, correct, incorrect, thinking, handleClick } = props;
    const [currentAnswer, setCurrentAnswer] = useState("");
    const [currentOptions, setCurrentOptions] = useState(() =>
        shuffleArray([
            ...test.dragDrop[problem][2],
            ...test.dragDrop[problem][3],
        ])
    );
    const currentPhrase = test.dragDrop[problem][0];
    const currentCorrectAnswer = test.dragDrop[problem][1];

    const handleAnswerChange = (items) => {
        setCurrentAnswer(
            `${items["FirstRowAnswer"].join("")}${items["SecondRowAnswer"].join(
                ""
            )}`
        );
    };

    useEffect(() => {
        const optionsArray = shuffleArray([
            ...test.dragDrop[problem][2],
            ...test.dragDrop[problem][3],
        ]);
        setCurrentOptions(optionsArray);
    }, [problem]);

    const handleAnswerButton = () => {
        if (currentAnswer === currentCorrectAnswer) {
            handleClick(0);
        } else {
            handleClick(-1);
        }
    };

    return (
        <div className="testContent">
            <div className="testPhrase">
                <p>"{currentPhrase}"</p>
            </div>
            <p>Your answer: </p>
            <div className="dragAnswer">
                <DragAnswerContent phrase={currentAnswer} />
            </div>
            <MultipleContainers
                updateAnswer={handleAnswerChange}
                options={currentOptions}
                disabled={thinking}
            />
            {!thinking && (
                <button
                    className="dragAnswerButton"
                    onClick={handleAnswerButton}
                >
                    Answer
                </button>
            )}
        </div>
    );
};

export default DragDrop;
