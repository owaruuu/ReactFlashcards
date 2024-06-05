import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./Fonts.css";
import { AppProvider } from "./context/AppContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { connectCognito } from "./aws/aws";
import ErrorPage from "./error-page";

import Root from "./routes/Root";
import LoggedInRoute from "./routes/LoggedInRoute";
import LoggedOutRoute from "./routes/LoggedOutRoute";
import Login from "./routes/Login";
import SignupForm from "./routes/SignupForm";
import Signup from "./routes/Signup";
import ConfirmationCode from "./routes/ConfirmationCode";

import LectureList from "./components/LectureList/LectureList";
import LectureScreen from "./components/LectureScreen/LectureScreen";
import UserPanelScreen from "./components/UserPanel/UserPanelScreen";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <LectureList /> },
            {
                path: "/login",
                element: <LoggedOutRoute element={<Login />} />,
                loader: connectCognito,
            },
            {
                path: "/register",
                element: <LoggedOutRoute element={<Signup />} />,
                loader: connectCognito,
                id: "register",
                children: [
                    { index: true, element: <SignupForm /> },
                    {
                        path: "/register/confirmation",
                        element: <ConfirmationCode />,
                    },
                ],
            },
            {
                path: "/lectures/:lectureId",
                element: <LectureScreen />,
            },
            {
                path: "/profile",
                element: <LoggedInRoute element={<UserPanelScreen />} />,
            },
        ],
    },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AppProvider>
                <RouterProvider router={router} />
            </AppProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
