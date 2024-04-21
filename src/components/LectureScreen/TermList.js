import TermItem from "./TermItem";
import {
    useTermsDataForUserByLectureIdQuery,
    useTermsDataForUserByLectureIdMutation,
} from "../../hooks/useUserDataQuery";
import { useQueryClient } from "react-query";

const TermList = (props) => {
    const queryClient = useQueryClient();

    //get 'global' user data query
    const allUserData = queryClient.getQueryData("allDataForUser");

    //start local query
    const japaneseTermsQuery = useTermsDataForUserByLectureIdQuery(
        "japaneseTermsForUserByLectureIdQuery",
        props.lecture.lectureId,
        "japanese",
        {
            data: findLectureData(
                "japanese",
                allUserData,
                props.lecture.lectureId
            ),
        }
    );

    const spanishTermsQuery = useTermsDataForUserByLectureIdQuery(
        "spanishTermsForUserByLectureIdQuery",
        props.lecture.lectureId,
        "spanish",
        {
            data: findLectureData(
                "spanish",
                allUserData,
                props.lecture.lectureId
            ),
        }
    );

    function findLectureData(language, dataArray, lectureId) {
        let result = undefined;
        if (dataArray) {
            dataArray.forEach((element) => {
                if (element.lecture_id == lectureId) {
                    result = element[`${language}_terms_data`];
                }
            });
        }

        return result;
    }

    // console.log("🚀 ~ TermList ~ japaneseTermsQuery 40:", japaneseTermsQuery);
    // console.log("🚀 ~ TermList ~ spanishTermsQuery 55:", spanishTermsQuery);

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
