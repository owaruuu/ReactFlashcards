import "./App.css";
import { useState } from "react";
import { RegisterForm } from "./components/RegisterForm.js";
import { LoginForm } from "./components/LoginForm.js";

function App() {
    // const handleSave = () => {
    //     //Cada cierto tiempo deberia salvar lo que tengo en el local storage
    //     //a la base de datos
    // };

    const handleChange = (id) => {
        //cada vez que algo cambie, deberia salvarlo al local storage
        console.log(id);
        let currentProgress = localStorage.getItem("currentProgress");
        console.log(
            "🚀 ~ file: App.js:14 ~ handleChange ~ currentProgress:",
            currentProgress
        );

        currentProgress = JSON.parse(currentProgress);

        if (currentProgress) {
            console.log("currentProgress existe");
            if (currentProgress[id]) {
                console.log(
                    "🚀 ~ file: App.js:24 ~ handleChange ~ currentProgress:",
                    currentProgress[id]
                );
                console.log("existe el id");
                currentProgress[id] = !currentProgress[id];
                console.log(
                    "🚀 ~ file: App.js:24 ~ handleChange ~ currentProgress:",
                    currentProgress
                );
                localStorage.setItem(
                    "currentProgress",
                    JSON.stringify(currentProgress)
                );
                setProgress(currentProgress);
                console.log("checkbox changed");
            }
        } else {
            currentProgress[id] = "true";
            console.log("currentProgress no existe");
        }
    };

    const handleLogin = (event) => {
        event.preventDefault();
        console.log("login");

        //Agregar axios o algo para llamar a mi server api
    };

    let currentProgress = localStorage.getItem("currentProgress");
    if (!currentProgress) {
        currentProgress = { 1: true, 2: false };
        localStorage.setItem(
            "currentProgress",
            JSON.stringify(currentProgress)
        );
    }
    currentProgress = JSON.parse(currentProgress);
    const [progress, setProgress] = useState(currentProgress);
    console.log("🚀 ~ file: App.js:59 ~ App ~ progress:", progress);

    return (
        <div className="App">
            <header className="header">
                <h1>flashcards test</h1>
                <p className="save">saving</p>
                <p className="not-logged">not logged in</p>
            </header>
            <hr></hr>
            <main className="main">
                <div>
                    <label className="label">Primera opcion</label>
                    <input
                        type="checkbox"
                        className="checkbox"
                        onChange={() => handleChange(1)}
                        id={1}
                        checked={progress[1]}
                    />
                </div>
                <div>
                    <label className="label">Segunda opcion</label>
                    <input
                        type="checkbox"
                        className="checkbox"
                        onChange={() => handleChange(2)}
                        id={2}
                        checked={false}
                    />
                </div>
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
