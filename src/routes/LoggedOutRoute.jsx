import React from "react";
import { Navigate } from "react-router-dom";

const LoggedOutRoute = ({ element }) => {
    //importar logica para revisar credenciales
    //si tengo credenciales validas redirect a home
    // ej: si intento ingresar a /login mientras tengo una sesion activa deberia devolverme a la homepage

    const credentials = false;
    return credentials ? <Navigate to="/" replace /> : element;
};

export default LoggedOutRoute;
