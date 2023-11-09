import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main.js";

import "bootstrap/dist/css/bootstrap.min.css";

import { AppProvider } from "./context/AppContext";
import svg from "./svg/cherry-blossom-petal.svg";

function App() {
    return (
        <AppProvider>
            <div className="App">
                <Header />
                <hr></hr>
                <Main />
                {/* <hr></hr> */}
                <div className="divider">
                    <img className="logo" src={svg}></img>
                </div>
                <footer>
                    <span>
                        Ve este projecto en{" "}
                        <a
                            href="https://github.com/owaruuu/ReactFlashcards"
                            target="_blank"
                        >
                            Github
                        </a>
                        .
                    </span>
                    <span>
                        © por{" "}
                        <a
                            href="https://www.linkedin.com/in/josuemarquez/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Josue Marquez
                        </a>{" "}
                        2023.
                    </span>
                </footer>

                {/* <footer className="footer">by josue marquez</footer> */}
            </div>
        </AppProvider>
    );
}

export default App;
