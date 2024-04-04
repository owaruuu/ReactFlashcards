import "./Styles/LectureButton.css";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";
import { backToTop } from "../../../utils/utils";
import { tests } from "../../../data/tests";
import { HiClipboardDocumentList } from "react-icons/hi2";
import ProgressBar from "./ProgressBar/ProgressBar.js";
import QuizQueue from "./QuizQueue.js";
import { IoIosArrowRoundForward } from "react-icons/io";

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

    //Listens to user change to show the progress
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

    const japaneseArrow = (
        <span>
            <span className="arrowTypeKana">あ</span>
            <IoIosArrowRoundForward />a
        </span>
    );
    const spanishArrow = (
        <span>
            a<IoIosArrowRoundForward />
            <span className="arrowTypeKana">あ</span>
        </span>
    );

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
            <div className="text">Progreso:</div>
            <div className="bar">
                <ProgressBar
                    arrow={japaneseArrow}
                    terms={props.progress?.japaneseTerms}
                    amount={props.amount}
                />
            </div>
            <div className="jap-bar">
                <ProgressBar
                    arrow={spanishArrow}
                    terms={props.progress?.spanishTerms}
                    amount={props.amount}
                />
            </div>
            <span className="lectureButtonTitle">{props.title}</span>
            <span className="terms">{props.amount} Palabras</span>
            <QuizQueue
                japaneseQuizQueue={props.progress?.japaneseQuizQueue}
                spanishQuizQueue={props.progress?.spanishQuizQueue}
            />
            <div className="icons">
                {hasTest && <HiClipboardDocumentList className="testIcon" />}
            </div>
        </div>
    );
};

export default LectureButton;
