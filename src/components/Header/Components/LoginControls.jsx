import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";

const LoginControls = (props) => {
    const { dbError, init, loggedIn, loginControlErrorMessage, serverError } =
        useContext(AppContext);

    const navigate = useNavigate();

    const changeToUserPanel = () => {
        navigate("/profile");
    };

    const loggedInControls = (
        <div className="accountButtons">
            <div className="username" onClick={changeToUserPanel}>
                {props.userName}
            </div>
        </div>
    );

    const loggedOutControls = (
        <>
            <button
                className="registerButton"
                onClick={() => navigate("/register")}
            >
                Register
            </button>
            <button className="loginButton" onClick={() => navigate("/login")}>
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
            return <p>{loginControlErrorMessage}</p>;
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
