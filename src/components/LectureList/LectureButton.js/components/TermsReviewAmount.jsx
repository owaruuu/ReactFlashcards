import React from "react";
import { Spinner } from "react-bootstrap";

const TermsReviewAmount = (props) => {
    if (props.status === "loading") {
        return <Spinner size="sm" />;
    }
    // console.log("🚀 ~ TermsReviewAmount ~  props.data:", props.data);

    let japaneseAmount =
        props.data?.[props.id]?.japanese_session?.terms?.length;
    let spanishAmount = props.data?.[props.id]?.spanish_session?.terms?.length;

    japaneseAmount = japaneseAmount ? japaneseAmount : 0;
    spanishAmount = spanishAmount ? spanishAmount : 0;

    return <span> {japaneseAmount + spanishAmount} terminos.</span>;
};

export default TermsReviewAmount;
