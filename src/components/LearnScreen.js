import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const LearnScreen = () => {
    const { dispatch, appState } = useContext(AppContext);
    console.log(
        "🚀 ~ file: LearnScreen.js:6 ~ LearnScreen ~ appState:",
        appState
    );
    return (
        <div>
            <p> learning ! </p>
        </div>
    );
};

export default LearnScreen;
