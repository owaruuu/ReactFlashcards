import "./Styles/TermOptionButtonIcon.css";
import React from "react";
import { HiOutlineStar } from "react-icons/hi2";
import { HiStar } from "react-icons/hi2";
import { BiSolidHide } from "react-icons/bi";
import { BiHide } from "react-icons/bi";

const TermOptionButtonVisual = (props) => {
    let termData = props.data?.terms;
    let modifier = "";

    if (termData) {
        if (termData[props.id]?.modifier.length > 0) {
            modifier = termData[props.id]?.modifier;
        }
    }

    if (props.star) {
        return modifier == "highlighted" ? (
            <HiStar className="star-checked" />
        ) : (
            <HiOutlineStar />
        );
    }

    return modifier == "muted" ? (
        <BiSolidHide className="mute-checked" />
    ) : (
        <BiHide />
    );
};

export default TermOptionButtonVisual;
