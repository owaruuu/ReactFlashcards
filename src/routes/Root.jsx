import React, { useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import {
    Outlet,
    useLoaderData,
    useLocation,
    useRevalidator,
} from "react-router-dom";
import { getUserClass, getUserProgress } from "../aws/aws";
import Footer from "../components/Footer";
import Header from "../components/Header/Header";
import SakuraSVG from "../svg/cherry-blossom-petal.svg";

import { Spinner } from "react-bootstrap";

const Root = () => {
    const cognito = useLoaderData(); //antes de renderizar, obtengo token payload
    const { dispatch, init, user } = useContext(AppContext);

    const location = useLocation();
    const revalidator = useRevalidator();

    // EFFECTS
    //reviso si aprete el logo para recargar la pagina
    useEffect(() => {
        //only when the navigation is towards '/' and is not the first, ie the key is anything but 'default'
        if (location.pathname === "/" && location.key !== "default") {
            revalidator.revalidate();
        }
    }, [location]);

    //Reviso mi estado de login al cargar
    useEffect(() => {
        const loginStatus = async () => {
            dispatch({ type: "SET_INIT", payload: true });

            //no tengo session
            if (cognito.value === 0) {
                return false;
            }
            if (cognito.value === -1) {
                // dispatch({ type: "SET_COGNITO_ERROR", payload: true });
                dispatch({ type: "SET_SERVER_ERROR", payload: true });
                dispatch({
                    type: "SET_LOGIN_CONTROL_MSG",
                    payload:
                        "Error con el servidor, intenta refrescando la pagina.",
                });

                return false;
            }

            dispatch({
                type: "SET_USER",
                payload: {
                    userName: cognito.value,
                },
            });

            dispatch({
                type: "SET_LOG_STATUS",
                payload: true,
            });

            const progress = await getUserProgress();
            // console.log("🚀 ~ loginStatus ~ progress:", progress);
            const userClass = await getUserClass();
            // console.log("🚀 ~ loginStatus ~ userClass:", userClass);
            // console.log("aaaaaaaaaaaaaaaaaaaaa");

            if (userClass) {
                dispatch({
                    type: "SET_USER",
                    payload: {
                        userClass: userClass,
                    },
                });
            }

            if (progress) {
                dispatch({
                    type: "SET_USER",
                    payload: {
                        currentProgress: JSON.parse(progress),
                    },
                });
            } else {
                //console.log("no hay db y deberia desactivar cosas");
                dispatch({ type: "SET_DB_ERROR", payload: true });
                dispatch({
                    type: "SET_LOGIN_CONTROL_MSG",
                    payload: "Database server error try refreshing the page.",
                });
            }
        };

        loginStatus();
    }, []);

    return (
        <div className="App">
            <Header />
            {/* <p style={{ color: "white" }}>{JSON.stringify(cognito)}</p> */}
            <div className="main">
                {init ? (
                    <Outlet />
                ) : (
                    <>
                        <Spinner />
                        <p style={{ color: "white" }}>
                            Cargando Credenciales...
                        </p>
                    </>
                )}
            </div>
            <div className="divider">
                <img className="logo" src={SakuraSVG}></img>
            </div>
            <Footer />
        </div>
    );
};

export default Root;
