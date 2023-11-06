import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext.js";
import LectureList from "./LectureList.js";
import LectureScreen from "./LectureScreen.js";
import LearnScreen from "./LearnScreen/LearnScreen.js";
import LoginForm from "./LoginForm.js";
import RegisterForm from "./RegisterForm.js";
import { readFromLocal } from "../utils/utils";
import axios from "axios";

const api = axios.create({
    withCredentials: true, // Include credentials (cookies) in the request
});

//intenta hacer coneccion con el server para leer la base de datos
const tryConnection = async () => {
    try {
        const response = await api.get("http://localhost:3003/load");
        console.log(
            "🚀 ~ file: Main.js:15 ~ setInitialState ~ response:",
            response
        );

        return response.data;
    } catch (error) {
        console.log("error with server: ", error);
        return { msg: "error with server", value: false };
    }
};

//intenta leer la base de datos o el local storage para crear el state inicial
const setInitialState = async () => {
    const initialState = { progress: {} };

    //intentar leer desde base de datos
    const cloudSave = await tryConnection();

    if (!cloudSave.value) {
        //intentar leer locastorage
        console.log("intentado leer locastorage");
        const progressLocal = readFromLocal("currentProgress");

        initialState.progress = progressLocal;
    } else {
        console.log("si habia cloudsave");

        //set initial state to cloud save
        initialState.progress = JSON.parse(cloudSave.value);
    }

    return initialState;
};

const Main = () => {
    const [percentage, setPercentage] = useState(0);
    const { dispatch, appState } = useContext(AppContext);

    // const [appState, setAppState] = useState({ currentScreen: "lectures" });

    const calculatePercentage = () => {
        // const ammount =
    };

    // useEffect(() => {
    //     const asyncFunc = async () => {
    //         const result = await setInitialState();
    //         setProgress(result);
    //         dispatch({ type: "SET_LOADED", payload: true });
    //     };

    //     asyncFunc();
    // }, []);

    return (
        <main className="main">
            {appState.currentScreen === "main" && <LectureList />}
            {appState.currentScreen === "lecture" && (
                <LectureScreen></LectureScreen>
            )}
            {appState.currentScreen === "learn" && <LearnScreen></LearnScreen>}
            {appState.currentScreen === "login" && <LoginForm></LoginForm>}
            {appState.currentScreen === "register" && (
                <RegisterForm></RegisterForm>
            )}
        </main>
    );
};

export default Main;
