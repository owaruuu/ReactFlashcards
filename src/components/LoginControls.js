import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";

import Spinner from "react-bootstrap/Spinner";

const LoginControls = (props) => {
    const {
        dispatch,
        cognito,
        cognitoError,
        dbError,
        init,
        loggedIn,
        LoginControlErrorMessage,
        serverError,
    } = useContext(AppContext);

    const logout = () => {
        console.log("log out");
    };

    const loggedInControls = (
        <>
            {/* <button onClick={logout}>Logout</button> */}
            <div className="username">{props.userName}</div>
        </>
    );

    const loggedOutControls = (
        <>
            <button
                className="registerButton"
                onClick={() =>
                    dispatch({
                        type: "CHANGE_SCREEN",
                        payload: {
                            currentScreen: "register",
                        },
                    })
                }
            >
                Register
            </button>
            <button
                className="loginButton"
                onClick={() =>
                    dispatch({
                        type: "CHANGE_SCREEN",
                        payload: {
                            currentScreen: "login",
                        },
                    })
                }
            >
                Login
            </button>
        </>
    );

    const setupControls = () => {
        if (!init) {
            return (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            );
        }

        if (serverError || dbError) {
            // console.log("sdasdasdasdas");
            return <p>{LoginControlErrorMessage}</p>;
        }

        if (loggedIn) {
            return loggedInControls;
        } else {
            return loggedOutControls;
        }
    };

    const controls = setupControls();
    return <>{controls}</>;
};

export default LoginControls;
