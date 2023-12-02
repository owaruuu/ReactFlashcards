import { useEffect, useState } from "react";
import { shuffleArray } from "../../utils/utils";
import { MultipleContainers } from "./DragDropComponents/DndTest";
import DragAnswerContent from "./DragDropComponents/DragAnswerContent";

const DragDrop = (props) => {
    const { drag, problem, correct, incorrect, thinking, handleClick } = props;
    const [changed, setChanged] = useState(false);
    const [currentAnswer, setCurrentAnswer] = useState("");
    const [currentOptions, setCurrentOptions] = useState(() =>
        shuffleArray([
            ...drag[problem][2],
            // ...test.dragDrop[problem][3],
        ])
    );
    const currentPhrase = drag[problem][0];
    const currentCorrectAnswer = drag[problem][1];

    const handleAnswerChange = (items) => {
        setChanged(true);
        setCurrentAnswer(() => {
            const firstRow = items["FirstRowAnswer"];
            const firstRowValues = firstRow.map((elem) => elem.drag);

            const secondRow = items["SecondRowAnswer"];
            const secondRowValues = secondRow.map((elem) => elem.drag);

            return `${firstRowValues.join("")}${secondRowValues.join("")}`;
        });
    };

    useEffect(() => {
        if (changed) {
            const timeout = setTimeout(() => {
                setChanged(false);
            }, 250);

            return () => {
                clearTimeout(timeout);
            };
        }
    }, [changed]);

    useEffect(() => {
        const optionsArray = shuffleArray([
            ...drag[problem][2],
            // ...drag[problem][3],
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
                <DragAnswerContent phrase={currentAnswer} changed={changed} />
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
                    disabled={currentAnswer === ""}
                >
                    Answer
                </button>
            )}
        </div>
    );
};

export default DragDrop;
