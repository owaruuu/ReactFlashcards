import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { lectures } from "../../data/lectures";
import { tests } from "../../data/tests";
import {
    chooseFiveMondai,
    getRandomMondai,
    chooseThreeDrag,
    getRandomNumbersSimple,
} from "../../utils/utils";
import FeedbackText from "./FeedbackText";
import ProblemCounter from "./ProblemCounter";
import BeginStage from "./BeginStage/BeginStage";
import LastResultsStage from "./BeginStage/LastResultsStage";
import HighscoreStage from "./BeginStage/HighscoreStage";
import Mondai from "./Mondai";
import DragDrop from "./DragDrop";
import Manga from "./Manga";
import ResultStage from "./ResultStage/ResultStage";

import TestTimer from "../Timer/TestTimer";

const TestScreen = () => {
    const { appState, dispatch, user, dbError, loggedIn, savedTest } =
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
        return tests[lecture.lectureId];
    });

    const randomMon = getRandomMondai(test);

    const randomDrag = getRandomNumbersSimple(
        test.dragOptions.quantity,
        test.dragDrop.length
    );

    const [fiveMondai] = useState(() => getRandomMondai(test));

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
    const [maxScore] = useState(() => {
        let max = 0;
        max += currentTest.mondai.length;
        max += currentTest.dragDrop.length;
        max += currentTest.manga.length ?? 0;

        return max;
    });

    const [testVersion] = useState(test.version);
    const [hasLastTest] = useState(() => {
        const lastTest = user.currentProgress[lecture.lectureId]?.["lastTest"];

        if (lastTest) {
            return true;
        } else {
            return false;
        }
    });
    const [hasHighScore] = useState(() => {
        const highScore =
            user.currentProgress[lecture.lectureId]?.["highScore"];
        if (highScore) {
            const hasHighScoreForThisTestVersion = highScore.score[testVersion];

            if (hasHighScoreForThisTestVersion) {
                return true;
            } else {
                return false;
            }
        }
    });

    const [previousHighScore] = useState(() => {
        if (dbError || !loggedIn) {
            return 0;
        }

        const testScore =
            user.currentProgress[lecture.lectureId]?.["highScore"];

        if (!testScore) {
            return 0;
        }

        const hasHighScoreForThisTestVersion = testScore.score[testVersion];

        if (hasHighScoreForThisTestVersion) {
            return hasHighScoreForThisTestVersion;
        } else {
            return 0;
        }
    });

    //-1: dont have access to dv, 0: false, 1: true
    const [hasWonMedal] = useState(() => {
        if (dbError || !loggedIn) {
            return -1;
        }

        const hasMedal = user.currentProgress.stickers?.[lecture.lectureId];

        if (hasMedal) {
            return 1;
        } else {
            return 0;
        }
    });

    const [timerInfo, setTimerInfo] = useState({
        totalSeconds: 0,
        seconds: 0,
        minutes: 0,
        hours: 0,
    });
    const [stopTimer, setStopTimer] = useState(false);
    const [stage, setStage] = useState("begin");
    const [answers, setAnswers] = useState({
        score: score,
        date: new Date(),
        multiple: [],
        drag: [],
    });

    //for multiple choice buttons
    const [correct, setCorrect] = useState(-1);
    const [incorrect, setIncorrect] = useState(-1);

    //for drag and drop
    const [incorrectDrag, setIncorrectDrag] = useState(false);

    const [feedback, setFeedback] = useState({
        feedback: "feedback",
        nextButtonText: "Siguiente",
    });
    const [thinking, setThinking] = useState(false);
    const [startTest, setStartTest] = useState(false);

    const updateTestTime = (info) => {
        setTimerInfo(info);
    };

    const handleOptionClick = (info) => {
        if (info.correct) {
            writeAnswer("multiple", info);
            setCorrect(info.index);
            setFeedback((prev) => {
                return { ...prev, feedback: "Correcto!" };
            });
            setThinking(true);
            setScore((prevScore) => prevScore + 1);
        } else {
            writeAnswer("multiple", info);
            setIncorrect(info.index);
            setFeedback((prev) => {
                return { ...prev, feedback: "Incorrecto!" };
            });
            setThinking(true);
        }

        if (currentTest["dragDrop"].length < 1) {
            const index = problem + 1;
            if (index > currentTest["mondai"].length - 1) {
                //console.log("this is the last problem");
                setStopTimer(true);
                setFeedback((prev) => {
                    return { ...prev, nextButtonText: "Guardar Resutados" };
                });
            }
        }
    };

    const handleDragAnswer = (info) => {
        if (info.correct) {
            //console.log("Correct");
            writeAnswer("drag", info);
            setFeedback((prev) => {
                return { ...prev, feedback: "Correcto!" };
            });
            setThinking(true);
            setScore((prevScore) => prevScore + 1);
        } else {
            // console.log("Wrong");
            writeAnswer("drag", info);
            setFeedback((prev) => {
                return { ...prev, feedback: "Incorrecto!" };
            });
            setIncorrectDrag(true);
            setThinking(true);
        }

        //si es la ultima pregunta, detener el timer
        const index = problem + 1;

        if (index > currentTest["dragDrop"].length - 1) {
            //console.log("this is the last problem");
            setStopTimer(true);
            setFeedback((prev) => {
                return { ...prev, nextButtonText: "Guardar Resutados" };
            });
        }
    };

    const writeAnswer = (type, info) => {
        setAnswers({
            ...answers,
            [type]: [
                ...answers[type],
                {
                    prompt: info.prompt,
                    expected: info.expected,
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
            switch (stage) {
                case "mondai":
                    if (test.dragDrop.length > 0) {
                        setStage("dragDrop");
                    } else {
                        handleSaveTestScore();
                        setStage("results");
                    }
                    break;
                case "dragDrop":
                    // setStage("manga");
                    handleSaveTestScore();
                    setStage("results");
                    break;
                case "manga":
                    setStage("results");
                    break;
                default:
                    throw new Error("Invalid case");
            }

            setProblem(0);
        } else {
            setProblem(index);

            //tengo que resetear los estilo de los botones y feedback
        }

        setCorrect(-1);
        setIncorrect(-1);
        setIncorrectDrag(false);
        setThinking(false);
    };

    const handleBeginButtonClick = (stage) => {
        if (stage === "mondai") {
            setNewRecord(false);
            setStartTest(true);
            dispatch({ type: "SET_IS_TAKING_TEST", payload: true });
        }
        setStage(stage);
    };

    useEffect(() => {
        dispatch({ type: "SET_SAVE_TEST", payload: false });
    }, []);

    //handle user existing test without saving
    //es tonto porque updateo el event listener para nunca ocuparlo despues
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            // console.log("savedTest inside event listener: ", saved);
            // Perform actions before the component unloads
            if (!savedTest && startTest) {
                event.preventDefault(); //esto previene salir/recargar la pagina
                event.returnValue = ""; //esto es necesario al parecer
                // console.log("before unload activated");
            } else {
                //console.log("no preveni nada porque ya salve");
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [savedTest, startTest]);

    const handleSaveTestScore = () => {
        if (dbError || !loggedIn) {
            //  "no tengo acceso a la db entonces no puedo salvar el testScore"
            return;
        }

        const needToUpdateSticker =
            hasWonMedal === 1 ? false : score === maxScore ? true : false;

        const payloadObject = {
            currentProgress: {
                ...user.currentProgress,
                [lecture.lectureId]: {
                    ...user.currentProgress[lecture.lectureId],
                    lastTest: {
                        ...answers,
                        score: { [test.version]: score },
                        timer: timerInfo,
                    },
                },
            },
        };

        if (needToUpdateSticker) {
            payloadObject.currentProgress.stickers = {
                ...user.currentProgress.stickers,
                [lecture.lectureId]: true,
            };
        }

        //check for new record
        if (score > previousHighScore) {
            setNewRecord(true);
            payloadObject.currentProgress[lecture.lectureId].highScore = {
                ...answers,
                score: { [test.version]: score },
                timer: timerInfo,
            };
            dispatch({
                type: "UPDATE_PROGRESS",
                payload: payloadObject,
            });
        } else {
            dispatch({
                type: "UPDATE_PROGRESS",
                payload: payloadObject,
            });
        }
    };
    const getInstruction = (type) => {
        switch (type) {
            case "mondai":
                return test.mondaiTitle;
            case "drag":
                return test.dragTitle;
            default:
                console.error("unknown type " + type);
                break;
        }
    };

    const currentMax =
        stage === "mondai"
            ? currentTest.mondai.length
            : stage === "dragDrop"
            ? currentTest.dragDrop.length
            : currentTest.manga.length;

    const goldAccent = <span className="goldAccent">:</span>;

    const title =
        stage === "begin" ? (
            <h3>Prueba Corta</h3>
        ) : stage === "last" ? (
            <h3>Ultimo intento</h3>
        ) : stage === "high" ? (
            <h3>Tu record{goldAccent}</h3>
        ) : stage === "mondai" ? (
            getInstruction("mondai")
        ) : stage === "dragDrop" ? (
            getInstruction("drag")
        ) : stage === "manga" ? (
            <h3>Sigue la conversacion</h3>
        ) : (
            <h3>
                Tus resultados
                {goldAccent}
            </h3>
        );

    const showFeedBackSection =
        stage === "mondai" || stage === "dragDrop" || stage === "manga"
            ? true
            : false;

    const showPoints =
        stage === "mondai" || stage === "dragDrop" || stage === "manga"
            ? true
            : false;

    const showTimer =
        stage === "mondai" ||
        stage === "dragDrop" ||
        stage === "manga" ||
        stage === "results"
            ? true
            : false;

    const pointsCounter = (
        <div className="pointsCounter">
            <p>{score}pts.</p>
        </div>
    );

    return (
        <div className="testScreen">
            <h2 className="testTitle">
                <p>
                    Prueba - {lecture.name}{" "}
                    {showTimer && (
                        <TestTimer
                            stopTimer={stopTimer}
                            updateTime={updateTestTime}
                        ></TestTimer>
                    )}
                </p>
            </h2>
            <hr></hr>
            <div className="titleAndPoints">
                <div></div>
                {title}
                {showPoints && pointsCounter}
            </div>
            <div>
                <ProblemCounter
                    className="problemCounter"
                    stage={stage}
                    problem={{ current: problem, max: currentMax }}
                />
            </div>
            {stage === "begin" && (
                <BeginStage
                    clickStart={() => handleBeginButtonClick("mondai")}
                    clickLast={() => handleBeginButtonClick("last")}
                    clickHigh={() => handleBeginButtonClick("high")}
                    test={test}
                    hasLast={hasLastTest}
                    hasHighScore={hasHighScore}
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
            {stage === "high" && (
                <HighscoreStage
                    progress={user.currentProgress}
                    lectureId={lecture.lectureId}
                    lectureName={lecture.name}
                    version={test.version}
                    back={() => handleBeginButtonClick("begin")}
                    hasWonMedal={hasWonMedal}
                ></HighscoreStage>
            )}

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
            {stage === "dragDrop" && (
                <DragDrop
                    drag={threeDrag}
                    problem={problem}
                    correct={correct}
                    incorrect={incorrectDrag}
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
                    hasWonMedal={hasWonMedal}
                    results={answers}
                    lectureId={lecture.lectureId}
                    lectureName={lecture.name}
                />
            )}
            {}
            {showFeedBackSection && (
                <FeedbackText
                    feedbackArea={feedback}
                    show={thinking}
                    nextButton={handleNext}
                />
            )}
        </div>
    );
};

export default TestScreen;
