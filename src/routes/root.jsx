import React, { useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Outlet, useLoaderData } from "react-router-dom";
import { getUserProgress } from "../aws/aws";
import Footer from "../components/Footer";
import Header from "../components/Header/Header";
import SakuraSVG from "../svg/cherry-blossom-petal.svg";

import { Spinner } from "react-bootstrap";
import { trySetUser } from "../hooks/tempUtil";

const Root = () => {
    const cognito = useLoaderData(); //antes de renderizar, obtengo token payload
    const { dispatch, init, isTakingTest, user } = useContext(AppContext);
    console.log("🚀 ~ Root ~ cognito:", cognito);
    console.log("🚀 ~ Root ~ user:", user);
    console.log("🚀 ~ Root ~ isTakingTest:", isTakingTest);

    //Reviso mi estado de login al cargar
    useEffect(() => {
        const loginStatus = async () => {
            console.log("doing loginStatus");
            console.log("🚀 ~ loginStatus ~ cognito:", cognito);
            dispatch({ type: "SET_INIT", payload: true });

            const result = trySetUser(cognito, dispatch);
            console.log("🚀 ~ loginStatus ~ result:", result);

            if (result === false) {
                return;
            }

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
