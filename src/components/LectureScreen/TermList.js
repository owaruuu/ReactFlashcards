import TermItem from "./TermItem";
import {
    useTermsDataForUserByLectureIdMutation,
    useJapaneseTermsQuery,
    useSpanishTermsQuery,
} from "../../hooks/useUserDataQuery";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

const TermList = (props) => {
    const { loggedIn } = useContext(AppContext);

    const japaneseTermsQuery = useJapaneseTermsQuery(
        props.lecture.lectureId,
        loggedIn ? true : false
    );
    console.log("🚀 ~ TermList ~ japaneseTermsQuery:", japaneseTermsQuery);

    const spanishTermsQuery = useSpanishTermsQuery(
        props.lecture.lectureId,
        loggedIn ? true : false
    );

    const japaneseTermsMutation = useTermsDataForUserByLectureIdMutation(
        "japaneseTermsForUserByLectureIdQuery"
    );

    const spanishTermsMutation = useTermsDataForUserByLectureIdMutation(
        "spanishTermsForUserByLectureIdQuery"
    );

    //query mutation
    function onIconClick(language, termId, newValue) {
        if (language == "japanese") {
            japaneseTermsMutation.mutate({
                lectureId: props.lecture.lectureId,
                attributeName: `${language}_terms_data`,
                newValue: {
                    ...japaneseTermsQuery.data.data,
                    [termId]: newValue,
                },
            });
        } else {
            spanishTermsMutation.mutate({
                lectureId: props.lecture.lectureId,
                attributeName: `${language}_terms_data`,
                newValue: {
                    ...spanishTermsQuery.data.data,
                    [termId]: newValue,
                },
            });
        }
    }

    const termItems = props.lecture.termList.map((term) => {
        return (
            <TermItem
                key={term.id}
                japaneseQuery={japaneseTermsQuery}
                spanishQuery={spanishTermsQuery}
                japaneseLectureData={japaneseTermsQuery.data.data}
                spanishLectureData={spanishTermsQuery.data.data}
                lectureId={props.lecture.lectureId}
                id={term.id}
                term={term.term}
                extra={term.extra}
                answer={term.answer}
                flipped={props.flipped}
                onIconClick={onIconClick}
                loggedIn={loggedIn}
            ></TermItem>
        );
    });

    const logData = (
        <>
            {JSON.stringify(japaneseTermsQuery.data.data)}
            {JSON.stringify(spanishTermsQuery.data.data)}
        </>
    );

    return (
        <div className="termList">
            {logData}
            {termItems}
        </div>
    );
};

export default TermList;
