import "./App.css";
import "./Styles/Homepage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header.js";
import Main from "./components/Main.js";
import Footer from "./components/Footer.js";
import svg from "./svg/cherry-blossom-petal.svg";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppProvider } from "./context/AppContext";

function App() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <AppProvider>
                <div className="App">
                    <Header />
                    <Main />
                    <div className="divider">
                        <img className="logo" src={svg}></img>
                    </div>
                    <Footer />
                </div>
            </AppProvider>
        </QueryClientProvider>
    );
}

export default App;
