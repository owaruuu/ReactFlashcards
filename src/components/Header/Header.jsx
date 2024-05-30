import LoginHeader from "./LoginHeader";
import "./Styles/Header.css";

const Header = () => {
    const handleClick = () => {
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
