import "./App.css";
// import { useState } from "react";
import { RegisterForm } from "./components/RegisterForm.js";
import { LoginForm } from "./components/LoginForm.js";
import TestComponent from "./components/TestComponent.js";

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
        <div className="App">
            <header className="header">
                <h1>flashcards test</h1>
                <p className="save">saving</p>
                <p className="not-logged">not logged in</p>
            </header>
            <hr></hr>
            <main className="main">
                <TestComponent />
            </main>
            <hr></hr>
            <div className="forms">
                <RegisterForm />
                <LoginForm />
            </div>
            <hr></hr>
            <footer className="footer">by josue marquez</footer>
        </div>
    );
}

export default App;
