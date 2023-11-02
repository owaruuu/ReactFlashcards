import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const LectureScreenButtons = () => {
    const { dispatch, appState } = useContext(AppContext);
    return (
        <div className="lectureScreenButtons">
            <button
                onClick={() =>
                    dispatch({
                        type: "CHANGE_SCREEN",
                        payload: {
                            newScreen: "learn",
                            newLecture: appState.currentLecture,
                        },
                    })
                }
            >
                Quick Watch
            </button>
            <button
                onClick={() =>
                    dispatch({
                        type: "CHANGE_SCREEN",
                        payload: {
                            newScreen: "learn",
                            newLecture: appState.currentLecture,
                        },
                    })
                }
            >
                Learn
            </button>
            <button
                className="backButton"
                onClick={() =>
                    dispatch({
                        type: "CHANGE_SCREEN",
                        payload: { newScreen: "main", newLecture: null },
                    })
                }
            >
                go back
            </button>
        </div>
    );
};

export default LectureScreenButtons;
