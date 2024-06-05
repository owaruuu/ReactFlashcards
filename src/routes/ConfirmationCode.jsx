import React from "react";
import { useRouteLoaderData } from "react-router-dom";

const ConfirmationCode = () => {
    const data = useRouteLoaderData("register");
    console.log("🚀 ~ ConfirmationCode ~ data:", data);
    return <div>ConfirmationCode</div>;
};

export default ConfirmationCode;
