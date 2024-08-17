import React from "react";
import TermItem from "./TermItem";

const RecognizeItem = (props) => {
    const {
        term,
        loggedIn,
        termData,
        globalQuery,
        queryStatus,
        queryIsRefetching,
        hasQueryData,
        onIconClick,
    } = props;

    // const classNames = termData ? `termItem ${termData}` : "termItem";

    // const termDataElement = (
    //     <div className={loggedIn ? "termData termDataDivider" : "termData"}>
    //         <div className="term">
    //             <div>{extra}</div>
    //         </div>
    //         <div className="verticalRule"></div>

    //         <div className="answer" style={{ textAlign: "end" }}>
    //             {term} - {answer}
    //         </div>
    //     </div>
    // );

    const termElem = <div>{term.extra}</div>;
    const answerElem = `${term.term} - ${term.answer}`;

    return (
        <TermItem
            id={term.id}
            term={termElem}
            answer={answerElem}
            termData={termData}
            language="recognize"
            loggedIn={loggedIn}
            globalQuery={globalQuery}
            queryStatus={queryStatus}
            queryIsRefetching={queryIsRefetching}
            hasQueryData={hasQueryData}
            onIconClick={onIconClick}
        />
        // <div className={classNames}>
        //     {termDataElement}
        //     {loggedIn && (
        //         <TermOptionsContainer
        //             globalQuery={props.globalQuery}
        //             queryStatus={props.queryStatus}
        //             queryIsRefetching={props.queryIsRefetching}
        //             hasQueryData={props.hasQueryData}
        //             state={props.termData}
        //             language={"recognize"}
        //             onIconClick={props.onIconClick}
        //             termId={props.id}
        //         />
        //     )}
        // </div>
    );
};

export default RecognizeItem;
