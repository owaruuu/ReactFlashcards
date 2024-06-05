import React from "react";
import { Navigate, useLoaderData } from "react-router-dom";
// import { connectCognito } from "../aws/aws";

const LoggedOutRoute = ({ element }) => {
    //importar logica para revisar credenciales
    //si tengo credenciales validas redirect a home
    // ej: si intento ingresar a /login mientras tengo una sesion activa deberia devolverme a la homepage
    const data = useLoaderData();
    console.log("🚀 ~ LoggedOutRoute ~ data:", data);

    // const credentials = false;
    return data.error ? element : <Navigate to="/" replace />;
};

export default LoggedOutRoute;
