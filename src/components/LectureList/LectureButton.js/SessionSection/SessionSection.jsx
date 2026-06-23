import React from "react";
import { PiStackOverflowLogoFill } from "react-icons/pi";
import { FaClock } from "react-icons/fa6";
import TermsReviewAmount from "../components/TermsReviewAmount.jsx";
import ReviewSessionTime from "../components/ReviewSessionTime.jsx";

const SessionSection = ({ allLecturesDataQueryStatus, amount, timeDiff }) => {
    return (
        <div className="sessions">
            <div className="amount">
                <PiStackOverflowLogoFill /> :
                <TermsReviewAmount
                    status={allLecturesDataQueryStatus}
                    amount={amount}
                ></TermsReviewAmount>
            </div>
            <div className="lastReview">
                <FaClock /> :{" "}
                <ReviewSessionTime
                    status={allLecturesDataQueryStatus}
                    diff={timeDiff}
                ></ReviewSessionTime>
            </div>
        </div>
    );
};

export default SessionSection;
