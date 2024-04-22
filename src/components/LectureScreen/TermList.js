import TermItem from "./TermItem";
import {
    useTermsDataForUserByLectureIdMutation,
    useJapaneseTermsQuery,
    useSpanishTermsQuery,
} from "../../hooks/useUserDataQuery";

const TermList = (props) => {
    const japaneseTermsQuery = useJapaneseTermsQuery(props.lecture.lectureId);

    const spanishTermsQuery = useSpanishTermsQuery(props.lecture.lectureId);

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
                japaneseLectureData={japaneseTermsQuery.data.data}
                spanishLectureData={spanishTermsQuery.data.data}
                lectureId={props.lecture.lectureId}
                id={term.id}
                term={term.term}
                extra={term.extra}
                answer={term.answer}
                flipped={props.flipped}
                onIconClick={onIconClick}
            ></TermItem>
        );
    });

    return (
        <div className="termList">
            {JSON.stringify(japaneseTermsQuery.data.data)}
            {JSON.stringify(spanishTermsQuery.data.data)}
            {termItems}
        </div>
    );
};

export default TermList;
