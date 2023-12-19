import { useEffect, useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import {
    connectCognito,
    getUserProgress,
    saveUserProgress,
} from "../../aws/aws";
import LoginControls from "./LoginControls";
import InfoHeader from "./InfoHeader";
import { RiSignalWifiErrorLine } from "react-icons/ri";
import { Tooltip } from "react-tooltip";

const LoginHeader = (props) => {
    const saveDelay = 5;

    const {
        dispatch,
        user,
        needToSave,
        saveError,
        loginControlErrorMessage,
        saveInfoMessage,
    } = useContext(AppContext);

    const [timeSinceLastSave, setTimeSinceLastSave] = useState(0);

    //actualizo el timer
    const updateCounter = () => {
        setTimeSinceLastSave((lastTime) => lastTime + 1);
    };

    //intervalo de 1 segundo
    useEffect(() => {
        const interval = setInterval(updateCounter, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    //reviso mi estado de login al cargar
    useEffect(() => {
        const loginStatus = async () => {
            const response = await connectCognito();

            //independiente de la respuesta, cambiar el estado de Init
            dispatch({ type: "SET_INIT", payload: true });

            //si la respuesta es -1 significa que hubo un problema con el server
            if (response.value === -1) {
                // dispatch({ type: "SET_COGNITO_ERROR", payload: true });
                dispatch({ type: "SET_SERVER_ERROR", payload: true });
                dispatch({
                    type: "SET_LOGIN_CONTROL_MSG",
                    payload: "Server error, try refreshing the page.",
                });
                return;
            }

            if (response.value === -2) {
                dispatch({ type: "SET_COGNITO_ERROR", payload: true });
                dispatch({
                    type: "SET_LOGIN_CONTROL_MSG",
                    payload: "Cognito server error, try again later.",
                });
                return;
            }

            //esto significa que no estoy logeado y no debo hacer nada
            if (response.value === 0) {
                console.log("no estoy logeado");
                return;
            }

            //si llego aca significa que tengo el payload

            dispatch({ type: "SET_LOG_STATUS", payload: true });

            dispatch({
                type: "SET_USER",
                payload: {
                    userName: response.value.email,
                },
            });

            //**obtener progreso desde db, usando el sub del token para filtrar**
            const sub = response.value.sub;

            const progress = await getUserProgress(sub);

            if (progress) {
                dispatch({
                    type: "SET_USER",
                    payload: {
                        currentProgress: JSON.parse(progress),
                    },
                });
            } else {
                console.log("no hay db y deberia desactivar cosas");
                dispatch({ type: "SET_DB_ERROR", payload: true });
                dispatch({
                    type: "SET_LOGIN_CONTROL_MSG",
                    payload: "Database server error try refreshing the page.",
                });
            }
        };

        loginStatus();
    }, []);

    //esto se activa cada vez que cambio el timer
    useEffect(() => {
        const tryToSave = async () => {
            console.log(
                "🚀 ~ file: LoginHeader.js:20 ~ LoginHeader ~ user:",
                user.currentProgress
            );
            const response = await saveUserProgress(user.currentProgress);

            if (!response.value) {
                dispatch({
                    type: "SET_SAVE_INFO_MSG",
                    payload:
                        "Server error, trying again in a few seconds, do NOT refresh the page...",
                });
                dispatch({ type: "SET_SAVE_FLAG", payload: true });
                // dispatch({ type: "SET_DB_ERROR", payload: true });
                dispatch({ type: "SET_SAVE_ERROR", payload: true });
                // setSaveError(true);
                return;
            }

            if (response.value === -2) {
                dispatch({ type: "SET_LOG_STATUS", payload: false });
                dispatch({
                    type: "SET_SAVE_INFO_MSG",
                    payload: "Credentials invalid, please login again",
                });

                dispatch({ type: "SET_SAVE_ERROR", payload: true });
                // setSaveError(true);
                return;
            }

            if (response.value === -1) {
                // dispatch({ type: "SET_DB_ERROR", payload: true });
                // setSaveError(true);
                dispatch({ type: "SET_SAVE_ERROR", payload: true });
                dispatch({
                    type: "SET_SAVE_INFO_MSG",
                    payload:
                        "Database error, trying again in a few seconds, do NOT refresh the page...",
                });
                dispatch({ type: "SET_SAVE_FLAG", payload: true });
                return;
            }

            // setSaveError(false);
            dispatch({ type: "SET_SAVE_ERROR", payload: false });
            dispatch({
                type: "SET_SAVE_INFO_MSG",
                payload: "Saved",
            });
            dispatch({ type: "SET_SAVE_TEST", payload: true });
        };

        //need to save es cambiado por los botones de learn
        if (timeSinceLastSave > saveDelay && needToSave) {
            dispatch({
                type: "SET_SAVE_INFO_MSG",
                payload: "Saving...",
            });

            //reset timer
            setTimeSinceLastSave(0);
            //reset needToSave
            dispatch({ type: "SET_SAVE_FLAG", payload: false });

            //hacer put en db
            tryToSave();
        }
    }, [timeSinceLastSave]);

    const connectionErrorIcon = (
        <>
            <div
                className="dbError"
                data-tooltip-id="db-error-tooltip"
                data-tooltip-content="
                 Your progress might not be saved."
                data-tooltip-place="left"
            >
                <RiSignalWifiErrorLine />
            </div>
            <Tooltip id="db-error-tooltip" isOpen={true} />
        </>
    );

    return (
        <div className="loginControls">
            <InfoHeader />
            <LoginControls
                errorMsg={loginControlErrorMessage}
                userName={user.userName}
            />
            {saveError ? connectionErrorIcon : ""}
        </div>
    );
};

export default LoginHeader;
