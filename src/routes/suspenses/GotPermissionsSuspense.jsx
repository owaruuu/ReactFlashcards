import React from "react";
import LecturesRoute from "../LecturesRoute";
import { Await, useLoaderData, useAsyncError } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const GotPermissionsSuspense = () => {
    let data = useLoaderData();

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
                    return <LecturesRoute perms={data} />;
                }}
            </Await>
        </React.Suspense>
    );
};

function PermsError() {
    const error = useAsyncError();
    return <LecturesRoute perms={{ error, data: [] }} />;
}

export default GotPermissionsSuspense;
