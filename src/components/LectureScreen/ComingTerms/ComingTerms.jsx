import React, { useState } from "react";
import ComingEntry from "./ComingEntry.jsx";
import { Tooltip } from "react-tooltip";
import { FaInfoCircle } from "react-icons/fa";
import { Button } from "react-bootstrap";
import InfoModal from "./InfoModal.jsx";

const ComingTerms = ({ comingTerms }) => {
    const [visible, setVisible] = useState(false);
    const hideFunc = () => setVisible(false);
    const showFunc = () => setVisible(true);
    const comingTermsList = comingTerms
        .slice(0, 4)
        .map((entry) => <ComingEntry key={entry.key} entry={entry} />);
    return (
        <>
            <p>Pronostico de terminos:</p>
            {comingTerms.length === 0 && (
                <p className="all-terms-available">
                    Todos los terminos estan disponibles.
                </p>
            )}
            <div className="entries">{comingTermsList}</div>
            <button className="info-icon" onClick={showFunc}>
                <FaInfoCircle />
            </button>
            <InfoModal
                visible={visible}
                hideFunc={hideFunc}
                showFunc={showFunc}
            />
        </>
    );
};

export default ComingTerms;
