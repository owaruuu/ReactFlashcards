import React, { useEffect, useContext } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import SakuraSVG from "../svg/cherry-blossom-petal.svg";
import { AppContext } from "../context/AppContext";
import { getUserProgress } from "../aws/aws";

const Root = () => {
    const cognito = useLoaderData(); //antes de renderizar, obtengo token payload
    const loggedIn = cognito.value !== -1 && cognito.value !== 0;
    const { dispatch } = useContext(AppContext);

    //Reviso mi estado de login al cargar
    useEffect(() => {
        const loginStatus = async () => {
            dispatch({ type: "SET_INIT", payload: true });
            //si la respuesta es -1 significa que hubo un problema con el server
            if (cognito.value === -1) {
                // dispatch({ type: "SET_COGNITO_ERROR", payload: true });
                dispatch({ type: "SET_SERVER_ERROR", payload: true });
                dispatch({
                    type: "SET_LOGIN_CONTROL_MSG",
                    payload: "Server error, try refreshing the page.",
                });
                return;
            }

            //esto significa que no estoy logeado y no debo hacer nada mas
            if (cognito.value === 0) {
                //console.log("no estoy logeado");
                return;
            }

            //si llego aca significa que tengo el payload
            dispatch({
                type: "SET_USER",
                payload: {
                    userName: cognito.value.email,
                },
            });

            dispatch({ type: "SET_LOG_STATUS", payload: true });

            const progress = await getUserProgress();

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
            <div className="main">
                <Outlet context={{ loggedIn }} />
            </div>
            <div className="divider">
                <img className="logo" src={SakuraSVG}></img>
            </div>
            <Footer />
        </div>
    );
};

export default Root;
