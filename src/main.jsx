import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./Fonts.css";
import { AppProvider } from "./context/AppContext";
import { QueryClient, QueryClientProvider } from "react-query";
import ErrorPage from "./error-page";

import Root from "./routes/root";
import Login from "./routes/login";
import LectureList from "./components/LectureList/LectureList";
import LectureScreen from "./components/LectureScreen/LectureScreen";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            { path: "/", element: <LectureList /> },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/lectures/:lectureId",
                element: <LectureScreen />,
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
