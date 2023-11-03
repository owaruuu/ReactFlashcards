import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const LectureButton = (props) => {
    const { dispatch, loaded, loggedIn, user } = useContext(AppContext);
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        if (user.currentProgress) {
            const lectureProgress = user.currentProgress[props.id];
            console.log(
                "🚀 ~ file: LectureButton.js:12 ~ useEffect ~ lectureProgress:",
                lectureProgress
            );
        }
    }, [user]);

    return (
        <div
            className="lectureButton"
            onClick={() =>
                dispatch({
                    type: "CHANGE_SCREEN",
                    payload: {
                        newScreen: "lecture",
                        newLecture: props.id,
                    },
                })
            }
        >
            <span>{props.amount} terms</span>

            {loggedIn ? (
                user.currentProgress ? (
                    <span>{percentage}% learned</span>
                ) : (
                    <span>loading...</span>
                )
            ) : (
                ""
            )}

            <span>{props.title}</span>
        </div>
    );
};

export default LectureButton;
