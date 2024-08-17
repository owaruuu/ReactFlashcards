import React from "react";
import TermOptionsContainer from "../../../../../TermOptionButtons/TermOptionsContainer";

const TermItem = (props) => {
    const {
        id,
        term,
        answer,
        termData,
        language,
        loggedIn,
        globalQuery,
        queryStatus,
        queryIsRefetching,
        hasQueryData,
        onIconClick,
    } = props;
    // const termElem = () => {
    //     if (extra) {
    //         return (
    //             <div>
    //                 {term} ({extra})
    //             </div>
    //         );
    //     } else {
    //         return <div>{term}</div>;
    //     }
    // };

    const classNames = termData ? `termItem ${termData}` : "termItem";

    // const termDataElem = flipped ? (
    //     <div className={loggedIn ? "termData termDataDivider" : "termData"}>
    //         <div className="answer">{answer}</div>
    //         <div className="verticalRule"></div>
    //         <div className="term" style={{ textAlign: "end" }}>
    //             {termElem()}
    //         </div>
    //     </div>
    // ) : (
    //     <div className={loggedIn ? "termData termDataDivider" : "termData"}>
    //         <div className="term">{termElem()}</div>
    //         <div className="verticalRule"></div>
    //         <div className="answer" style={{ textAlign: "end" }}>
    //             {answer}
    //         </div>
    //     </div>
    // );

    return (
        <div className={classNames}>
            <div className={loggedIn ? "termData termDataDivider" : "termData"}>
                <div className="term">{term}</div>
                <div className="verticalRule"></div>
                <div className="answer" style={{ textAlign: "end" }}>
                    {answer}
                </div>
            </div>
            {loggedIn && (
                <TermOptionsContainer
                    globalQuery={globalQuery}
                    queryStatus={queryStatus}
                    queryIsRefetching={queryIsRefetching}
                    hasQueryData={hasQueryData}
                    state={termData}
                    language={language}
                    onIconClick={onIconClick}
                    termId={id}
                />
            )}
        </div>
    );
};

export default TermItem;
