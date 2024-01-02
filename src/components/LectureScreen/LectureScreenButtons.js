import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import BackButton from "../BackButton";
import { HiClipboardDocumentList } from "react-icons/hi2";

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
            Revisar
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
            Memorizar
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
            <HiClipboardDocumentList className="testIcon" /> Prueba
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
