import "./Styles/Header.css";
import { useNavigate } from "react-router-dom";
import LoginHeader from "./LoginHeader";

const Header = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/");
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
