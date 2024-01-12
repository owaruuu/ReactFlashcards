import LectureButton from "../LectureButton";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const LectureButtons = () => {
    const { lectures } = useContext(AppContext);

    const lectureButtons = lectures.map((lecture) => {
        return (
            <LectureButton
                lecture={lecture}
                key={lecture.lectureId}
                id={lecture.lectureId}
                amount={lecture.termList.length}
                title={lecture.name}
            />
        );
    });
    return lectureButtons;
};

export default LectureButtons;
