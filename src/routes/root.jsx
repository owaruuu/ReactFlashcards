import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import SakuraSVG from "../svg/cherry-blossom-petal.svg";

const Root = () => {
    return (
        <div className="App">
            <Header />
            <div className="main">
                <Outlet />
            </div>
            <div className="divider">
                <img className="logo" src={SakuraSVG}></img>
            </div>
            <Footer />
        </div>
    );
};

export default Root;
