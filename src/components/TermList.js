import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import TermItem from "./TermItem";
import lectures from "../data/lectures";

const TermList = () => {
    const { appState } = useContext(AppContext);
    console.log(lectures);

    const lectureId = appState.currentLecture;
    const lecture = lectures.find((lecture) => {
        return lecture.lectureId === lectureId;
    });
    console.log("🚀 ~ file: TermList.js:13 ~ lecture ~ lecture:", lecture);

    const termItems = lecture.termList.map((term) => {
        return (
            <TermItem
                key={term.id}
                term={term.term}
                extra={term.extra}
                answer={term.answer}
            ></TermItem>
        );
    });

    // const terms = appState.currentLecture

    return <div className="termList">{termItems}</div>;
};

export default TermList;
