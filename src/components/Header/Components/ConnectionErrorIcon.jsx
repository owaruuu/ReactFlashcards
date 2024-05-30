import React from "react";
import { RiSignalWifiErrorLine } from "react-icons/ri";
import { Tooltip } from "react-tooltip";

const ConnectionErrorIcon = () => {
    return (
        <>
            <div
                className="dbError"
                data-tooltip-id="db-error-tooltip"
                data-tooltip-content="Puede que tus cambios no se esten guardando."
                data-tooltip-place="left"
            >
                <RiSignalWifiErrorLine />
            </div>
            <Tooltip id="db-error-tooltip" isOpen={true} />
        </>
    );
};

export default ConnectionErrorIcon;
