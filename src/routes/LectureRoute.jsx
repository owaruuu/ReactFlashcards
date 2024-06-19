import React from "react";
import { useContext, useState } from "react";
import { useLectureQuery } from "../hooks/userDataQueryHook";
import { AppContext } from "../context/AppContext";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import DismissableBanner from "../components/DismissableBanner/DismissableBanner";

const LectureRoute = () => {
    const [tab, setTab] = useState("japanese");
    const outCtx = useOutletContext();
    const { loggedIn, lectures, gotLectures } = useContext(AppContext);
    const { lectureId } = useParams();

    let lecture = lectures.find((lecture) => {
        return lecture.lectureId === lectureId;
    });

    //QUERIES
    const lectureQuery = useLectureQuery(lectureId, loggedIn ? true : false);

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
                        lecture,
                        lectureId,
                    }}
                />
            </div>
        );
    }

    //primero espero a obtener las lectures extras
    if (!gotLectures) {
        return (
            <div className="lectureScreen">
                <Spinner
                    id="spinner-lectureScreen"
                    animation="border"
                    role="status"
                >
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p style={{ color: "white" }}>Cargando Lecciones...</p>
            </div>
        );
    }

    //dentro del array de lectures busco la lecture actual
    lecture = lectures.find((lecture) => {
        return lecture.lectureId === lectureId;
    });

    //TODO mostrar algo en caso de falla de query
    if (
        outCtx.allLecturesDataQuery.status === "error" ||
        lectureQuery.isError
    ) {
        console.error("hubo un error con las queries");
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
                    lecture,
                    lectureId,
                }}
            />
        ) : (
            <Spinner />
        );
    }
};

export default LectureRoute;
