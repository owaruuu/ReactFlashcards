import React, { useEffect } from "react";
import SakuraSVG from "../../svg/cherry-blossom-petal.svg";

const DisappearingElement = (props) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            props.killFunc();
        }, 300);
        return () => clearTimeout(timer);
    }, []);
    const { state } = props;
    console.log("🚀 ~ DisappearingElement ~ element:", props.element);

    // let classNames = "disappear-element";
    let classNames =
        state === "highlighted"
            ? "disappear-element gold"
            : state === "muted"
            ? "disappear-element muted"
            : "disappear-element";
    classNames += props.direction;
    // {props.element}
    return (
        <div className={classNames}>
            <div className="backCard">
                {props.element}
                {/* <img className="logo" src={SakuraSVG}></img> */}
                {/* <div className="backCardDivider"></div> */}
            </div>
        </div>
    );
};

export default DisappearingElement;
