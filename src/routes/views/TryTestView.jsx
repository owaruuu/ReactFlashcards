import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useBlocker, useOutletContext } from "react-router-dom";
import { useTestMutation } from "../../hooks/userDataQueryHook";
import {
    getRandomMondai,
    chooseThreeDrag,
    getRandomNumbersSimple,
} from "../../utils/utils";
import ExitTestModal from "../../components/Modals/ExitTestModal";
import Mondai from "../../components/TestScreen/Mondai";
import DragDrop from "../../components/TestScreen/DragDrop";
import ResultStage from "../../components/TestScreen/ResultStage/ResultStage";
import TestTimer from "../../components/Timer/TestTimer";
import ProblemCounter from "../../components/TestScreen/ProblemCounter";
import FeedbackText from "../../components/TestScreen/FeedbackText";

import InteractionBlocker from "../../components/LectureScreen/InteractionBlocker";

const TryTestView = () => {
    const { test, lecture, savedTest, setSavedTest } = useOutletContext();
    const { user, dispatch } = useContext(AppContext);
    console.log("🚀 ~ TryTestView ~ savedTest:", savedTest);
    console.log(
        "🚀 ~ user.currentProgress?.[lectureId]:",
        // JSON.stringify(user.currentProgress)
        // JSON.stringify(user.currentProgress.currentProgress)
        user.currentProgress
    );

    //HOOKS
    //Bloquea la navegacion usando React Router
    let blocker = useBlocker(
        ({ currentLocation, nextLocation }) =>
            !savedTest && currentLocation.pathname !== nextLocation.pathname
    );
    const testMutation = useTestMutation(() => setSavedTest(true));
    console.log("🚀 ~ TryTestView ~ testMutation:", testMutation);
    const [newRecord, setNewRecord] = useState(false);
    const randomDrag = getRandomNumbersSimple(
        test.dragOptions.quantity,
        test.dragDrop.length
    );
    const [fiveMondai] = useState(() => getRandomMondai(test));
    const [threeDrag] = useState(() => chooseThreeDrag(test, randomDrag));
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
    const [previousHighScore] = useState(() => {
        // if (dbError || !loggedIn) {
        //     return 0;
        // }

        const testScore =
            user.currentProgress?.[lecture.lectureId]?.["highScore"];

        if (!testScore) {
            return 0;
        }

        const hasHighScoreForThisTestVersion = testScore.score[test.version];

        if (hasHighScoreForThisTestVersion) {
            return hasHighScoreForThisTestVersion;
        } else {
            return 0;
        }
    });
    console.log(
        "🚀 ~ const[previousHighScore]=useState ~ previousHighScore:",
        previousHighScore
    );
    const [stage, setStage] = useState("mondai");
    const [problem, setProblem] = useState(0); //en que problema vamos, ej. 1/5

    const [feedback, setFeedback] = useState({
        feedback: "feedback",
        nextButtonText: "Siguiente",
    });
    const [answers, setAnswers] = useState({
        score: score,
        date: new Date(),
        multiple: [],
        drag: [],
    });

    const [timerInfo, setTimerInfo] = useState({
        totalSeconds: 0,
        seconds: 0,
        minutes: 0,
        hours: 0,
    });
    const [stopTimer, setStopTimer] = useState(false);
    const [hasWonMedal] = useState(() => {
        // if (dbError || !loggedIn) {
        //     return -1;
        // }

        const hasMedal = user.currentProgress?.stickers?.[lecture.lectureId];

        if (hasMedal) {
            return 1;
        } else {
            return 0;
        }
    });

    //for multiple choice buttons
    const [correct, setCorrect] = useState(-1);
    const [incorrect, setIncorrect] = useState(-1);
    const [incorrectDrag, setIncorrectDrag] = useState(false);

    const [thinking, setThinking] = useState(false);

    //EFFECTS
    //prevenimos recargar la pagina o navegar usando la barra
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            // Perform actions before the component unloads
            if (!savedTest) {
                event.preventDefault(); //esto previene salir/recargar la pagina
                event.returnValue = ""; //esto es necesario al parecer
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [savedTest]);

    //cada vez que empiezo una prueba reseteo el estado global de 'saveTest'
    useEffect(() => {
        console.log("effect try test");
        // dispatch({ type: "SET_SAVE_TEST", payload: false });
        setSavedTest(false);
    }, []);

    // FUNCTIONS
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
                    return { ...prev, nextButtonText: "Ver Resultados" };
                });
                handleSaveTestScore();
            }
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

    //moves to next question, also changes stage
    const handleNext = () => {
        const index = problem + 1;

        if (index > currentTest[stage].length - 1) {
            switch (stage) {
                case "mondai":
                    if (test.dragDrop.length > 0) {
                        setStage("dragDrop");
                    } else {
                        // handleSaveTestScore();
                        setStage("results");
                    }
                    break;
                case "dragDrop":
                    // setStage("manga");
                    // handleSaveTestScore();
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
                return { ...prev, nextButtonText: "Ver Resutados" };
            });
            handleSaveTestScore();
        }
    };

    const handleSaveTestScore = () => {
        // if (dbError || !loggedIn) {
        //     //  "no tengo acceso a la db entonces no puedo salvar el testScore"
        //     return;
        // }

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
                ...user.currentProgress?.stickers,
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
            console.log("new record");
            console.log(
                "🚀 ~ handleSaveTestScore ~ payloadObject:",
                payloadObject
            );
            testMutation.mutate(payloadObject.currentProgress);
            dispatch({
                type: "UPDATE_PROGRESS",
                payload: payloadObject,
            });
        } else {
            dispatch({
                type: "UPDATE_PROGRESS",
                payload: payloadObject,
            });
            console.log("no new record");
            console.log(
                "🚀 ~ handleSaveTestScore ~ payloadObject:",
                payloadObject
            );
            testMutation.mutate(payloadObject.currentProgress);
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

    // COMPONENTS
    const goldAccent = <span className="goldAccent">:</span>;

    const title =
        stage === "mondai" ? (
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

    const pointsCounter = (
        <div className="pointsCounter">
            <p>{score}pts.</p>
        </div>
    );

    // VARS
    const currentMax =
        stage === "mondai"
            ? currentTest.mondai.length
            : stage === "dragDrop"
            ? currentTest.dragDrop.length
            : currentTest.manga.length;

    return (
        <>
            {blocker.state === "blocked" ? (
                <ExitTestModal blocker={blocker} />
            ) : null}
            <div className="titleAndPoints">
                <TestTimer
                    stopTimer={stopTimer}
                    updateTime={updateTestTime}
                ></TestTimer>
                {title}
                {stage !== "results" && pointsCounter}
            </div>
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
            {stage !== "results" && (
                <div className="testFeedbackContainer">
                    <InteractionBlocker
                        error={null}
                        errorMsg={"Hubo un error guardando los resultados..."}
                        loading={testMutation.status === "loading"}
                        loadingMsg={"Guardando resultados..."}
                    />
                    <FeedbackText
                        feedbackArea={feedback}
                        show={thinking}
                        nextButton={handleNext}
                    />
                </div>
            )}
        </>
    );
};

export default TryTestView;
