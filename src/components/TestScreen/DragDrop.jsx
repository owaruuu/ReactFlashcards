import { useEffect, useState } from "react";
import { shuffleArray } from "../../utils/utils";
import { MultipleContainers } from "./DragDropComponents/DndTest";
import DragAnswerContent from "./DragDropComponents/DragAnswerContent";
import DragAnswerButton from "./Util/DragAnswerButton";

const DragDrop = (props) => {
    const { drag, problem, correct, incorrect, thinking, handleClick } = props;
    const [changed, setChanged] = useState(false);
    const [currentAnswer, setCurrentAnswer] = useState("");
    const [currentOptions, setCurrentOptions] = useState(() =>
        shuffleArray([
            ...drag[problem].correctOptions,
            ...drag[problem].incorrectOptions,
            // ...test.dragDrop[problem][3],
        ])
    );
    // console.log("🚀 ~ DragDrop ~ currentOptions:", currentOptions);
    const currentPhrase = drag[problem].translation;
    // console.log("🚀 ~ DragDrop ~ currentPhrase:", currentPhrase);
    const answersArray = drag[problem].correctOptions.map(
        (answer) => answer.content
    );
    const currentCorrectAnswer = answersArray.join("");
    // console.log("🚀 ~ DragDrop ~ currentCorrectAnswer:", currentCorrectAnswer);

    const [confirm, setConfirm] = useState(false);

    const handleAnswerChange = (items) => {
        setChanged(true);
        setCurrentAnswer(() => {
            const firstRow = items["FirstRowAnswer"];
            const firstRowValues = firstRow.map((elem) => elem.content);

            const secondRow = items["SecondRowAnswer"];
            const secondRowValues = secondRow.map((elem) => elem.content);

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
            ...drag[problem].correctOptions,
            ...drag[problem].incorrectOptions,
        ]);
        setCurrentOptions(optionsArray);
    }, [problem]);

    const handleAnswerButton = () => {
        // console.log("handling answer button");
        if (currentAnswer === currentCorrectAnswer) {
            handleClick({
                prompt: currentPhrase,
                expected: currentCorrectAnswer,
                answer: currentAnswer,
                correct: true,
            });
        } else {
            handleClick({
                prompt: currentPhrase,
                expected: currentCorrectAnswer,
                answer: currentAnswer,
                correct: false,
            });
        }
    };

    const handleConfirm = () => {
        if (confirm) {
            setConfirm(false);
            handleAnswerButton();
        } else {
            setConfirm(true);
        }
    };

    return (
        <div className="testContent">
            <div className="testPhrase">
                <p>"{currentPhrase}"</p>
            </div>
            <p>Tu respuesta: </p>
            <div className="dragAnswer">
                <DragAnswerContent
                    phrase={currentAnswer}
                    changed={changed}
                    incorrect={incorrect}
                />
            </div>
            <MultipleContainers
                updateAnswer={handleAnswerChange}
                options={currentOptions}
                disabled={thinking}
            />
            {!thinking && (
                <DragAnswerButton
                    confirm={confirm}
                    onClick={handleConfirm}
                    disabled={currentAnswer === ""}
                ></DragAnswerButton>
            )}
        </div>
    );
};

export default DragDrop;
