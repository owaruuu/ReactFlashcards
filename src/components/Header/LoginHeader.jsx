import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import LoginControls from "./Components/LoginControls";
import InfoHeader from "./Components/InfoHeader";
import ConnectionErrorIcon from "./Components/ConnectionErrorIcon";

const LoginHeader = () => {
    const { user, saveError, loginControlErrorMessage } =
        useContext(AppContext);

    return (
        <div className="loginControls">
            <InfoHeader />
            <LoginControls
                errorMsg={loginControlErrorMessage}
                userName={user.userName}
            />
            {saveError ? <ConnectionErrorIcon /> : ""}
        </div>
    );
};

export default LoginHeader;
