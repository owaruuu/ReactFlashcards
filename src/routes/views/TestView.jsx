import React, { useContext, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import BackButton from "../../components/BackButton";
import { TiArrowBack } from "react-icons/ti";

const TestView = () => {
    const { user } = useContext(AppContext);
    const { testQuery, lectureId, setIsTakingTest, setSavedTest } =
        useOutletContext();
    const navigate = useNavigate();
    const test = testQuery.data.data.Item;

    //Vars
    const mondaiQuantity =
        test.mondai_options.easy +
        test.mondai_options.mid +
        test.mondai_options.hard;

    const dragQuantity =
        test.drag_options.easy + test.drag_options.mid + test.drag_options.hard;

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
                highScore.score[test.test_id];

            if (hasHighScoreForThisTestVersion) {
                return true;
            } else {
                return false;
            }
        }
    };

    //EFFECTS
    useEffect(() => {
        scrollTo(0, 0);
        setSavedTest(false);
        setIsTakingTest(false);
    }, []);

    //FUNCTIONS
    function handleBeginTest() {
        // navigate("try", { state: { takingTest: true } });
        scrollBy(0, 80);
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
