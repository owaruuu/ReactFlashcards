import { useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useLoaderData } from "react-router-dom";
import { getUserProgress } from "../../aws/aws";
import LoginControls from "./Components/LoginControls";
import InfoHeader from "./Components/InfoHeader";
import ConnectionErrorIcon from "./Components/ConnectionErrorIcon";

const LoginHeader = () => {
    const cognito = useLoaderData();

    const { dispatch, user, saveError, loginControlErrorMessage } =
        useContext(AppContext);

    //Reviso mi estado de login al cargar
    useEffect(() => {
        const loginStatus = async () => {
            //intento verificar si estoy logged in
            //si la respuesta es -1 significa que hubo un problema con el server
            if (cognito.value === -1) {
                // dispatch({ type: "SET_COGNITO_ERROR", payload: true });
                dispatch({ type: "SET_SERVER_ERROR", payload: true });
                dispatch({
                    type: "SET_LOGIN_CONTROL_MSG",
                    payload: "Server error, try refreshing the page.",
                });
                dispatch({ type: "SET_INIT", payload: true });
                return;
            }

            //esto significa que no estoy logeado y no debo hacer nada mas
            if (cognito.value === 0) {
                //console.log("no estoy logeado");
                dispatch({ type: "SET_INIT", payload: true });
                return;
            }

            //si llego aca significa que tengo el payload
            dispatch({
                type: "SET_USER",
                payload: {
                    userName: cognito.value.email,
                },
            });

            dispatch({ type: "SET_LOG_STATUS", payload: true });

            const progress = await getUserProgress();

            if (progress) {
                dispatch({
                    type: "SET_USER",
                    payload: {
                        currentProgress: JSON.parse(progress),
                    },
                });
            } else {
                //console.log("no hay db y deberia desactivar cosas");
                dispatch({ type: "SET_DB_ERROR", payload: true });
                dispatch({
                    type: "SET_LOGIN_CONTROL_MSG",
                    payload: "Database server error try refreshing the page.",
                });
            }

            //una vez haya terminado de hacer todo saco el spinner
            dispatch({ type: "SET_INIT", payload: true });
        };

        loginStatus();
    }, []);

    return (
        <div className="loginControls">
            <InfoHeader />
            <LoginControls
                errorMsg={loginControlErrorMessage}
                userName={user.userName}
            />
            {saveError ? <ConnectionErrorIcon /> : ""}
        </div>
    );
};

export default LoginHeader;
