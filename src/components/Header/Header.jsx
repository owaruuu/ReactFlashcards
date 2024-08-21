import "./Styles/Header.css";
import { useLocation, useNavigate } from "react-router-dom";
import LoginHeader from "./LoginHeader";
import TextButton from "../Buttons/TextButton";
import SmallText from "../Misc/SmallText";

const Header = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/");
    };

    function handleGoBack() {
        navigate("/lectures");
    }

    function handleGoToKanji() {
        navigate("/lectures/kanji");
    }

    const location = useLocation();
    const inKanji = location.pathname.includes("kanji");

    return (
        <header className="header">
            <h1 className="pageTitle" onClick={handleClick}>
                -Renshuu-
            </h1>
            <div className="kanjiButton">
                <TextButton
                    small
                    content={
                        inKanji ? "Volver a sets normales" : "Ir a sets Kanji"
                    }
                    onClick={inKanji ? handleGoBack : handleGoToKanji}
                />
                {!inKanji && <SmallText content="Beta!" />}
            </div>
            <LoginHeader />
        </header>
    );
};

export default Header;
