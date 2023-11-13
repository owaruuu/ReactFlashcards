import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import Spinner from "react-bootstrap/Spinner";
import { logoutUser } from "../aws/aws";

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

    const logout = async () => {
        console.log("log out");
        try {
            const response = await logoutUser();
            dispatch({
                type: "CHANGE_SCREEN",
                payload: { currentScreen: "main" },
            });
            dispatch({ type: "SET_LOG_STATUS", payload: false });
            dispatch({ type: "SET_USER", payload: { currentProgress: null } });
        } catch (error) {
            console.log(
                "🚀 ~ file: LoginControls.js:23 ~ logout ~ error:",
                error
            );
            alert("Logout failed, server is probably down, try again later.");
        }
    };

    const loggedInControls = (
        <>
            <button className="logoutButton" onClick={logout}>
                Logout
            </button>
            <div className="username">{props.userName}</div>
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
