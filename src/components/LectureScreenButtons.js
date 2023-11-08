import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import BackButton from "./BackButton";

const LectureScreenButtons = () => {
    const { dispatch, appState, dbError, user } = useContext(AppContext);

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
            {reviewButton}
            {user.currentProgress && learnButton}
            <BackButton
                options={{ currentScreen: "main", currentLecture: null }}
            />
        </div>
    );
};

export default LectureScreenButtons;
