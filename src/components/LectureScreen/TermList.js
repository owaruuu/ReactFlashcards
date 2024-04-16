import TermItem from "./TermItem";
import { useUserDataQuery } from "../../hooks/useUserDataQuery";
const TermList = (props) => {
    // const { data: query } = useUserDataQuery(props.lecture.lectureId);
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
