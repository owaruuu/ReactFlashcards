import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const LectureButton = (props) => {
    const { dispatch, loaded } = useContext(AppContext);
    return (
        <div
            className="lectureButton"
            onClick={() =>
                dispatch({
                    type: "CHANGE_SCREEN",
                    payload: { newScreen: "lecture", newLecture: props.id },
                })
            }
        >
            <span>{props.amount} terms</span>
            {loaded ? (
                <span>{props.percentage} learned</span>
            ) : (
                <span>loading</span>
            )}

            <span>{props.title}</span>
        </div>
    );
};

export default LectureButton;
