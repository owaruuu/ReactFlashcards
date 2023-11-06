import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const LectureButton = (props) => {
    const {
        dispatch,
        loaded,
        loggedIn,
        user,
        dbError,
        serverError,
        cognitoError,
    } = useContext(AppContext);
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

    const progressPercentage = () => {
        if (serverError || cognitoError || !loggedIn || dbError) {
            return "";
        }

        if (user.currentProgress) {
            return <span>{percentage}% learned</span>;
        } else {
            return <span>loading...</span>;
        }
    };

    return (
        <div
            className="lectureButton"
            onClick={() =>
                dispatch({
                    type: "CHANGE_SCREEN",
                    payload: {
                        currentScreen: "lecture",
                        currentLecture: props.id,
                    },
                })
            }
        >
            <span className="set-buttons-helper">{props.amount} terms</span>

            {progressPercentage()}

            {/* {dbError ? (
                ""
            ) : user.currentProgress ? (
                <span>{percentage}% learned</span>
            ) : (
                <span>loading...</span>
            )} */}

            <span>{props.title}</span>
        </div>
    );
};

export default LectureButton;
