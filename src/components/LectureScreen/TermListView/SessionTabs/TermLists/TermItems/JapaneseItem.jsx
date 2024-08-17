import React from "react";
import TermItem from "./TermItem";

const JapaneseItem = (props) => {
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

    const termElem = (
        <div>
            {term.term} {term.extra && `(${term.extra})`}
        </div>
    );
    const answerElem = term.answer;

    return (
        <TermItem
            id={term.id}
            term={termElem}
            answer={answerElem}
            termData={termData}
            language="japanese"
            loggedIn={loggedIn}
            globalQuery={globalQuery}
            queryStatus={queryStatus}
            queryIsRefetching={queryIsRefetching}
            hasQueryData={hasQueryData}
            onIconClick={onIconClick}
        />
    );
};

export default JapaneseItem;
