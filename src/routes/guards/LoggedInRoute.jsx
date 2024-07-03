import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const LoggedInRoute = ({ element }) => {
    //importar logica para revisar las credeciales del usuario
    //si estoy logeado el elemento si no mandar a una ruta especial que informe al usuario de su estado
    const { loggedIn } = useContext(AppContext);
    return loggedIn ? element : <Navigate to="/login" />;
};

export default LoggedInRoute;
