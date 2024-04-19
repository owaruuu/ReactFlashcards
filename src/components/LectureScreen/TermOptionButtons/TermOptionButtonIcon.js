import "./Styles/TermOptionButtonIcon.css";
import React from "react";
import { HiOutlineStar } from "react-icons/hi2";
import { HiStar } from "react-icons/hi2";
import { BiSolidHide } from "react-icons/bi";
import { BiHide } from "react-icons/bi";

const TermOptionButtonVisual = (props) => {
    // console.log("🚀 ~ TermOptionButtonVisual ~ props:", props.selected);
    if (props.star) {
        return props.selected == "highlighted" ? (
            <HiStar className="star-checked" />
        ) : (
            <HiOutlineStar />
        );
    }

    return props.selected == "muted" ? (
        <BiSolidHide className="mute-checked" />
    ) : (
        <BiHide />
    );
};

export default TermOptionButtonVisual;
