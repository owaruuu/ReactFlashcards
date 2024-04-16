import React from "react";

const DateDiff = (props) => {
    let dateDiff = "nunca";

    if (props.lastSessionDate) {
        const today = new Date();
        const lastSessionDate = new Date(props.lastSessionDate);
        const timeDiff = today.getTime() - lastSessionDate.getTime();
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));

        if (days > 99) {
            dateDiff = `hace 99+ días`;
        } else if (days == 1) {
            dateDiff = `hace ${days} día`;
        } else if (days > 0 && days <= 99) {
            dateDiff = `hace ${days} días`;
        } else if (hours == 1) {
            dateDiff = `hace ${hours} hora`;
        } else if (hours > 0) {
            dateDiff = `hace ${hours} horas`;
        } else {
            dateDiff = `hace poco`;
        }
    }

    return <div className="date">estudiado: {dateDiff}</div>;
};

export default DateDiff;
