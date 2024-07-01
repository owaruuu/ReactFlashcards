import React, { useContext, useState } from "react";
import { Link, Outlet, useOutletContext } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TestRoute = () => {
    const { user } = useContext(AppContext);
    const { test, hasTest, lecture } = useOutletContext();

    //State
    const [isTakingTest, setIsTakingTest] = useState(false);
    console.log("🚀 ~ TestRoute ~ isTakingTest:", isTakingTest);

    //Vars
    const lastTestResults =
        user.currentProgress[lecture.lectureId]?.["lastTest"];
    const highScore = user.currentProgress[lecture.lectureId]?.["highScore"];
    const [hasWonMedal] = useState(() => {
        const hasMedal = user.currentProgress.stickers?.[lecture.lectureId];

        if (hasMedal) {
            return 1;
        } else {
            return 0;
        }
    });

    //elements
    if (!hasTest) {
        return (
            <div style={{ color: "white" }}>
                <p>Esta leccion no tiene prueba.</p>
                <Link to={`/lectures/${lecture.lectureId}`}>
                    Volver a Leccion.
                </Link>
            </div>
        );
    }

    return (
        <div className="testScreen">
            <h2 className="testTitle">
                <p>Prueba - {lecture.name}</p>
            </h2>
            {isTakingTest && <p>is taking test</p>}
            <Outlet
                context={{
                    test,
                    lastTestResults,
                    highScore,
                    hasWonMedal,
                    lecture,
                    lectureId: lecture.lectureId,
                    isTakingTest,
                    setIsTakingTest,
                }}
            />
        </div>
    );
};

export default TestRoute;
