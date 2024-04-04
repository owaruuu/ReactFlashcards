import LectureButton from "./LectureButton.js/LectureButton.js";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

import { userQuizProgress } from "../../data/fake-db.js";

const LectureButtons = () => {
    const userId = 123;
    const myProgress = userQuizProgress[userId];

    const { lectures } = useContext(AppContext);

    const lectureButtons = lectures.map((lecture) => {
        return (
            <LectureButton
                lecture={lecture}
                key={lecture.lectureId}
                id={lecture.lectureId}
                amount={lecture.termList.length}
                title={lecture.name}
                progress={myProgress[lecture.lectureId]}
            />
        );
    });
    return lectureButtons;
};

export default LectureButtons;
