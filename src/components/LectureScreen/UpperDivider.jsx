import React from "react";
import svg from "../../svg/cherry-blossom-petal.svg";

const UpperDivider = () => {
    return (
        <div
            className="upperDivider"
            style={{
                marginBottom: "9px",
            }}
        >
            <img
                className="upperLogo"
                src={svg}
                style={{
                    width: "68px",
                    top: "-26px",
                    marginLeft: "calc(50% - 34px)",
                }}
            ></img>
        </div>
    );
};

export default UpperDivider;
