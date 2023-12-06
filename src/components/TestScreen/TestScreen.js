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
import BeginStage from "./BeginStage/BeginStage";
import LastResultsStage from "./BeginStage/LastResultsStage";
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

    const [stage, setStage] = useState("begin");
    const [answers, setAnswers] = useState({
        score: score,
        date: new Date(),
        multiple: [],
        drag: [],
    });
    const [save, setSave] = useState(false);
    console.log("🚀 ~ file: TestScreen.js:92 ~ TestScreen ~ answers:", answers);

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
        if (info.correct) {
            console.log("Correct");
            writeAnswer("drag", info);
            setFeedback("Correct!");
            setThinking(true);
            setScore((prevScore) => prevScore + 1);
        } else {
            console.log("Wrong");
            writeAnswer("drag", info);
            setFeedback("Incorrect!");
            setThinking(true);
        }
    };

    const writeAnswer = (type, info) => {
        setAnswers({
            ...answers,
            [type]: [
                ...answers[type],
                {
                    question: info.question,
                    answer: info.answer,
                    correct: info.correct,
                },
            ],
        });
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

    const handleStart = () => {
        setStage("dragDrop");
    };

    const handleBeginButtonClick = (stage) => {
        setStage(stage);
    };

    // useEffect(() => {}, [newRecord]);

    useEffect(() => {
        if (save) {
            //check for new record
            if (newRecord) {
                dispatch({
                    type: "UPDATE_PROGRESS",
                    payload: {
                        currentProgress: {
                            ...user.currentProgress,
                            [lecture.lectureId]: {
                                ...user.currentProgress[lecture.lectureId],
                                highScore: {
                                    ...answers,
                                    score: { [test.version]: score },
                                },
                                lastTest: {
                                    ...answers,
                                    score: { [test.version]: score },
                                },
                            },
                        },
                    },
                });
            } else {
                dispatch({
                    type: "UPDATE_PROGRESS",
                    payload: {
                        currentProgress: {
                            ...user.currentProgress,
                            [lecture.lectureId]: {
                                ...user.currentProgress[lecture.lectureId],
                                lastTest: {
                                    ...answers,
                                    score: { [test.version]: score },
                                },
                            },
                        },
                    },
                });
            }

            setSave(false);
        }
    }, [save]);

    const handleSaveTestScore = () => {
        if (dbError || !loggedIn) {
            console.log(
                "no tengo acceso a la db entonces no puedo salvar el testScore"
            );
            return;
        }

        console.log("setie new record");
        setNewRecord(true);
        setSave(true);
        return;

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
        stage === "begin"
            ? "Prueba Corta"
            : stage === "last"
            ? "Last Try:"
            : stage === "high"
            ? "Your HighScore"
            : stage === "mondai"
            ? "Select the correct translation."
            : stage === "dragDrop"
            ? "Drag and Drop to translate."
            : stage === "manga"
            ? "Follow the conversation"
            : "Your Results:";

    const showFeedBackSection =
        stage === "mondai" || "dragDrop" || "manga" ? true : false;

    return (
        <div className="testScreen">
            <h2 className="testTitle">
                <p>Test</p>
                <p>-</p>
                <p>{lecture.name}</p>
                <p>-</p>
                <p>{score} pts.</p>
            </h2>
            <hr></hr>
            <h3>{title}</h3>
            <div>
                <ProblemCounter
                    className="problemCounter"
                    stage={stage}
                    problem={{ current: problem, max: currentMax }}
                />
            </div>
            {stage === "begin" && (
                <BeginStage
                    clickStart={() => handleBeginButtonClick("dragDrop")}
                    clickLast={() => handleBeginButtonClick("last")}
                    clickHigh={() => handleBeginButtonClick("high")}
                ></BeginStage>
            )}
            {stage === "last" && (
                <LastResultsStage
                    progress={user.currentProgress}
                    lectureId={lecture.lectureId}
                    version={test.version}
                    back={() => handleBeginButtonClick("begin")}
                ></LastResultsStage>
            )}
            {/* {stage === "high" && (
                <BeginStage onClick={handleStart}></BeginStage>
            )} */}

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
            {}
            {showFeedBackSection && (
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
