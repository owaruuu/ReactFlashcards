import React, { useContext } from "react";
import { useOutletContext, useParams, Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

// TODO: cambiar a que revise los permisos cada vez ?
const HasPermissionRoute = ({ element, isKanjiView }) => {
    // const { perms } = useOutletContext();
    // console.log("🚀 ~ HasPermissionRoute ~ perms:", perms);
    const { lectures, kanjiSets } = useContext(AppContext);
    console.log("🚀 ~ HasPermissionRoute ~ lectures:", lectures);
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

    // Simplified gate logic: if the lecture is not found, it means the user does not have permission to access it. In that case, we display a message and a link to go back to the list of lectures.
    if (!lecture) {
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
