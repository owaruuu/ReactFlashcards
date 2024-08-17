import React from "react";
import TermItem from "./TermItem";

const SpanishItem = (props) => {
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

    const termElem = term.answer;

    const answerElem = (
        <div>
            {term.term} {term.extra && `(${term.extra})`}
        </div>
    );

    return (
        <TermItem
            id={term.id}
            term={termElem}
            answer={answerElem}
            termData={termData}
            language="spanish"
            loggedIn={loggedIn}
            globalQuery={globalQuery}
            queryStatus={queryStatus}
            queryIsRefetching={queryIsRefetching}
            hasQueryData={hasQueryData}
            onIconClick={onIconClick}
        />
    );
};

export default SpanishItem;
