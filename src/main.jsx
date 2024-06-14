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
import ReviewScreen from "./routes/views/ReviewView";
import UserPanelScreen from "./components/UserPanel/UserPanelScreen";

import { Navigate } from "react-router-dom";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

//Routes
import LectureRoute from "./routes/LectureRoute";
import HasPermsRoute from "./routes/guards/HasPermsRoute";
import TermListView from "./routes/views/TermListView";
import ReviewView from "./routes/views/ReviewView";
import TestView from "./routes/views/TestView";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        loader: connectCognito, //intento obtener credenciales
        //loader lecciones gratis
        //*useEffect carga mi progreso
        //no renderizo los hijos hasta que el context cambia
        children: [
            {
                index: true,
                element: <Navigate to="/lectures" replace />,
            },
            {
                path: "/lectures",
                element: <Lectures />,
                loader: getExtraPerms, //obtiene mis permisos de lecciones extras
                //*useEffect obtiene las lecciones extra
                //*useQuery obtiene data de avanze en las lecciones
                children: [
                    {
                        index: true,
                        element: <LectureList />,
                        //ya tiene las lecciones gratis
                        //spinner para las extras
                    },
                    {
                        path: "/lectures/:lectureId",
                        element: <HasPermsRoute element={<LectureRoute />} />,
                        //loader a userData
                        //si tiene el permiso espera a cargar la leccion extra
                        children: [
                            {
                                path: "/lectures/:lectureId",
                                element: <TermListView />,
                            },
                            {
                                path: "/lectures/:lectureId/:lang/study-session",
                                element: <ReviewView />,
                                //necesito una sesion activa que solo tendre despues de cargar el query
                                //que pasa cuando ingreso directamente pero no tengo sesion de estudio ?
                            },
                            {
                                path: "/lectures/:lectureId/test",
                                element: <TestView />,
                            },
                        ],
                    },
                ],
            },
            {
                path: "/login",
                element: <LoggedOutRoute element={<Login />} />,
            },
            {
                path: "/register",
                element: <LoggedOutRoute element={<Signup />} />,
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
