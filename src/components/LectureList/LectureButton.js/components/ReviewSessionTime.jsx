import React from "react";
import { Spinner } from "react-bootstrap";
import { showDifference, pickDifference } from "../../../../utils/utils";

const ReviewSessionTime = (props) => {
    if (props.status === "loading") {
        return <Spinner size="sm" style={{ color: "#532f00" }} />;
    }

    // let japaneseLastSessionTime =
    //     props.data?.[props.id]?.["japanese_session"]?.lastReviewed;
    // japaneseLastSessionTime = japaneseLastSessionTime
    //     ? japaneseLastSessionTime
    //     : "";

    // let spanishLastSessionTime =
    //     props.data?.[props.id]?.["spanish_session"]?.lastReviewed;
    // spanishLastSessionTime = spanishLastSessionTime
    //     ? spanishLastSessionTime
    //     : "";

    // let japaneseDateObject, spanishDateObject;

    // if (japaneseLastSessionTime) {
    //     japaneseDateObject = new Date(japaneseLastSessionTime);
    // }

    // if (spanishLastSessionTime) {
    //     spanishDateObject = new Date(spanishLastSessionTime);
    // }

    // const chosendiff = pickDifference(japaneseDateObject, spanishDateObject);
    // // console.log("🚀 ~ ReviewSessionTime ~ chosendiff:", chosendiff);
    // //TODO sacar codigo viejo
    if (!props.diff) {
        return <span>nunca.</span>;
    }
    return <span>{showDifference(props.diff)}</span>;

    if (japaneseDateObject && spanishDateObject) {
        const japaneseDiff = Math.abs(
            japaneseDateObject.getTime() - new Date().getTime()
        );

        const spanishDiff = Math.abs(
            spanishDateObject.getTime() - new Date().getTime()
        );

        const biggerDiff = Math.max(japaneseDiff, spanishDiff);
        return <span>{showDifference(biggerDiff)}</span>;
    } else if (japaneseDateObject && !spanishDateObject) {
        const japaneseDiff = Math.abs(
            japaneseDateObject.getTime() - new Date().getTime()
        );
        return <span>{showDifference(japaneseDiff)}</span>;
    } else if (!japaneseDateObject && spanishDateObject) {
        const spanishDiff = Math.abs(
            spanishDateObject.getTime() - new Date().getTime()
        );
        return <span>{showDifference(spanishDiff)}</span>;
    }

    return <span> nunca.</span>;
};

export default ReviewSessionTime;
