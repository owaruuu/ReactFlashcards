import LoginHeader from "./LoginHeader";
import InfoHeader from "./Header/InfoHeader";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Header = () => {
    const { dispatch } = useContext(AppContext);

    const handleClick = () => {
        dispatch({ type: "CHANGE_SCREEN", payload: { currentScreen: "main" } });
    };

    return (
        <header className="header">
            <h1 className="pageTitle" onClick={handleClick}>
                React Flashcards
            </h1>
            {/* <InfoHeader /> */}
            <LoginHeader />
        </header>
    );
};

export default Header;
