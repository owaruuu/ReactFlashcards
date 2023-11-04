import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { connectCognito, getUserProgress, quickScan } from "../aws/aws";
import Spinner from "react-bootstrap/Spinner";

const LoginControls = () => {
    const { dispatch, cognito, cognitoError, init, loggedIn, user } =
        useContext(AppContext);

    const [loggedin, setLoggedin] = useState(false);
    const [userName, setUserNAme] = useState("");
    // const [loaded, setUserNAme] = useState(false);

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
                dispatch({ type: "SET_COGNITO_ERROR", payload: true });
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
            }
        };

        loginStatus();
    }, []);

    const errorMsg = <p>Server down. Trying again later.</p>;

    const loggedInControls = <button>{user.userName}</button>;

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

    return (
        <>
            {!init ? (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : cognitoError ? (
                errorMsg
            ) : loggedIn ? (
                loggedInControls
            ) : (
                loggedOutControls
            )}
        </>
    );
};

export default LoginControls;
