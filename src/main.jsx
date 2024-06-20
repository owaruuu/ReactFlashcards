import React from "react";
import ReactDOM from "react-dom/client";

import "./App.css";
import "./Styles/Homepage.css";
import "bootstrap/dist/css/bootstrap.min.css";

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

import { Navigate } from "react-router-dom";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

//Routes
import LectureRoute from "./routes/LectureRoute";
import LectureListView from "./components/LectureList/LectureListView";
import HasPermissionRoute from "./routes/guards/HasPermsRoute";
import TermListView from "./routes/views/TermListView";
import UserPanelView from "./routes/views/UserPanelView";
import TestView from "./routes/views/TestView";
import FlashCardView from "./routes/views/FlashCardView";
import HasActiveStudySession from "./routes/guards/HasActiveStudySession";
import GotPermissionsSuspense from "./routes/suspenses/GotPermissionsSuspense";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        loader: connectCognito, //intento obtener credenciales
        //agregar loader lecciones gratis
        //*useEffect carga mi progreso
        //no renderizo los hijos hasta que el context cambia
        children: [
            {
                index: true,
                element: <Navigate to="/lectures" replace />,
            },
            {
                path: "/lectures",
                element: <GotPermissionsSuspense />,
                loader: getExtraPerms, //obtiene mis permisos de lecciones extras
                //*useEffect obtiene las lecciones extra
                //*useQuery obtiene data de avanze en las lecciones
                children: [
                    {
                        index: true,
                        element: <LectureListView />,
                        //ya tiene las lecciones gratis
                        //spinner para las extras
                    },
                    {
                        path: "/lectures/:lectureId",
                        element: (
                            <HasPermissionRoute element={<LectureRoute />} />
                        ),
                        //loader a userData
                        //si tiene el permiso espera a cargar la leccion extra
                        //primero obtiene la info de las lecciones y luego espera el query del user data sobre las lecciones
                        children: [
                            {
                                //index
                                path: "/lectures/:lectureId",
                                element: <TermListView />,
                            },
                            {
                                path: "/lectures/:lectureId/:lang/study-session",
                                element: (
                                    <LoggedInRoute
                                        element={<HasActiveStudySession />}
                                    />
                                ),
                            },
                            {
                                path: "/lectures/:lectureId/flashcards",
                                element: <FlashCardView />,
                            },
                            {
                                path: "/lectures/:lectureId/test",
                                element: <TestView />,
                                //ruta que contiene logica y estado, muestra pantalla con un outlet, muestra el titulo de la lecture
                                children: [
                                    {
                                        //index
                                        path: "/lectures/:lectureId/test/",
                                        //vista que muestra el main screen de la prueba, con las informacion y botones
                                    },
                                    {
                                        path: "/lectures/:lectureId/test/try",
                                        //vista que muestra la prueba y sus pantallas
                                    },
                                    {
                                        path: "/lectures/:lectureId/test/last-attempt",
                                        //vista que muesta el ultimo intento
                                    },
                                    {
                                        path: "/lectures/:lectureId/test/high-score",
                                        //vista que muestra el highscore
                                    },
                                ],
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
                element: <LoggedInRoute element={<UserPanelView />} />,
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
