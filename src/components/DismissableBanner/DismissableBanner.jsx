import { useState, useEffect } from "react";
import DismissTimerHelper from "../Misc/DismissTimerHelper";
import "./styles/styles.css";

const DismissableBanner = (props) => {
    const [opacity, setOpacity] = useState(1);
    const [display, setDisplay] = useState("flex");
    const [startClosing, setStartClosing] = useState(false);

    const handleClose = () => {
        setStartClosing(true);
        setOpacity(0);
    };

    const hideBanner = () => {
        setDisplay("none");
    };

    return (
        <div
            className="dismissableBanner"
            style={{
                backgroundColor: props.bgColor,
                color: props.color,
                opacity: opacity,
                transition: [props.transition] + "s",
                display: display,
            }}
        >
            <div>
                {startClosing && <DismissTimerHelper hideFunc={hideBanner} />}
            </div>
            <p>{props.text}</p>
            <button
                onClick={handleClose}
                style={{ backgroundColor: props.bgColor, color: props.color }}
            >
                x
            </button>
        </div>
    );
};

export default DismissableBanner;
