import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { lectures } from "../../data/lectures";
import { tests } from "../../data/tests";
import TestDivider from "../Misc/TestDivider";
import FeedbackText from "./FeedbackText";
import TestOptionsButtons from "./TestOptionsButtons";
import ProblemCounter from "./ProblemCounter";
import { randomInt, shuffleArray } from "../../utils/utils";
import Mondai from "./Mondai";
import DragDrop from "./DragDrop";
import Manga from "./Manga";

const TestScreen = () => {
    const { appState } = useContext(AppContext);

    const [score, setScore] = useState(0);
    const [maxScore, setMaxScore] = useState(100);

    //en que problema vamos, ej. 1/5
    const [problem, setProblem] = useState(0);

    //el objeto lecture con el cual entre, esto es setiado globalmente al entrar a una leccion
    const [lecture] = useState(() => {
        const lectureId = appState.currentLecture;
        const lecture = lectures.find((lecture) => {
            return lecture.lectureId === lectureId;
        });
        return lecture;
    });

    //el objeto test del lecture
    const [test] = useState(() => {
        return tests[lecture.testId];
    });

    const [stage, setStage] = useState("mondai");

    const [correct, setCorrect] = useState(-1);
    const [incorrect, setIncorrect] = useState(-1);
    const [feedback, setFeedback] = useState("feed");
    const [thinking, setThinking] = useState(false);

    const handleOptionClick = (event, index) => {
        if (index === 0) {
            console.log("Correct");
            setCorrect(index);
            setFeedback("Correct!");
            setThinking(true);
            setScore((prevScore) => prevScore + 1);
        } else {
            console.log("Wrong");
            setIncorrect(index);
            setFeedback("Incorrect!");
            setThinking(true);
        }
    };

    //necesito cambiar esto a un boton que cambie de stage tambien
    const handleNext = () => {
        const index = problem + 1;

        if (index > test[stage].length - 1) {
            console.log("this is the last problem");
            switch (stage) {
                case "mondai":
                    setStage("dragDrop");
                    break;
                case "dragDrop":
                    setStage("manga");
                    break;
                case "manga":
                    setStage("results");
                    break;
            }

            setProblem(0);

            //en este caso pasar a drag and drop
            //o terminar la prueba
        } else {
            setProblem(index);

            //tengo que resetear los estilo de los botones y feedback
        }

        setCorrect(-1);
        setIncorrect(-1);
        setThinking(false);
    };

    const currentMax =
        stage === "mondai"
            ? test.mondai.length
            : stage === "dragDrop"
            ? test.dragDrop.length
            : test.manga.length;

    const title =
        stage === "mondai"
            ? "Select the correct translation."
            : stage === "dragDrop"
            ? "Drag and Drop to translate."
            : "Read and respond accordingly.";

    return (
        <div className="testScreen">
            <h2>
                Test - {lecture.name} - {score} pts.
            </h2>
            <h3>{title}</h3>
            <div>
                <ProblemCounter
                    stage={stage}
                    problem={{ current: problem, max: currentMax }}
                />
            </div>
            {stage === "mondai" && (
                <Mondai
                    test={test}
                    problem={problem}
                    correct={correct}
                    incorrect={incorrect}
                    thinking={thinking}
                    handleClick={handleOptionClick}
                />
            )}
            {/* {stage === "dragDrop" && <MultipleContainers />} */}
            {stage === "dragDrop" && (
                <DragDrop
                    test={test}
                    problem={problem}
                    correct={correct}
                    incorrect={incorrect}
                    thinking={thinking}
                    handleClick={handleOptionClick}
                />
            )}
            {stage === "manga" && <Manga />}
            <FeedbackText
                content={feedback}
                show={thinking}
                nextButton={handleNext}
            />
        </div>
    );
};

export default TestScreen;
