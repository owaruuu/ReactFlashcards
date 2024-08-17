import React from "react";
import RecognizeItem from "./TermItems/RecognizeItem";
import TermList from "../../../TermList";
import { reorderTermsList } from "../../../../../utils/utils";

const RecognizeTermList = (props) => {
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
            <RecognizeItem
                key={term.id}
                globalQuery={globalQuery}
                queryStatus={lectureQuery.status}
                queryIsRefetching={lectureQuery.isRefetching}
                hasQueryData={queryData ? true : false}
                termData={queryData?.[term.id]}
                term={term}
                answer={term.answer}
                onIconClick={onIconClick}
                showControls={loggedIn ? true : false}
                loggedIn={loggedIn}
            ></RecognizeItem>
        );
    });

    return <TermList termItems={termItems}></TermList>;
};

export default RecognizeTermList;
