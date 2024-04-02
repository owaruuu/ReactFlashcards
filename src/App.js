import "./App.css";
import "./Styles/Homepage.css";
import Header from "./components/Header/Header.js";
import Main from "./components/Main.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppProvider } from "./context/AppContext";
import svg from "./svg/cherry-blossom-petal.svg";

function App() {
    const linkedin = (
        <span>
            © por{" "}
            <a
                href="https://www.linkedin.com/in/josuemarquez/"
                target="_blank"
                rel="noopener noreferrer"
            >
                Josue Marquez
            </a>{" "}
            2023-2024.
        </span>
    );

    return (
        <AppProvider>
            <div className="App">
                <Header />
                <Main />
                <div className="divider">
                    <img className="logo" src={svg}></img>
                </div>
                <footer>{linkedin}</footer>
            </div>
        </AppProvider>
    );
}

export default App;
