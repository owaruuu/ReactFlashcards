import React from "react";
import LecturesRoute from "../LecturesRoute";
import { Await, useLoaderData, useAsyncError } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const GotPermissionsSuspense = () => {
    let data = useLoaderData();
    console.log("🚀 ~ GotPermissionsSuspense ~ data:", data);
    return (
        <React.Suspense fallback={<Spinner />}>
            <Await resolve={data.perms} errorElement={<PermsError />}>
                {(perms) => {
                    console.log("🚀 ~ GotPermissionsSuspense ~ perms:", perms);
                    return <LecturesRoute perms={{ data: perms.data }} />;
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
