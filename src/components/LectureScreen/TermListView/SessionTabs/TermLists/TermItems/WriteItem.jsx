import React from "react";
import TermOptionsContainer from "../../../../../TermOptionButtons/TermOptionsContainer";

const WriteItem = (props) => {
    // console.log("🚀 ~ WriteItem ~ props:", props);
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

    const classNames = termData ? `kanjiItem ${termData}` : "kanjiItem";

    return (
        <div className={classNames}>
            <div className={loggedIn ? "termData termDataDivider" : "termData"}>
                <div className="term">{term.kanji}</div>
                <div className="horizontalRule"></div>
                <div className="answer" style={{ textAlign: "end" }}>
                    {term.meaning}
                </div>
            </div>
            {loggedIn && (
                <TermOptionsContainer
                    globalQuery={globalQuery}
                    queryStatus={queryStatus}
                    queryIsRefetching={queryIsRefetching}
                    hasQueryData={hasQueryData}
                    state={termData}
                    language={"write"}
                    onIconClick={onIconClick}
                    termId={term.id}
                />
            )}
        </div>
    );
};

export default WriteItem;
