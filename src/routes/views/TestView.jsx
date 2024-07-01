import React, { useContext } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import BackButton from "../../components/BackButton";
import { TiArrowBack } from "react-icons/ti";

const TestView = () => {
    const { user, dispatch } = useContext(AppContext);
    const { test, lectureId, setIsTakingTest } = useOutletContext();
    const navigate = useNavigate();
    console.log("🚀 ~ TestView ~ test:", test);

    //Vars
    const mondaiQuantity =
        test.mondaiOptions.easy +
        test.mondaiOptions.mid +
        test.mondaiOptions.hard;

    const dragQuantity = test.dragOptions.quantity;

    const hasLastTest = () => {
        const lastTest = user.currentProgress[lectureId]?.["lastTest"];

        if (lastTest) {
            return true;
        } else {
            return false;
        }
    };
    const hasHighScore = () => {
        const highScore = user.currentProgress[lectureId]?.["highScore"];
        if (highScore) {
            const hasHighScoreForThisTestVersion =
                highScore.score[test.version];

            if (hasHighScoreForThisTestVersion) {
                return true;
            } else {
                return false;
            }
        }
    };

    //FUNCTIONS
    function handleBeginTest() {
        // dispatch({ type: "SET_IS_TAKING_TEST", payload: true });
        // navigate("try", { state: { takingTest: true } });
        setIsTakingTest(true);
        navigate("try");
    }

    return (
        <>
            <div className="titleAndPoints">
                <div></div>
                <h3>Prueba Corta</h3>
                {/* {showPoints && pointsCounter} */}
            </div>
            {/* <div>
                <ProblemCounter
                    className="problemCounter"
                    stage={stage}
                    problem={{ current: problem, max: currentMax }}
                />
            </div> */}
            <div className="beginTestDiv">
                <div className="info">
                    <p>Tiempo estimado: 10 min.</p>
                    <p>{mondaiQuantity} preguntas de opcion multiple</p>
                    <p>{dragQuantity} preguntas de ordenar</p>
                    {/* <p>5 preguntas de particulas</p> */}
                </div>

                <div className="savedResultsButtons">
                    <button
                        className={hasLastTest() ? "" : "deactivated"}
                        disabled={!hasLastTest()}
                        onClick={() => navigate("last-attempt")}
                    >
                        Ultimo intento
                    </button>
                    <button
                        className={hasHighScore() ? "" : "deactivated"}
                        disabled={!hasHighScore()}
                        onClick={() => navigate("high-score")}
                    >
                        Mejor Puntacion
                    </button>
                </div>
                <button className="beginTestButton" onClick={handleBeginTest}>
                    Comenzar
                </button>

                <BackButton
                    className="testBackButton"
                    dir={`/lectures/${lectureId}`}
                    content={
                        <>
                            <TiArrowBack /> Volver a la Leccion
                        </>
                    }
                ></BackButton>
            </div>
        </>
    );
};

export default TestView;
