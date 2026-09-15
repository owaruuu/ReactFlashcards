import React from "react";
import { Spinner } from "react-bootstrap";

const StarAmount = ({ querySuccess, starredAmount }) => {
    // console.log("🚀 ~ StarAmount ~ querySuccess:", querySuccess);
    if (querySuccess === "error") {
        return "";
    }

    if (querySuccess === "pending") {
        return <Spinner size="sm" />;
    }

    if (!starredAmount) {
        starredAmount = 0;
    }

    return <>{starredAmount} estrellada</>;
};

export default StarAmount;
