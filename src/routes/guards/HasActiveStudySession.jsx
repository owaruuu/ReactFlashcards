import React, { useEffect, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import ReviewView from "../views/ReviewView";

const HasActiveStudySession = () => {
    const { lectureQuery, lectureId } = useOutletContext();
    const { lang } = useParams();
    const [activeStudySession, setActiveStudySession] = useState(0);

    useEffect(() => {
        const termsIds = lectureQuery.data.data[`${lang}_session`].terms;
        //verificar que tengo ids en esta sesion

        if (termsIds.length === 0 || !termsIds) {
            setActiveStudySession(-1);
        } else {
            setActiveStudySession(1);
        }
    }, []);

    return activeStudySession === 1 ? (
        <ReviewView />
    ) : activeStudySession === -1 ? (
        <div className="lectureScreen">
            <p>
                No tienes una sesion activa para esta Leccion con este lenguage
            </p>
            <Link to={`/lectures/${lectureId}`}>Volver a Leccion.</Link>
        </div>
    ) : (
        <div>HasActiveStudySession</div>
    );
};

export default HasActiveStudySession;
