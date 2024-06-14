import React from "react";
import { Navigate, useOutletContext } from "react-router-dom";

const LoggedOutRoute = ({ element }) => {
    //si tengo credenciales validas redirect a home
    // ej: si intento ingresar a /login mientras tengo una sesion activa deberia devolverme a la homepage
    const { loggedIn } = useOutletContext();

    return loggedIn ? <Navigate to="/" replace /> : element;
};

export default LoggedOutRoute;
