import React from "react";
import { HiOutlineStar } from "react-icons/hi2";
import { HiStar } from "react-icons/hi2";
import { BiSolidHide } from "react-icons/bi";
import { BiHide } from "react-icons/bi";

const TermOptionButton = (props) => {
    if (props.star) {
        return (
            <button>
                <HiOutlineStar></HiOutlineStar>
            </button>
        );
    }
    return (
        <button>
            <BiHide></BiHide>
        </button>
    );
};

export default TermOptionButton;
