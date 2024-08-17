import React from "react";
import TermList from "../../../TermList";
import { reorderTermsList } from "../../../../../utils/utils";
import TermItem from "./TermItems/TermItem";
import SpanishItem from "./TermItems/SpanishItem";

const SpanishTermList = (props) => {
    const {
        lecture,
        globalQuery,
        lectureQuery,
        queryData,
        onIconClick,
        loggedIn,
    } = props;

    let termList = lecture.termList;
    if (queryData) {
        termList = reorderTermsList(termList, queryData);
    }

    const termItems = termList.map((term) => {
        return (
            <SpanishItem
                key={term.id}
                globalQuery={globalQuery}
                queryStatus={lectureQuery.status}
                queryIsRefetching={lectureQuery.isRefetching}
                hasQueryData={queryData ? true : false}
                termData={queryData?.[term.id]}
                term={term}
                onIconClick={onIconClick}
                showControls={loggedIn ? true : false}
                loggedIn={loggedIn}
            ></SpanishItem>
        );
    });

    return <TermList termItems={termItems}></TermList>;
};

export default SpanishTermList;
