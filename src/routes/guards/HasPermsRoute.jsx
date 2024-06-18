import React from "react";
import { useOutletContext, useParams, Link } from "react-router-dom";

const HasPermissionRoute = ({ element }) => {
    const { perms } = useOutletContext();
    const { lectureId } = useParams();

    if (!perms.includes(lectureId)) {
        return (
            <div className="lectureScreen">
                <p>No tienes permiso para ver esta leccion.</p>
                <Link to="/lectures">Volver a lista de lecciones</Link>
            </div>
        );
    }

    return element;
};

export default HasPermissionRoute;
