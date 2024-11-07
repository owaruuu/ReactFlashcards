import React from "react";
import WriteItem from "./TermItems/WriteItem";
import TermList from "../../../TermList";
import { reorderTermsList } from "../../../../../utils/utils";

const WriteTermList = (props) => {
    const {
        lecture,
        globalQuery,
        lectureQuery,
        queryData,
        onIconClick,
        loggedIn,
    } = props;
    // console.log("🚀 ~ WriteTermList ~ props:", props);

    let termList = lecture.kanjiList;
    if (queryData) {
        termList = reorderTermsList(termList, queryData);
    }

    const termItems = termList.map((term) => {
        return (
            <WriteItem
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
            ></WriteItem>
        );
    });

    return <TermList termItems={termItems} isWriteList></TermList>;
};

export default WriteTermList;
