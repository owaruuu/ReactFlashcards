import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { connectCognito, getUserProgress, quickScan } from "../aws/aws";
import Spinner from "react-bootstrap/Spinner";

const LoginControls = () => {
    const {
        dispatch,
        cognito,
        cognitoError,
        dbError,
        init,
        loggedIn,
        user,
        serverError,
    } = useContext(AppContext);

    const [errorMessage, setErrorMessage] = useState("");

    //intento hacer login
    useEffect(() => {
        const loginStatus = async () => {
            const response = await connectCognito();
            console.log(
                "🚀 ~ file: LoginControls.js:19 ~ loginStatus ~ response:",
                response
            );

            //independiente de la respuesta, cambiar el estado de Init
            dispatch({ type: "SET_INIT", payload: true });

            //si la respuesta es -1 significa que hubo un problema con el server
            if (response.value === -1) {
                // dispatch({ type: "SET_COGNITO_ERROR", payload: true });
                dispatch({ type: "SET_SERVER_ERROR", payload: true });
                setErrorMessage("Server error, try refreshing the page.");
                return;
            }

            if (response.value === -2) {
                dispatch({ type: "SET_COGNITO_ERROR", payload: true });
                setErrorMessage("Cognito server error, try again later.");
                return;
            }

            if (response.value === 0) {
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
                setErrorMessage(
                    "Database server error try refreshing the page."
                );
            }
        };

        loginStatus();
    }, []);

    const logout = () => {
        console.log("log out");
    };

    const errorMsg = <p>{errorMessage}</p>;

    const loggedInControls = (
        <>
            <button onClick={logout}>Logout</button>
            <div className="username">{user.userName}</div>
        </>
    );

    const loggedOutControls = (
        <>
            {/* <button
                onClick={() =>
                    dispatch({
                        type: "CHANGE_SCREEN",
                        payload: {
                            newScreen: "register",
                            newLecture: null,
                        },
                    })
                }
            >
                Register
            </button> */}
            <button
                onClick={() =>
                    dispatch({
                        type: "CHANGE_SCREEN",
                        payload: {
                            newScreen: "login",
                            newLecture: null,
                        },
                    })
                }
            >
                Login
            </button>
        </>
    );

    const controls = () => {
        if (!init) {
            return (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            );
        }

        if (serverError || dbError) {
            return errorMsg;
        }

        if (loggedIn) {
            return loggedInControls;
        } else {
            return loggedOutControls;
        }
    };

    return <>{controls()}</>;
};

export default LoginControls;
