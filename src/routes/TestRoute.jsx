import React, { useContext, useState } from "react";
import { Link, Outlet, useOutletContext } from "react-router-dom";
import ProblemCounter from "../components/TestScreen/ProblemCounter";
import { tests } from "../data/tests";
import {
    getRandomMondai,
    chooseThreeDrag,
    getRandomNumbersSimple,
} from "../utils/utils";
import { AppContext } from "../context/AppContext";
import TryTestView from "./views/TryTestView";

const TestRoute = () => {
    const { user, isTakingTest } = useContext(AppContext);
    const { test, hasTest, lectureId, lecture } = useOutletContext();
    // console.log("🚀 ~ TestRoute ~ test:", test);

    //State
    const [problem, setProblem] = useState(0); //en que problema vamos, ej. 1/5
    const [stage, setStage] = useState("begin");
    const [score, setScore] = useState(0);
    const [stopTimer, setStopTimer] = useState(false);
    const [timerInfo, setTimerInfo] = useState({
        totalSeconds: 0,
        seconds: 0,
        minutes: 0,
        hours: 0,
    });
    const [fiveMondai] = useState(() => getRandomMondai(test));
    const [threeDrag] = useState(() =>
        chooseThreeDrag(
            test,
            getRandomNumbersSimple(
                test.dragOptions.quantity,
                test.dragDrop.length
            )
        )
    );
    const [currentTest] = useState({
        version: test.version,
        mondai: fiveMondai,
        dragDrop: threeDrag,
        manga: [],
    });

    //Vars
    const lastTestResults = user.currentProgress[lectureId]?.["lastTest"];
    const highScore = user.currentProgress[lectureId]?.["highScore"];
    const goldAccent = <span className="goldAccent">:</span>;
    const [hasWonMedal] = useState(() => {
        const hasMedal = user.currentProgress.stickers?.[lecture.lectureId];

        if (hasMedal) {
            return 1;
        } else {
            return 0;
        }
    });

    const showTimer =
        stage === "mondai" ||
        stage === "dragDrop" ||
        stage === "manga" ||
        stage === "results"
            ? true
            : false;

    // const title =
    //     stage === "begin" ? (
    //         <h3>Prueba Corta</h3>
    //     ) : stage === "last" ? (
    //         <h3>Ultimo intento</h3>
    //     ) : stage === "high" ? (
    //         <h3>Tu record{goldAccent}</h3>
    //     ) : stage === "mondai" ? (
    //         getInstruction("mondai")
    //     ) : stage === "dragDrop" ? (
    //         getInstruction("drag")
    //     ) : stage === "manga" ? (
    //         <h3>Sigue la conversacion</h3>
    //     ) : (
    //         <h3>
    //             Tus resultados
    //             {goldAccent}
    //         </h3>
    //     );

    // const showPoints =
    //     stage === "mondai" || stage === "dragDrop" || stage === "manga"
    //         ? true
    //         : false;

    const currentMax =
        stage === "mondai"
            ? currentTest.mondai.length
            : stage === "dragDrop"
            ? currentTest.dragDrop.length
            : currentTest.manga.length;

    //Functions
    const updateTestTime = (info) => {
        setTimerInfo(info);
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

    //elements
    const pointsCounter = (
        <div className="pointsCounter">
            <p>{score}pts.</p>
        </div>
    );

    if (!hasTest) {
        return (
            <div style={{ color: "white" }}>
                <p>Esta leccion no tiene prueba.</p>
                <Link to={`/lectures/${lectureId}`}>Volver a Leccion.</Link>
            </div>
        );
    }

    return (
        <div className="testScreen">
            <h2 className="testTitle">
                <p>
                    Prueba - {lecture.name}{" "}
                    {/* {showTimer && (
                        <TestTimer
                            stopTimer={stopTimer}
                            updateTime={updateTestTime}
                        ></TestTimer>
                    )} */}
                </p>
            </h2>

            {isTakingTest ? (
                <TryTestView />
            ) : (
                <Outlet
                    context={{
                        test,
                        lastTestResults,
                        highScore,
                        hasWonMedal,
                        lecture,
                        lectureId,
                    }}
                />
            )}
        </div>
    );
};

export default TestRoute;
