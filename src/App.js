import "./App.css";
// import { useState } from "react";
import { RegisterForm } from "./components/RegisterForm.js";
import { LoginForm } from "./components/LoginForm.js";
import Main from "./components/Main.js";

import { AppProvider } from "./context/AppContext";

function App() {
    // const handleSave = () => {
    //     //Cada cierto tiempo deberia salvar lo que tengo en el local storage
    //     //a la base de datos
    // };

    // const handleLogin = (event) => {
    //     event.preventDefault();
    //     console.log("login");

    //     //Agregar axios o algo para llamar a mi server api

    // };

    return (
        <AppProvider>
            <div className="App">
                <header className="header">
                    <h1>flashcards test</h1>
                    <p className="save">saving</p>
                    <p className="not-logged">not logged in</p>
                </header>
                <hr></hr>
                <Main />
                <hr></hr>
                <div className="forms">
                    <RegisterForm />
                    <LoginForm />
                </div>
                <hr></hr>
                <footer className="footer">by josue marquez</footer>
            </div>
        </AppProvider>
    );
}

export default App;
