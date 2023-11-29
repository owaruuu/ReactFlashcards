import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { lectures } from "../../data/lectures";
import { tests } from "../../data/tests";
import {
    chooseFiveMondai,
    getFiveRandomNumbers,
    chooseThreeDrag,
    getThreeRandomNumbers,
} from "../../utils/utils";
import FeedbackText from "./FeedbackText";
import ProblemCounter from "./ProblemCounter";
import Mondai from "./Mondai";
import DragDrop from "./DragDrop";
import Manga from "./Manga";
import ResultStage from "./ResultStage/ResultStage";

const TestScreen = () => {
    const { appState, dispatch, user, dbError, loggedIn } =
        useContext(AppContext);

    const [newRecord, setNewRecord] = useState(false);

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

    const randomMon = getFiveRandomNumbers();
    const randomDrag = getThreeRandomNumbers();

    const [fiveMondai] = useState(() => chooseFiveMondai(test, randomMon));

    //chooseThreeDrag
    const [threeDrag] = useState(() => chooseThreeDrag(test, randomDrag));

    //Make currentTest
    const [currentTest] = useState({
        version: test.version,
        mondai: fiveMondai,
        dragDrop: threeDrag,
        manga: [],
    });

    const [score, setScore] = useState(0);
    const [maxScore, setMaxScore] = useState(() => {
        let max = 0;
        max += currentTest.mondai.length;
        max += currentTest.dragDrop.length;
        max += currentTest.manga.length ?? 0;

        return max;
    });

    const [testVersion] = useState(test.version);

    const [previousHighScore, setPreviousHighScore] = useState(() => {
        if (dbError || !loggedIn) {
            return 0;
        }

        const testScore =
            user.currentProgress[lecture.lectureId]?.["testScore"];

        if (testScore) {
            return testScore[testVersion];
        } else {
            return 0;
        }
    });

    const [stage, setStage] = useState("mondai");

    //for multiple choice buttons
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

    const handleDragAnswer = (info) => {
        if (info === 0) {
            console.log("Correct");
            setFeedback("Correct!");
            setThinking(true);
            setScore((prevScore) => prevScore + 1);
        } else {
            console.log("Wrong");
            setFeedback("Incorrect!");
            setThinking(true);
        }
    };

    //necesito cambiar esto a un boton que cambie de stage tambien
    const handleNext = () => {
        const index = problem + 1;

        if (index > currentTest[stage].length - 1) {
            console.log("this is the last problem");
            switch (stage) {
                case "mondai":
                    setStage("dragDrop");
                    break;
                case "dragDrop":
                    // setStage("manga");
                    setStage("results");
                    handleSaveTestScore();
                    break;
                case "manga":
                    setStage("results");
                    break;
            }

            setProblem(0);
        } else {
            setProblem(index);

            //tengo que resetear los estilo de los botones y feedback
        }

        setCorrect(-1);
        setIncorrect(-1);
        setThinking(false);
    };

    useEffect(() => {
        if (newRecord) {
            const testScore = {
                [test.version]: score,
            };

            dispatch({
                type: "UPDATE_PROGRESS",
                payload: {
                    currentProgress: {
                        ...user.currentProgress,
                        [lecture.lectureId]: {
                            ...user.currentProgress[lecture.lectureId],
                            testScore: testScore,
                        },
                    },
                },
            });
        }
    }, [newRecord]);

    const handleSaveTestScore = () => {
        if (dbError || !loggedIn) {
            console.log(
                "no tengo acceso a la db entonces no puedo salvar el testScore"
            );
            return;
        }

        console.log("setie new record");
        return setNewRecord(true);

        //aqui deberia comparar primero los scores
        if (score > previousHighScore) {
            setNewRecord(true);
        }
    };

    const handleBackButton = () => {
        console.log("back button desde test screen");

        dispatch({
            type: "CHANGE_SCREEN",
            payload: {
                currentScreen: "lecture",
            },
        });
    };

    const currentMax =
        stage === "mondai"
            ? currentTest.mondai.length
            : stage === "dragDrop"
            ? currentTest.dragDrop.length
            : currentTest.manga.length;

    const title =
        stage === "mondai"
            ? "Select the correct translation."
            : stage === "dragDrop"
            ? "Drag and Drop to translate."
            : stage === "manga"
            ? "Follow the conversation"
            : "Your Results:";

    return (
        <div className="testScreen">
            <h2 className="testTitle">
                Test - {lecture.name} - {score} pts.
            </h2>
            <h3>{title}</h3>
            <div>
                <ProblemCounter
                    className="problemCounter"
                    stage={stage}
                    problem={{ current: problem, max: currentMax }}
                />
            </div>
            {stage === "mondai" && (
                <Mondai
                    mondai={fiveMondai}
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
                    drag={threeDrag}
                    problem={problem}
                    correct={correct}
                    incorrect={incorrect}
                    thinking={thinking}
                    handleClick={handleDragAnswer}
                />
            )}
            {stage === "manga" && <Manga />}
            {stage === "results" && (
                <ResultStage
                    score={score}
                    maxScore={maxScore}
                    newRecord={newRecord}
                    previousRecord={previousHighScore}
                    onClick={handleBackButton}
                />
            )}
            {stage !== "results" && (
                <FeedbackText
                    content={feedback}
                    show={thinking}
                    nextButton={handleNext}
                />
            )}
        </div>
    );
};

export default TestScreen;
