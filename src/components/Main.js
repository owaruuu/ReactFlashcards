import "./Styles/Main.css";
import { useContext } from "react";
import { AppContext } from "../context/AppContext.js";
import LectureList from "./LectureList/LectureList.js";
import LectureScreen from "./LectureScreen/LectureScreen.js";
import LearnScreen from "./LearnScreen/LearnScreen.js";
import ReviewScreen from "./ReviewScreen/ReviewScreen.js";
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
            {appState.currentScreen === "lecture-japanese" && (
                <LectureScreen defaultTab={"japanese"}></LectureScreen>
            )}
            {appState.currentScreen === "lecture-spanish" && (
                <LectureScreen defaultTab={"spanish"}></LectureScreen>
            )}
            {/* {appState.currentScreen === "learn" && <LearnScreen></LearnScreen>} */}
            {appState.currentScreen === "review" && (
                <LearnScreen isReview={true}></LearnScreen>
            )}
            {appState.currentScreen === "reviewV2Japanese" && (
                <ReviewScreen language={"japanese"}></ReviewScreen>
            )}
            {appState.currentScreen === "reviewV2Spanish" && (
                <ReviewScreen language={"spanish"}></ReviewScreen>
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
