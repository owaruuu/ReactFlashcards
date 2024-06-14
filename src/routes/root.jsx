import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import SakuraSVG from "../svg/cherry-blossom-petal.svg";
import { AppContext } from "../context/AppContext";
import { Spinner } from "react-bootstrap";

const Root = () => {
    const { init } = useContext(AppContext);

    return (
        <div className="App">
            <Header />
            <div className="main">{init ? <Outlet /> : <Spinner />}</div>
            <div className="divider">
                <img className="logo" src={SakuraSVG}></img>
            </div>
            <Footer />
        </div>
    );
};

export default Root;
