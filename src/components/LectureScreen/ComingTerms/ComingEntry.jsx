import React from "react";

const ComingEntry = ({ entry }) => {
    return (
        <div className="comingEntry">
            <p className="comingEntryKey">{entry.key}:</p>{" "}
            <p className="comingEntryAmount">+{entry.amount}</p>
        </div>
    );
};

export default ComingEntry;
