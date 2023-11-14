import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import BackButton from "../BackButton";

const LectureScreenButtons = () => {
    const { dispatch, user } = useContext(AppContext);

    const reviewButton = (
        <button
            className="reviewButton"
            onClick={() =>
                dispatch({
                    type: "CHANGE_SCREEN",
                    payload: {
                        currentScreen: "review",
                    },
                })
            }
        >
            Review
        </button>
    );

    const learnButton = (
        <button
            className="learnButton"
            onClick={() =>
                dispatch({
                    type: "CHANGE_SCREEN",
                    payload: {
                        currentScreen: "learn",
                    },
                })
            }
        >
            Learn
        </button>
    );

    return (
        <div className="lectureScreenButtons">
            <div className="learningButtons">
                {reviewButton}
                {user.currentProgress && learnButton}
            </div>

            <BackButton
                options={{ currentScreen: "main", currentLecture: null }}
            />
        </div>
    );
};

export default LectureScreenButtons;
