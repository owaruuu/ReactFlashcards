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
import HighscoreStage from "./BeginStage/HighscoreStage";
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
    const [hasLastTest, setHasLastTest] = useState(() => {
        const lastTest = user.currentProgress[lecture.lectureId]?.["lastTest"];

        if (lastTest) {
            return true;
        } else {
            return false;
        }
    });
    const [hasHighScore, setHasHighScore] = useState(() => {
        const highScore =
            user.currentProgress[lecture.lectureId]?.["highScore"];
        if (highScore) {
            return true;
        } else {
            return false;
        }
    });

    const [previousHighScore, setPreviousHighScore] = useState(() => {
        if (dbError || !loggedIn) {
            return 0;
        }

        const testScore =
            user.currentProgress[lecture.lectureId]?.["highScore"];

        console.log(
            "🚀 ~ file: TestScreen.js:77 ~ const[previousHighScore,setPreviousHighScore]=useState ~ testScore:",
            testScore
        );
        if (testScore) {
            return testScore.score[testVersion];
        } else {
            return 0;
        }
    });
    console.log(
        "🚀 ~ file: TestScreen.js:85 ~ const[previousHighScore,setPreviousHighScore]=useState ~ previousHighScore:",
        previousHighScore
    );

    //-1: dont have access to dv, 0: false, 1: true
    const [hasWonMedal, setHasWonMedal] = useState(() => {
        if (dbError || !loggedIn) {
            return -1;
        }

        const highScore =
            user.currentProgress[lecture.lectureId]?.["highScore"];

        if (highScore) {
            if (highScore.score[testVersion] === maxScore) {
                return 1;
            } else {
                return 0;
            }
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

    //for drag and drop
    const [incorrectDrag, setIncorrectDrag] = useState(false);

    const [feedback, setFeedback] = useState("feed");
    const [thinking, setThinking] = useState(false);

    const handleOptionClick = (info) => {
        if (info.correct) {
            console.log("Correct");
            writeAnswer("multiple", info);
            setCorrect(info.index);
            setFeedback("Correcto!");
            setThinking(true);
            setScore((prevScore) => prevScore + 1);
        } else {
            console.log("Wrong");
            writeAnswer("multiple", info);
            setIncorrect(info.index);
            setFeedback("Incorrecto!");
            setThinking(true);
        }
    };

    const handleDragAnswer = (info) => {
        if (info.correct) {
            console.log("Correct");
            writeAnswer("drag", info);
            setFeedback("Correcto!");
            setThinking(true);
            setScore((prevScore) => prevScore + 1);
        } else {
            console.log("Wrong");
            writeAnswer("drag", info);
            setFeedback("Incorrecto!");
            setIncorrectDrag(true);
            setThinking(true);
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
            console.log("this is the last problem");
            switch (stage) {
                case "mondai":
                    setStage("dragDrop");
                    break;
                case "dragDrop":
                    // setStage("manga");
                    handleSaveTestScore();
                    setStage("results");
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
        setIncorrectDrag(false);
        setThinking(false);
    };

    const handleBeginButtonClick = (stage) => {
        if (stage === "mondai") {
            setNewRecord(false);
        }
        setStage(stage);
    };

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

        // console.log("setie new record");
        // setNewRecord(true);

        // return;

        //aqui deberia comparar primero los scores
        if (score > previousHighScore) {
            setNewRecord(true);
            setSave(true);
        } else {
            setSave(true);
        }
    };

    const handleBackButton = () => {};

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
            <h3>Selecciona la traduccion correcta</h3>
        ) : stage === "dragDrop" ? (
            <h3>Arrastra y ordena la frase</h3>
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

    const pointsCounter = (
        <div className="pointsCounter">
            <p>{score}pts.</p>
        </div>
    );

    return (
        <div className="testScreen">
            {showPoints && pointsCounter}
            <h2 className="testTitle">
                <p>Prueba - {lecture.name}</p>
            </h2>
            <hr></hr>
            {title}
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
                    content={feedback}
                    show={thinking}
                    nextButton={handleNext}
                />
            )}
        </div>
    );
};

export default TestScreen;
