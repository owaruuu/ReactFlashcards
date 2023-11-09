import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";

const InfoHeader = (props) => {
    const { saveInfoMessage } = useContext(AppContext);

    return (
        <div className="infoHeader">
            <div>{saveInfoMessage}</div>
        </div>
    );
};

export default InfoHeader;
