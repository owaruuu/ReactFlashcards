import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { lectures } from "../../data/lectures";
import { tests } from "../../data/tests";
import TestDivider from "../Misc/TestDivider";
import FeedbackText from "./FeedbackText";
import TestOptionsButtons from "./TestOptionsButtons";
import ProblemCounter from "./ProblemCounter";
import { randomInt, shuffleArray } from "../../utils/utils";

const TestScreen = () => {
    console.log("run Test Screen");
    const { appState } = useContext(AppContext);

    const [score, setScore] = useState(0);
    const [maxScore, setMaxScore] = useState(100);

    //en que problema vamos, 1/5
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

    const currentPhrase = test.mondai[problem][0];

    //el array de opciones revueltas
    const [currentOptionsElem, setCurrentOptionsElem] = useState([]);

    useEffect(() => {
        setCurrentOptionsElem(shuffleArray(test.mondai[problem][1]));
        // setCurrentOptionsElem("shuffleArray(test.mondai[problem][0])");
    }, [problem]);

    const [correct, setCorrect] = useState(-1);
    const [incorrect, setIncorrect] = useState(-1);
    const [feedback, setFeedback] = useState("feed");
    const [thinking, setThinking] = useState(false);

    const handleOptionClick = (event, index) => {
        console.log(
            "🚀 ~ file: TestScreen.js:25 ~ handleOptionClick ~ event:",
            event.target
        );
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

    //recorro el array revuelto de opciones para crear los botones
    const optionsElements = currentOptionsElem.map((option) => {
        let className = "testOptionButton";
        if (correct === option.id) className += " correct";
        if (incorrect === option.id) className += " incorrect";
        return (
            <button
                className={className}
                key={option.id}
                onClick={(event) => handleOptionClick(event, option.id)}
                disabled={thinking}
            >
                {option.phrase}
            </button>
        );
    });

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
            setIn;
            //en este caso pasar a drag and drop
            //o terminar la prueba
        } else {
            setProblem(index);
            setCorrect(-1);
            setIncorrect(-1);
            setThinking(false);
            //tengo que resetear los estilo de los botones y feedback
        }
    };

    return (
        <div className="testScreen">
            <h2>
                Test - {lecture.name} - {score} pts.
            </h2>
            <h3>Select the correct translation</h3>
            <div>
                <ProblemCounter
                    stage={stage}
                    problem={{ current: problem, max: test.mondai.length }}
                />
            </div>
            <div className="testContent">
                <div className="testPhrase">
                    <p>{currentPhrase}</p>
                </div>
                <TestDivider />
                <div className="mondaiOptions">{optionsElements}</div>
            </div>

            <FeedbackText
                content={feedback}
                show={thinking}
                nextButton={handleNext}
            />
        </div>
    );
};

export default TestScreen;
