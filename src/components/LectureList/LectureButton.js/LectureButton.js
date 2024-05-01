import "./Styles/LectureButton.css";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";
import { backToTop } from "../../../utils/utils";
import { tests } from "../../../data/tests";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaClock } from "react-icons/fa6";
import { PiStackOverflowLogoFill } from "react-icons/pi";
import QuizQueue from "./QuizQueue.js";
import ProgressBar from "./ProgressBar/ProgressBar.js";
import StarAmount from "./components/StarAmount.js";
import TermsReviewAmount from "./components/TermsReviewAmount.js";
import ReviewSessionTime from "./components/ReviewSessionTime.js";
import { Spinner } from "react-bootstrap";

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

    const termsAmount =
        props.userDataQueryStatus === "loading" ? (
            <Spinner size="sm" />
        ) : (
            "aaaaaaaaa"
        );

    const lastReviewDate =
        props.userDataQueryStatus === "loading" ? (
            <Spinner size="sm" />
        ) : (
            "aaaaaaaaa"
        );

    return (
        <div
            className="lectureButton"
            onClick={() => {
                backToTop();
                dispatch({
                    type: "CHANGE_SCREEN",
                    payload: {
                        currentScreen: "lecture-japanese",
                        currentLecture: props.id,
                    },
                });
            }}
        >
            {/* <div className="text">Progreso:</div>
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
            </div> */}
            <span className="lectureButtonTitle">{props.title}</span>
            <div className="terms">
                <span>{props.amount} Palabras</span>
                {loggedIn && <span className="mobile"> - </span>}
                <span>
                    <StarAmount
                        querySuccess={props.starQuerySuccess}
                        starredAmount={props.starredAmount}
                    />
                </span>
            </div>
            {/* <QuizQueue
                japaneseQuizQueue={props.progress?.japaneseQuizQueue}
                spanishQuizQueue={props.progress?.spanishQuizQueue}
            /> */}
            {loggedIn && <div className="session">Sesiónes Repaso: </div>}
            {loggedIn && (
                <div className="amount">
                    <PiStackOverflowLogoFill /> :
                    <TermsReviewAmount
                        status={props.userDataQueryStatus}
                        data={props.userDataQueryData}
                        id={props.id}
                    ></TermsReviewAmount>
                </div>
            )}

            {loggedIn && (
                <div className="lastReview">
                    <FaClock /> :{" "}
                    <ReviewSessionTime
                        status={props.userDataQueryStatus}
                        data={props.userDataQueryData}
                        id={props.id}
                    ></ReviewSessionTime>
                </div>
            )}
            <div className="icons">
                {hasTest && <HiClipboardDocumentList className="testIcon" />}
            </div>
        </div>
    );
};

export default LectureButton;
