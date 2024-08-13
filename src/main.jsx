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
import KanjiSetRoute from "./routes/KanjiSetRoute";
import TermListView from "./routes/views/TermListView";
import UserPanelView from "./routes/views/UserPanelView";
import TestRoute from "./routes/TestRoute";
import FlashCardView from "./routes/views/FlashCardView";
import HasActiveStudySession from "./routes/guards/HasActiveStudySession";
import GotPermissionsSuspense from "./routes/suspenses/GotPermissionsSuspense";
import TestView from "./routes/views/TestView";
import LastResultView from "./routes/views/LastResultView";
import HighScoreView from "./routes/views/HighScoreView";
import TryTestView from "./routes/views/TryTestView";
import IsTakingTest from "./routes/guards/IsTakingTest";
import KanjiSetsListView from "./routes/views/KanjiSetsListView";
import KanjisListView from "./routes/views/KanjisListView";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        loader: connectCognito, //intento obtener credenciales
        // shouldRevalidate: () => false, //preview revalidation pero puedo aun obligarlo con 'revalidator.revalidate()'
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
                element: <GotPermissionsSuspense />, // return <LecturesRoute perms={{ data: perms.data }} />
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
                        path: "kanji",
                        element: <LectureListView isKanjiView />,
                        // element: <KanjiSetsListView />,
                    },
                    {
                        path: "kanji/:lectureId",
                        element: (
                            <HasPermissionRoute
                                element={<LectureRoute isKanjiView />}
                            />
                        ),
                        children: [
                            {
                                index: true,
                                element: <TermListView />,
                            },
                        ],
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
                                element: (
                                    <LoggedInRoute element={<TestRoute />} />
                                ),
                                //ruta que contiene logica y estado, muestra pantalla con un outlet, muestra el titulo de la lecture
                                children: [
                                    {
                                        //index
                                        path: "/lectures/:lectureId/test/",
                                        element: <TestView />,
                                        //vista que muestra el main screen de la prueba, con las informacion y botones
                                    },
                                    {
                                        path: "/lectures/:lectureId/test/try",
                                        element: (
                                            <IsTakingTest
                                                element={<TryTestView />}
                                            />
                                        ),
                                        //vista que muestra la prueba y sus pantallas
                                    },
                                    {
                                        path: "/lectures/:lectureId/test/last-attempt",
                                        element: <LastResultView />,
                                        //vista que muesta el ultimo intento
                                    },
                                    {
                                        path: "/lectures/:lectureId/test/high-score",
                                        element: <HighScoreView />,
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
export const version = "0.3.1 kanji study function";
console.log(`version - ${version}`);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AppProvider>
                <RouterProvider router={router} />
            </AppProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
