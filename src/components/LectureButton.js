import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { backToTop } from "../utils/utils";

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

                setPercentage(Math.trunc((learnedAmount / props.amount) * 100));
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
            onClick={() => {
                backToTop();
                dispatch({
                    type: "CHANGE_SCREEN",
                    payload: {
                        currentScreen: "lecture",
                        currentLecture: props.id,
                    },
                });
            }}
        >
            <div className="set-buttons-helper">
                <span>{props.amount} terms</span>
                {progressPercentage()}
            </div>

            <span className="lectureButtonTitle">{props.title}</span>
        </div>
    );
};

export default LectureButton;
