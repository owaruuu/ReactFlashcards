import React, { useEffect, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import ReviewView from "../views/ReviewView";

const HasActiveStudySession = (props) => {
    const { lectureQuery, lecture } = useOutletContext();
    const { lang } = useParams();
    const [activeStudySession, setActiveStudySession] = useState(0);

    useEffect(() => {
        const termsIds = lectureQuery?.data?.data?.[`${lang}_session`]?.terms;
        //verificar que tengo ids en esta sesionasdas

        if (!termsIds) {
            return setActiveStudySession(-1);
        }

        if (termsIds.length === 0) {
            setActiveStudySession(-1);
        } else {
            setActiveStudySession(1);
        }
    }, []);

    if (
        lang !== "japanese" &&
        lang !== "spanish" &&
        lang !== "recognize" &&
        lang !== "write"
    ) {
        throw new Error("Wrong Lang");
    }

    return activeStudySession === 1 ? (
        <ReviewView isKanjiView={props.isKanjiView ? true : false} />
    ) : activeStudySession === -1 ? (
        <div className="lectureScreen">
            <p>
                No tienes una sesion activa para esta Leccion con este lenguage
            </p>
            <Link to={`/lectures/${lecture.lectureId}`}>Volver a Leccion.</Link>
        </div>
    ) : (
        <div>HasActiveStudySession</div>
    );
};

export default HasActiveStudySession;
