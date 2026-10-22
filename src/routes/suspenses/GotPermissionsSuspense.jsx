import React from "react";
import LecturesRoute from "../LecturesRoute";
import { Await, useLoaderData, useAsyncError } from "react-router-dom";
import { Spinner } from "react-bootstrap";

//UNUSED
const GotPermissionsSuspense = () => {
    let data = useLoaderData();
    // console.log("🚀 ~ GotPermissionsSuspense ~ data:", data);

    return (
        <React.Suspense
            fallback={
                <div className="loaderMain">
                    <Spinner id="spinner-main" />
                    <p style={{ color: "white" }}>Cargando Permisos...</p>
                </div>
            }
        >
            <Await resolve={data.response} errorElement={<PermsError />}>
                {({ data }) => {
                    const permsData = {
                        access: data.access || [],
                        kanjiAccess: data.kanjiAccess || [],
                    };
                    console.log(
                        "🚀 ~ GotPermissionsSuspense ~ permsData:",
                        permsData,
                    );
                    // console.log("🚀 ~ GotPermissionsSuspense ~ data:", data);
                    return <LecturesRoute />;
                }}
            </Await>
        </React.Suspense>
    );
};

function PermsError() {
    const error = useAsyncError();
    console.log("🚀 ~ PermsError ~ error:", error);
    return <LecturesRoute perms={{ error, access: [], kanjiAccess: [] }} />;
}

export default GotPermissionsSuspense;
