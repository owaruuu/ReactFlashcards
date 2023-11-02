import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { connectCognito } from "../aws/aws";
import Spinner from "react-bootstrap/Spinner";

const LoginControls = () => {
    const { dispatch, cognito, cognitoError, init, loggedIn } =
        useContext(AppContext);
    console.log("🚀 ~ file: LoginControls.js:8 ~ LoginControls ~ init:", init);

    const [loggedin, setLoggedin] = useState(false);
    const [userName, setUserNAme] = useState("");
    // const [loaded, setUserNAme] = useState(false);

    //intento hacer login
    useEffect(() => {
        const loginStatus = async () => {
            const response = await connectCognito();

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

            setUserNAme(response.value.email);
        };

        loginStatus();
    }, []);

    const errorMsg = <p>Server down. Trying again later.</p>;

    const loggedInControls = <button>{userName}</button>;

    const loggedOutControls = (
        <>
            <button>register</button>
            <button>login</button>
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
