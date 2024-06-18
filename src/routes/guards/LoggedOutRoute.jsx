import React from "react";
import { Navigate, useOutletContext } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
const LoggedOutRoute = ({ element }) => {
    //si tengo credenciales validas redirect a home
    // ej: si intento ingresar a /login mientras tengo una sesion activa deberia devolverme a la homepage
    // const { loggedIn } = useOutletContext();
    const { loggedIn } = useContext(AppContext);

    return loggedIn ? <Navigate to="/lectures" replace /> : element;
};

export default LoggedOutRoute;
