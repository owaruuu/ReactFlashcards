import { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { logoutUser } from "../../../aws/aws";
import { lectures } from "../../../data/lectures";
import Spinner from "react-bootstrap/Spinner";
import LogoutModal from "./LogoutModal";
import { useNavigate } from "react-router-dom";

const LoginControls = (props) => {
    const {
        dispatch,
        isTakingTest,
        cognito,
        cognitoError,
        dbError,
        init,
        loggedIn,
        LoginControlErrorMessage,
        serverError,
    } = useContext(AppContext);
    const [showModal, setShowModal] = useState(false);
    const [button, setButton] = useState(null);

    const navigate = useNavigate();

    const handleUserPanelClick = () => {
        if (isTakingTest) {
            setButton("userPanel");
            setShowModal(true);
        } else {
            changeToUserPanel();
        }
    };

    const changeToUserPanel = () => {
        // dispatch({
        //     type: "CHANGE_SCREEN",
        //     payload: { currentScreen: "userPanel" },
        // });
        navigate("/userpanel");
        dispatch({ type: "SET_IS_TAKING_TEST", payload: false });
    };

    const handleLogoutClick = (state) => {
        if (state) {
            setButton("logout");
        }

        setShowModal(state);
    };

    const logout = async () => {
        try {
            await logoutUser();
            dispatch({
                type: "CHANGE_SCREEN",
                payload: { currentScreen: "main" },
            });
            dispatch({ type: "SET_LOG_STATUS", payload: false });
            dispatch({ type: "SET_USER", payload: { currentProgress: null } });
            dispatch({ type: "SET_IS_TAKING_TEST", payload: false });
            dispatch({ type: "SET_LECTURES", payload: lectures });
            dispatch({ type: "SET_LECTURES_FLAG", payload: false });
        } catch (error) {
            console.log(
                "🚀 ~ file: LoginControls.js:23 ~ logout ~ error:",
                error
            );
            alert("Logout failed, server is probably down, try again later.");
        }
    };

    const loggedInControls = (
        <div className="accountButtons">
            <button
                className="logoutButton"
                onClick={() => handleLogoutClick(true)}
            >
                logout
            </button>
            <div className="username" onClick={handleUserPanelClick}>
                {props.userName}
            </div>
            <LogoutModal
                visible={showModal}
                hideFunc={() => handleLogoutClick(false)}
                logoutFunc={logout}
                userPanelFunc={changeToUserPanel}
                buttonClicked={button}
            />
        </div>
    );

    const loggedOutControls = (
        <>
            <button
                className="registerButton"
                onClick={
                    () => navigate("/register")
                    // dispatch({
                    //     type: "CHANGE_SCREEN",
                    //     payload: {
                    //         currentScreen: "register",
                    //     },
                    // })
                }
            >
                Register
            </button>
            <button
                className="loginButton"
                onClick={
                    () => navigate("/login")
                    // dispatch({
                    //     type: "CHANGE_SCREEN",
                    //     payload: {
                    //         currentScreen: "login",
                    //     },
                    // })
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
