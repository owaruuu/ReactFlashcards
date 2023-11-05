import LoginHeader from "./LoginHeader";
import InfoHeader from "./Header/InfoHeader";

const Header = () => {
    return (
        <header className="header">
            <h1>React Flashcards</h1>
            <InfoHeader />
            <LoginHeader />
        </header>
    );
};

export default Header;
