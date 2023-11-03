import TermList from "./TermList";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import LectureScreenButtons from "./LectureScreenButtons";
import { lectures } from "../data/lectures";

const LectureScreen = () => {
    const { dispatch, appState } = useContext(AppContext);

    const lectureId = appState.currentLecture;
    const lecture = lectures.find((lecture) => {
        return lecture.lectureId === lectureId;
    });

    return (
        <div className="lectureScreen">
            <h2 className="lectureTitle">{lecture.name}</h2>
            <LectureScreenButtons />
            <TermList lecture={lecture}></TermList>
        </div>
    );
};

export default LectureScreen;
