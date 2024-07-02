import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import LoginControls from "./Components/LoginControls";
import ConnectionErrorIcon from "./Components/ConnectionErrorIcon";

const LoginHeader = () => {
    const { saveError } = useContext(AppContext);

    return (
        <div className="loginControls">
            <LoginControls />
            {saveError ? <ConnectionErrorIcon /> : ""}
        </div>
    );
};

export default LoginHeader;
