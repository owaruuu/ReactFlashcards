import LoginHeader from "./LoginHeader";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const Header = () => {
    const { dispatch } = useContext(AppContext);

    const handleClick = () => {
        // dispatch({ type: "CHANGE_SCREEN", payload: { currentScreen: "main" } });
        window.location.reload(false);
    };

    return (
        <header className="header">
            <h1 className="pageTitle" onClick={handleClick}>
                -Renshuu-
            </h1>
            <LoginHeader />
        </header>
    );
};

export default Header;
