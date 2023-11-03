import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main.js";

import "bootstrap/dist/css/bootstrap.min.css";

import { AppProvider } from "./context/AppContext";

function App() {
    return (
        <AppProvider>
            <div className="App">
                <Header />
                <hr></hr>
                <Main />
                <hr></hr>
                <div className="forms">
                    {/* <RegisterForm />
                    <LoginForm /> */}
                </div>
                <hr></hr>
                <footer className="footer">by josue marquez</footer>
            </div>
        </AppProvider>
    );
}

export default App;
