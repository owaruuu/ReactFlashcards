import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import BackButton from "../BackButton";
import { HiClipboardDocumentList } from "react-icons/hi2";

const LectureScreenButtons = (props) => {
    const { dispatch, user } = useContext(AppContext);

    const reviewButton = (
        <button
            className="reviewButton"
            // onClick={() =>
            //     dispatch({
            //         type: "CHANGE_SCREEN",
            //         payload: {
            //             currentScreen: "review",
            //         },
            //     })
            // }
        >
            Revisar
        </button>
    );

    const learnButton = (
        <button
            className={
                user.currentProgress ? "learnButton" : "learnButton disabled"
            }
            // onClick={() =>
            //     dispatch({
            //         type: "CHANGE_SCREEN",
            //         payload: {
            //             currentScreen: "learn",
            //         },
            //     })
            // }
            disabled={!user.currentProgress}
        >
            Memorizar
        </button>
    );

    const testButton = (
        <button
            className={
                user.currentProgress ? "learnButton" : "learnButton disabled"
            }
            // onClick={() =>
            //     dispatch({
            //         type: "CHANGE_SCREEN",
            //         payload: {
            //             currentScreen: "test",
            //         },
            //     })
            // }
            disabled={!user.currentProgress}
        >
            <HiClipboardDocumentList className="testIcon" /> <span>Prueba</span>
        </button>
    );

    return (
        <div className="lectureScreenButtons">
            <div className="learningButtons">
                {reviewButton}
                {/* {learnButton} */}
                {props.test && testButton}
            </div>

            <BackButton
                options={{ currentScreen: "main", currentLecture: null }}
            />
        </div>
    );
};

export default LectureScreenButtons;
