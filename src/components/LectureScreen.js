import TermList from "./TermList";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const LectureScreen = () => {
    const { dispatch } = useContext(AppContext);
    return (
        <>
            <button
                onClick={() =>
                    dispatch({
                        type: "CHANGE_SCREEN",
                        payload: { newScreen: "main", newLecture: null },
                    })
                }
            >
                go back
            </button>
            <TermList></TermList>
        </>
    );
};

export default LectureScreen;
