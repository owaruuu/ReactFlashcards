import LectureButton from "./LectureButton";
import { lectures } from "../data/lectures";

const LectureList = () => {
    const lectureButtons = lectures.map((lecture) => {
        return (
            <LectureButton
                key={lecture.lectureId}
                id={lecture.lectureId}
                amount={lecture.termList.length}
                title={lecture.name}
            />
        );
    });

    return (
        <div className="lectureList">
            <h2 className="lectureListTitle">Set List</h2>
            <div>{lectureButtons}</div>
        </div>
    );
};

export default LectureList;
