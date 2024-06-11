import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./Fonts.css";
import { AppProvider } from "./context/AppContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { connectCognito, getExtraPerms } from "./aws/aws";
import ErrorPage from "./error-page";

import Root from "./routes/Root";
import LoggedInRoute from "./routes/guards/LoggedInRoute";
import LoggedOutRoute from "./routes/guards/LoggedOutRoute";
import Login from "./routes/Login";
import SignupForm from "./routes/SignupForm";
import Signup from "./routes/Signup";
import ConfirmationCode from "./routes/ConfirmationCode";

import Lectures from "./routes/Lectures";
import LectureList from "./components/LectureList/LectureList";
import LectureScreen from "./components/LectureScreen/LectureScreen";
import ReviewScreen from "./components/ReviewScreen/ReviewScreen";
import UserPanelScreen from "./components/UserPanel/UserPanelScreen";

import { Navigate } from "react-router-dom";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HasPermsRoute from "./routes/guards/HasPermsRoute";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        loader: connectCognito, //intento obtener credenciales
        //loader lecciones gratis
        children: [
            {
                index: true,
                element: <Navigate to="/lectures" replace />,
            },
            {
                path: "/lectures",
                element: <Lectures />,
                loader: getExtraPerms,
                children: [
                    {
                        index: true,
                        element: <LectureList />,
                    },
                    {
                        path: "/lectures/:lectureId",
                        element: <HasPermsRoute element={<LectureScreen />} />,
                        //cuando hago click en el boton 'repaso' ocupar el lenguaje para elegir a que direccion ir
                    },
                    {
                        path: "/lectures/:lectureId/japanese-session",
                        element: <ReviewScreen language={"japanese"} />,
                        //que pasa cuando ingreso directamente pero no tengo sesion ?
                    },
                    {
                        path: "/lectures/:lectureId/spanish-session",
                        element: <ReviewScreen language={"spanish"} />,
                    },
                    // /lectures/:lectureId/jp-session

                    // /lectures/:lectureId/jp-session
                ],
            },
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
