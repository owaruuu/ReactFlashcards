import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { backToTop } from "../utils/utils";
import { tests } from "../data/tests";
import { HiClipboardDocumentList } from "react-icons/hi2";

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
    const [japanesePercentage, setJapanesePercentage] = useState(0);

    const [hasTest] = useState(() => tests[props.id]);

    useEffect(() => {
        if (user.currentProgress) {
            const lectureProgress = user.currentProgress[props.id];

            if (lectureProgress) {
                let learnedAmount = 0;
                let japaneseLearnedAmount = 0;

                const terms = props.lecture.termList;

                terms.forEach((term) => {
                    const id = term.id;
                    const japaneseId = `j${term.id}`;
                    if (lectureProgress[id] === "learned") {
                        learnedAmount += 1;
                    }

                    if (lectureProgress[japaneseId] === "learned") {
                        japaneseLearnedAmount += 1;
                    }
                });

                setPercentage(Math.trunc((learnedAmount / props.amount) * 100));
                setJapanesePercentage(
                    Math.trunc((japaneseLearnedAmount / props.amount) * 100)
                );
            } else {
                setPercentage(0);
                setJapanesePercentage(0);
            }
        }
    }, [user]);

    const progressPercentage = () => {
        if (serverError || cognitoError || !loggedIn || dbError) {
            return "";
        }

        if (user.currentProgress) {
            return (
                <>
                    <span>{percentage}% Español</span>
                    <span>{japanesePercentage}% Japones</span>
                </>
            );
        } else {
            return <span>Cargando...</span>;
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
                <span>{props.amount} Palabras</span>
                {progressPercentage()}
            </div>

            <span className="lectureButtonTitle">{props.title}</span>
            <div className="extras">
                {hasTest && <HiClipboardDocumentList className="testIcon" />}
            </div>
        </div>
    );
};

export default LectureButton;
