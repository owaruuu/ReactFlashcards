import TermItem from "./TermItem";
import {
    useJapaneseTermsDataForUserByLectureIdQuery,
    useJapaneseTermsDataForUserByLectureIdMutation,
} from "../../hooks/useUserDataQuery";
import { useQueryClient } from "react-query";

const TermList = (props) => {
    const queryClient = useQueryClient();
    //get 'global' user data query
    const allUserData = queryClient.getQueryData("allDataForUser");

    //start local query
    const japaneseTermsQuery = useJapaneseTermsDataForUserByLectureIdQuery(
        props.lecture.lectureId,
        {
            data: findLectureData(allUserData, props.lecture.lectureId),
        }
    );
    // console.log("🚀 ~ TermList ~ japaneseTermsQuery 17:", japaneseTermsQuery);

    const japaneseTermsMutation =
        useJapaneseTermsDataForUserByLectureIdMutation();

    //query mutation
    function onIconClick(language, termId, newValue) {
        let termsObject = {};

        if (japaneseTermsQuery.data.data) {
            termsObject = japaneseTermsQuery.data.data.japanese_terms_data;
        }

        // console.log("🚀 ~ onIconClick ~ termsObject:", termsObject);
        const newObject = {
            ...termsObject,
            [termId]: newValue,
        };
        // console.log("🚀 ~ onIconClick ~ newObject:", newObject);
        japaneseTermsMutation.mutate({
            lectureId: props.lecture.lectureId,
            attributeName: `${language}_terms_data`,
            newValue: newObject,
        });
    }

    function findLectureData(dataArray, lectureId) {
        let result = {};
        if (dataArray) {
            dataArray.forEach((element) => {
                if (element.lecture_id == lectureId) {
                    result = element;
                }
            });
        }

        return result;
    }

    const termItems = props.lecture.termList.map((term) => {
        return (
            <TermItem
                key={term.id}
                lectureData={japaneseTermsQuery.data.data}
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
            {termItems}
        </div>
    );
};

export default TermList;
