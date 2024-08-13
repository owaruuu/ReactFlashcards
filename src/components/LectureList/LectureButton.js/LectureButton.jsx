import "./Styles/LectureButton.css";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../../context/AppContext.jsx";
import { backToTop } from "../../../utils/utils";
import { tests } from "../../../data/tests";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaClock } from "react-icons/fa6";
import { PiStackOverflowLogoFill } from "react-icons/pi";
import QuizQueue from "./QuizQueue.jsx";
import ProgressBar from "./ProgressBar/ProgressBar.jsx";
import StarAmount from "./components/StarAmount.jsx";
import TermsReviewAmount from "./components/TermsReviewAmount.jsx";
import ReviewSessionTime from "./components/ReviewSessionTime.jsx";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { showDifference } from "../../../utils/utils";

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
    const navigate = useNavigate();

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
        props.allLecturesDataQueryStatus === "loading" ? (
            <Spinner size="sm" />
        ) : (
            "aaaaaaaaa"
        );

    const lastReviewDate =
        props.allLecturesDataQueryStatus === "loading" ? (
            <Spinner size="sm" />
        ) : (
            "aaaaaaaaa"
        );

    // VARS

    const japaneseSessionTermsAmount =
        props.userDataQueryData?.[props.id]?.japanese_session?.terms?.length;

    const spanishSessionTermsAmount =
        props.userDataQueryData?.[props.id]?.spanish_session?.terms?.length;

    //string date
    const japaneseLastSessionTime =
        props.userDataQueryData?.[props.id]?.["japanese_session"]?.lastReviewed;

    const spanishLastSessionTime =
        props.userDataQueryData?.[props.id]?.["spanish_session"]?.lastReviewed;

    // if (japaneseLastSessionTime) {
    //     //data object
    //     japaneseDateObject = new Date(japaneseLastSessionTime);
    //  const japaneseDiff = Math.abs(
    //      japaneseDateObject.getTime() - new Date().getTime()
    //  );
    //     return { chosenDiff: japaneseDiff, lang: "(jpn)" };
    // }

    const japaneseSessionTimeDiff = japaneseLastSessionTime
        ? {
              chosenDiff: Math.abs(
                  new Date(japaneseLastSessionTime).getTime() -
                      new Date().getTime()
              ),
              lang: "(jpn)",
          }
        : undefined;

    const spanishSessionTimeDiff = spanishLastSessionTime
        ? {
              chosenDiff: Math.abs(
                  new Date(spanishLastSessionTime).getTime() -
                      new Date().getTime()
              ),
              lang: "(esp)",
          }
        : undefined;

    return (
        <div
            className="lectureButton"
            onClick={() => {
                backToTop();
                navigate(
                    props.isKanjiView
                        ? `/lectures/kanji/${props.id}`
                        : `/lectures/${props.id}`
                );
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
                {/* {loggedIn && (
                    <>
                        <span className="mobile"> - </span>
                        <span>
                            <StarAmount
                                querySuccess={props.uallLecturesDataQueryStatus}
                                starredAmount={props.starredAmount}
                            />
                        </span>
                    </>
                )} */}
            </div>
            {/* <QuizQueue
                japaneseQuizQueue={props.progress?.japaneseQuizQueue}
                spanishQuizQueue={props.progress?.spanishQuizQueue}
            /> */}
            {loggedIn && <div className="session">Sesiónes Repaso: </div>}
            {loggedIn && (
                <>
                    <div className="amountJapanese">
                        <PiStackOverflowLogoFill /> :
                        <TermsReviewAmount
                            status={props.allLecturesDataQueryStatus}
                            amount={japaneseSessionTermsAmount}
                        ></TermsReviewAmount>
                    </div>
                    <div className="amountSpanish">
                        <PiStackOverflowLogoFill /> :
                        <TermsReviewAmount
                            status={props.allLecturesDataQueryStatus}
                            amount={spanishSessionTermsAmount}
                        ></TermsReviewAmount>
                    </div>
                </>
            )}

            {loggedIn && (
                <>
                    <div className="lastReviewJapanese">
                        <FaClock /> :{" "}
                        <ReviewSessionTime
                            status={props.allLecturesDataQueryStatus}
                            diff={japaneseSessionTimeDiff}
                        ></ReviewSessionTime>
                    </div>
                    <div className="lastReviewSpanish">
                        <FaClock /> :{" "}
                        <ReviewSessionTime
                            status={props.allLecturesDataQueryStatus}
                            diff={spanishSessionTimeDiff}
                        ></ReviewSessionTime>
                    </div>
                </>
            )}
            <div className="icons">
                {hasTest && <HiClipboardDocumentList className="testIcon" />}
            </div>
        </div>
    );
};

export default LectureButton;
