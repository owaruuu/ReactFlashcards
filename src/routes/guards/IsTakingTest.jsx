import React from "react";
import { Navigate, useOutletContext } from "react-router-dom";

const IsTakingTest = (props) => {
    const { element } = props;

    //isTakingTest viene desde TestRoute, es un useState
    const { isTakingTest, lectureId } = useOutletContext();

    return isTakingTest ? (
        element
    ) : (
        <Navigate to={`/lectures/${lectureId}/test`} />
    );
};

export default IsTakingTest;
