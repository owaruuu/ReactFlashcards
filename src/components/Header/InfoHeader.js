import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { saveUserProgress } from "../../aws/aws";
import { RiSignalWifiErrorLine } from "react-icons/ri";
import { Tooltip } from "react-tooltip";

/**
 * Se encarga de salvar el progreso a la DB
 * @returns
 */
const InfoHeader = () => {
    const saveDelay = 5;
    const {
        dispatch,
        loggedIn,
        user,
        needToSave,
        cognitoError,
        dbError,
        serverError,
    } = useContext(AppContext);
    const [timeSinceLastSave, setTimeSinceLastSave] = useState(0);
    const [saveError, setSaveError] = useState(false);
    const [info, setInfo] = useState("");

    const updateCounter = () => {
        setTimeSinceLastSave((lastTime) => lastTime + 1);
    };

    useEffect(() => {
        if (loggedIn) {
            setInfo("");
        }
    }, [loggedIn]);

    //ocupo un effect porque el intervalo necesita clean up
    useEffect(() => {
        const interval = setInterval(updateCounter, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        if (cognitoError) {
            return setInfo("Error with Database, trying again later...");
        }
    }, [cognitoError]);

    //esto se activa cada vez que cambio el timer
    useEffect(() => {
        const tryToSave = async () => {
            const response = await saveUserProgress(user.currentProgress);
            console.log(
                "🚀 ~ file: InfoHeader.js:33 ~ tryToSave ~ response:",
                response
            );

            if (!response.value) {
                setInfo(
                    "Server error, trying again in a few seconds, do NOT refresh the page..."
                );
                dispatch({ type: "SET_SAVE_FLAG", payload: true });
                // dispatch({ type: "SET_DB_ERROR", payload: true });
                setSaveError(true);
                return;
            }

            //necesito un caso para cuando no estoy logeado
            // if (response.value === -3) {
            //     dispatch({ type: "SET_LOG_STATUS", payload: false });
            //     setInfo("Credentials invalid, please login again");
            //     return;
            // }

            if (response.value === -2) {
                dispatch({ type: "SET_LOG_STATUS", payload: false });
                setInfo("Credentials invalid, please login again");
                setSaveError(true);
                return;
            }

            if (response.value === -1) {
                // dispatch({ type: "SET_DB_ERROR", payload: true });
                setSaveError(true);
                setInfo(
                    "Database error, trying again in a few seconds, do NOT refresh the page..."
                );
                dispatch({ type: "SET_SAVE_FLAG", payload: true });
                return;
            }
            //dependiendo de la respuesta puede que cambie el estado del save flag
            // dispatch({ type: "SET_DB_ERROR", payload: false });
            setSaveError(false);
            setInfo("Saved.");
        };

        //need to save es cambiado por los botones de learn
        if (timeSinceLastSave > saveDelay && needToSave) {
            console.log("el timer es mayor al threshold y hubieron cambios");
            setInfo("saving...");

            //reset timer
            setTimeSinceLastSave(0);
            //reset needToSave
            dispatch({ type: "SET_SAVE_FLAG", payload: false });

            //hacer put en db
            tryToSave();
        }
    }, [timeSinceLastSave]);

    const component = (
        <div className="infoHeader">
            <div>{info}</div>
            {/* <div>timer: {timeSinceLastSave}</div> */}
        </div>
    );

    return (
        <>
            {component}

            {saveError ? (
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
            ) : (
                ""
            )}
        </>
    );
};

export default InfoHeader;
