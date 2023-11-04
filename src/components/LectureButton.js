import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const LectureButton = (props) => {
    const { dispatch, loaded, loggedIn, user } = useContext(AppContext);
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        if (user.currentProgress) {
            const lectureProgress = user.currentProgress[props.id];

            if (lectureProgress) {
                let learnedAmount = 0;

                for (const [key, value] of Object.entries(lectureProgress)) {
                    if (value === "learned") {
                        learnedAmount += 1;
                    }
                }

                setPercentage(
                    Math.trunc(
                        (learnedAmount / props.lecture.termList.length) * 100
                    )
                );
            } else {
                setPercentage(0);
            }
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
