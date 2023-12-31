import { useContext } from "react";
import LectureButton from "./LectureButton";
import { lectures } from "../data/lectures";
import { AppContext } from "../context/AppContext";

const LectureList = (props) => {
    // const { progress } = useContext(AppContext);

    const lectureButtons = lectures.map((lecture) => {
        //TODO calculate percentage or read
        return (
            <LectureButton
                key={lecture.lectureId}
                id={lecture.lectureId}
                amount={lecture.termList.length}
                percentage={"50%"}
                title={lecture.name}
                lecture={lecture}
            />
        );
    });

    return (
        <div className="lectureList">
            {/* <div>{JSON.stringify(props.progress)}</div> */}
            <h2 className="lectureListTitle">Set List</h2>
            <div>{lectureButtons}</div>
        </div>
    );
};

export default LectureList;
