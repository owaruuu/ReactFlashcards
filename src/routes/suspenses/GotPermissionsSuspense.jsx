import React from "react";
import LecturesRoute from "../LecturesRoute";
import { Await, useLoaderData, useAsyncError } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const GotPermissionsSuspense = () => {
    let data = useLoaderData();
    // console.log("🚀 ~ GotPermissionsSuspense ~ data:", data);

    return (
        <React.Suspense
            fallback={
                <>
                    <Spinner id="spinner-main" />
                    <p style={{ color: "white" }}>Cargando Permisos...</p>
                </>
            }
        >
            <Await resolve={data.response} errorElement={<PermsError />}>
                {({ data }) => {
                    const permsData = {
                        access: data.access || [],
                        kanjiAccess: data.kanjiAccess || [],
                    };
                    // console.log("🚀 ~ GotPermissionsSuspense ~ data:", data);
                    return <LecturesRoute perms={permsData} />;
                }}
            </Await>
        </React.Suspense>
    );
};

function PermsError() {
    const error = useAsyncError();
    return <LecturesRoute perms={{ error, access: [], kanjiAccess: [] }} />;
}

export default GotPermissionsSuspense;
