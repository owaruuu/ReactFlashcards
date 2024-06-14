import React from "react";
import { useContext, useState } from "react";
import { useQueryClient } from "react-query";
import { useLectureQuery } from "../hooks/useUserDataQuery";
import { AppContext } from "../context/AppContext";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import DismissableBanner from "../components/DismissableBanner/DismissableBanner";

const LectureRoute = () => {
    const [tab, setTab] = useState("japanese");
    const outCtx = useOutletContext();
    const { loggedIn, lectures, gotLectures } = useContext(AppContext);
    const { lectureId } = useParams();

    //QUERIES
    const lectureQuery = useLectureQuery(lectureId, loggedIn ? true : false);
    console.log(
        "🚀 ~ LectureRoute ~ lectureQuery: all data for a certain lecture",
        lectureQuery
    );

    if (loggedIn && !gotLectures) {
        return (
            <div className="lectureScreen">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    const lecture = lectures.find((lecture) => {
        return lecture.lectureId === lectureId;
    });

    //TODO mostrar algo en caso de falla de query

    //mostrar hijos solo cuando termine de obtener la informacion del lecture
    if (loggedIn) {
        console.log("here");
        return outCtx.userDataQuery.status === "success" ||
            lectureQuery.isRefetching === false ? (
            <Outlet context={{ tab, setTab, lectureQuery }} />
        ) : (
            <Spinner />
        );
    }

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
            <h2 id="title" className="lectureTitle" string={lecture?.name}>
                {lecture?.name}
            </h2>

            <Outlet context={{ tab, setTab, lectureQuery }} />
        </div>
    );
};

export default LectureRoute;
