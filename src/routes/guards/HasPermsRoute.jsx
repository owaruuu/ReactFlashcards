import React, { useContext } from "react";
import { useOutletContext, useParams, Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const HasPermissionRoute = ({ element, isKanjiView }) => {
    const { perms } = useOutletContext();
    const { lectures, kanjiSets } = useContext(AppContext);
    const { lectureId } = useParams();

    let lecture;

    //TODO Mejorar logica
    if (isKanjiView) {
        lecture = kanjiSets.find((lecture) => {
            return lecture.lectureId === lectureId;
        });
    } else {
        lecture = lectures.find((lecture) => {
            return lecture.lectureId === lectureId;
        });
    }

    if (!perms.includes(lectureId) || !lecture) {
        return (
            <div className="lectureScreen">
                <p>No tienes permiso para ver esta leccion.</p>
                <Link to={isKanjiView ? "/lectures/kanji" : "/lectures"}>
                    Volver a lista de lecciones
                </Link>
            </div>
        );
    }

    return React.cloneElement(element, { lecture });
};

export default HasPermissionRoute;
