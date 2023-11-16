import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import BackButton from "../BackButton";

const LectureScreenButtons = (props) => {
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

    const testButton = (
        <button
            className="learnButton"
            onClick={() =>
                dispatch({
                    type: "CHANGE_SCREEN",
                    payload: {
                        currentScreen: "test",
                    },
                })
            }
        >
            Test
        </button>
    );

    return (
        <div className="lectureScreenButtons">
            <div className="learningButtons">
                {reviewButton}
                {user.currentProgress && learnButton}
                {props.test && testButton}
            </div>

            <BackButton
                options={{ currentScreen: "main", currentLecture: null }}
            />
        </div>
    );
};

export default LectureScreenButtons;
