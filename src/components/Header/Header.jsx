import "./Styles/Header.css";
import { useNavigate, useRevalidator } from "react-router-dom";
import LoginHeader from "./LoginHeader";

const Header = () => {
    const navigate = useNavigate();
    const revalidator = useRevalidator();
    const handleClick = () => {
        navigate("/");
        // revalidator.revalidate();
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
