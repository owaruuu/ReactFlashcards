import TermItem from "./TermItem";
import { useDataForUserByLectureIdQuery } from "../../hooks/useUserDataQuery";
import { useQueryClient } from "react-query";

function findLectureData(array, lectureId) {
    console.log("🚀 ~ findLectureData ~ array, lectureId:", array, lectureId);
    let result = {};

    array.forEach((element) => {
        if (element.lecture_id == lectureId) {
            console.log("encontrado");
            result = element;
        }
    });

    console.log("returning: ", result);
    return result;
}

const TermList = (props) => {
    const queryClient = useQueryClient();
    const allUserData = queryClient.getQueryData("allDataForUser");
    console.log("🚀 ~ TermList ~ allUserData:", allUserData);
    const query = useDataForUserByLectureIdQuery(props.lecture.lectureId, {
        data: findLectureData(allUserData, props.lecture.lectureId),
    });
    console.log("🚀 ~ TermList ~ query:", query);
    console.log("🚀 ~ TermList ~ query.data:", query.data);

    // console.log("data: ", query.data.data.Item.lecture_data);

    const termItems = props.lecture.termList.map((term) => {
        return (
            <TermItem
                key={term.id}
                lectureId={props.lecture.lectureId}
                id={term.id}
                term={term.term}
                extra={term.extra}
                answer={term.answer}
                flipped={props.flipped}
            ></TermItem>
        );
    });

    return <div className="termList">{termItems}</div>;
};

export default TermList;
