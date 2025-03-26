import React, { useContext, useState } from "react";
import { Link, Outlet, useOutletContext } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { Spinner } from "react-bootstrap";

const TestRoute = () => {
    const { user } = useContext(AppContext);
    const { hasTest, lecture, testQuery } = useOutletContext();
    // console.log("🚀 ~ TestRoute ~ testQuery:", testQuery);

    //State
    const [isTakingTest, setIsTakingTest] = useState(false);
    const [savedTest, setSavedTest] = useState(false);

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

    if (testQuery.isLoading) {
        return (
            <>
                <Spinner
                    animation="border"
                    role="status"
                    style={{ color: "#532f00" }}
                >
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p style={{ color: "white" }}>Cargando Prueba...</p>
            </>
        );
    } else {
        return (
            <div className="testScreen">
                <h2 className="testTitle">
                    <p>Prueba - {lecture.name}</p>
                </h2>
                <Outlet
                    context={{
                        testQuery,
                        lastTestResults,
                        highScore,
                        hasWonMedal,
                        lecture,
                        lectureId: lecture.lectureId,
                        isTakingTest,
                        setIsTakingTest,
                        savedTest,
                        setSavedTest,
                    }}
                />
            </div>
        );
    }
};

export default TestRoute;
