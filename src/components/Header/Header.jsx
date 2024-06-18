import LoginHeader from "./LoginHeader";
import "./Styles/Header.css";
import { useNavigate, useRevalidator } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const revalidator = useRevalidator();
    const handleClick = () => {
        // window.location.reload(false);
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
