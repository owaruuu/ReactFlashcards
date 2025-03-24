import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { useLectureQuery, useTestQuery } from "../hooks/userDataQueryHook";
import { AppContext } from "../context/AppContext";
import { tests } from "../data/tests";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import DismissableBanner from "../components/DismissableBanner/DismissableBanner";

// path: "/lectures/:lectureId",
const LectureRoute = (props) => {
    const { lecture, isKanjiView } = props;
    const outCtx = useOutletContext();
    const [tab, setTab] = useState(isKanjiView ? "recognize" : "japanese");
    const { loggedIn } = useContext(AppContext);
    const { lectureId } = useParams();

    //QUERIES
    const lectureQuery = useLectureQuery(lectureId, loggedIn ? true : false);
    const testQuery = useTestQuery(lecture.testId, loggedIn ? true : false);

    // const test = tests[lectureId];
    const hasTest = isKanjiView ? false : lecture.testId;

    if (!loggedIn) {
        //logged out simple view
        return (
            <div className="lectureScreen">
                {!loggedIn && (
                    <DismissableBanner
                        text={"Accede al modo Prueba o Repaso con tu cuenta."}
                        bgColor={"#ab071d"}
                        color={"white"}
                        transition={1}
                    ></DismissableBanner>
                )}

                <Outlet
                    context={{
                        tab,
                        setTab,
                        lectureQuery,
                        testQuery,
                        lecture,
                        lectureId,
                        hasTest,
                        isKanjiView,
                    }}
                />
            </div>
        );
    }

    //TODO mostrar algo en caso de falla de query
    if (
        outCtx.allLecturesDataQuery.status === "error" ||
        lectureQuery.isError
    ) {
        // console.log("🚀 ~ LectureRoute ~ lectureQuery:", lectureQuery);
        // console.error("hubo un error con las queries");
        return <h1>hubo un error con las queries</h1>;
    }

    //mostrar hijos solo cuando termine de obtener toda la data de los lectures
    // o termine la query local
    if (loggedIn) {
        return outCtx.allLecturesDataQuery.status === "success" ||
            lectureQuery.isRefetching === false ? (
            <Outlet
                context={{
                    tab,
                    setTab,
                    allLecturesDataQuery: outCtx.allLecturesDataQuery,
                    lectureQuery,
                    testQuery,
                    lecture,
                    // lectureId,
                    // test,
                    hasTest,
                    isKanjiView,
                }}
            />
        ) : (
            <div className="lectureScreen">
                <Spinner
                    id="spinner-lectureScreen"
                    animation="border"
                    role="status"
                >
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p style={{ color: "white" }}>Cargando datos...</p>
            </div>
        );
    }
};

export default LectureRoute;
