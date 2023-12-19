import { useContext } from "react";
import { AppContext } from "../context/AppContext.js";
import LectureList from "./LectureList.js";
import LectureScreen from "./LectureScreen/LectureScreen.js";
import LearnScreen from "./LearnScreen/LearnScreen.js";
import TestScreen from "./TestScreen/TestScreen.js";
import LoginForm from "./Forms/LoginForm.js";
import RegisterForm from "./Forms/RegisterForm.js";
import UserPanelScreen from "./UserPanel/UserPanelScreen.js";

import ConfirmationCodeSpecial from "./AccountCreation/ConfirmationCodeSpecial.js";

const Main = () => {
    const { appState } = useContext(AppContext);

    return (
        <main className="main">
            {appState.currentScreen === "main" && <LectureList />}
            {appState.currentScreen === "lecture" && (
                <LectureScreen></LectureScreen>
            )}
            {appState.currentScreen === "learn" && <LearnScreen></LearnScreen>}
            {appState.currentScreen === "review" && (
                <LearnScreen isReview={true}></LearnScreen>
            )}
            {appState.currentScreen === "test" && <TestScreen />}
            {appState.currentScreen === "userPanel" && (
                <UserPanelScreen></UserPanelScreen>
            )}
            {appState.currentScreen === "login" && <LoginForm></LoginForm>}
            {appState.currentScreen === "register" && (
                <RegisterForm></RegisterForm>
            )}
            {appState.currentScreen === "confirmation" && (
                <ConfirmationCodeSpecial
                    title={"Check your email for a confirmation code."}
                    blocked={true}
                />
            )}
            {appState.currentScreen === "codeHelp" && (
                <ConfirmationCodeSpecial
                    title={
                        " Enter your email and confirmation code to complete registration."
                    }
                />
            )}
        </main>
    );
};

export default Main;
