import React from "react";
import { Spinner } from "react-bootstrap";

const TermsReviewAmount = (props) => {
    // console.log("🚀 ~ TermsReviewAmount ~ props.status:", props.status);
    // status siempre es 'success', en algun momento debi haber hecho cambios al codigo que solo muestra la lista cuando ya tengo la informacion
    // cambie loading a pending por el update de tanstack
    // if (props.status === "pending") {
    //     return <Spinner size="sm" style={{ color: "#532f00" }} />;
    // }

    // console.log("🚀 ~ TermsReviewAmount ~  props.data:", props.data);

    // let japaneseAmount =
    //     props.data?.[props.id]?.japanese_session?.terms?.length;
    // let spanishAmount = props.data?.[props.id]?.spanish_session?.terms?.length;

    // japaneseAmount = japaneseAmount ? japaneseAmount : 0;
    // spanishAmount = spanishAmount ? spanishAmount : 0;

    return <span> {props.amount ? props.amount : 0} terminos.</span>;
};

export default TermsReviewAmount;
