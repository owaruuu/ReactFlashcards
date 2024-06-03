import "./Styles/Main.css";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import LectureList from "./LectureList/LectureList.jsx";
import LectureScreen from "./LectureScreen/LectureScreen.jsx";
import LearnScreen from "./LearnScreen/LearnScreen.jsx";
import ReviewScreen from "./ReviewScreen/ReviewScreen.jsx";
import TestScreen from "./TestScreen/TestScreen.jsx";
import LoginForm from "./Forms/LoginForm.jsx";
import RegisterForm from "./Forms/RegisterForm.jsx";
import UserPanelScreen from "./UserPanel/UserPanelScreen.jsx";
import ConfirmationCodeSpecial from "./AccountCreation/ConfirmationCodeSpecial.jsx";

import { useQuery } from "react-query";
import { getAllUserData } from "../aws/userDataApi";

const Main = () => {
    // const { loggedIn } = useContext(AppContext);

    // useQuery({
    //     queryKey: ["allDataForUser"],
    //     queryFn: getAllUserData,
    //     refetchOnWindowFocus: false,
    //     refetchOnMount: false,
    //     retryOnMount: false,
    //     retry: 1,
    //     throwOnError: false,
    //     enabled: loggedIn ? true : false,
    //     onError: (error) => {
    //         // console.log("🚀 ~ LectureButtons ~ error:", error);
    //     },
    //     onSuccess: (data) => {
    //         // console.log("setie la data global desde main");
    //     },
    // });

    return <main className="main">main</main>;
};

export default Main;
