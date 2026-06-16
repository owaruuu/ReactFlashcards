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
import { FaStarOfLife } from "react-icons/fa6";

import { showDifference } from "../../../utils/utils";
import ProgressSection from "./ProgressSection/ProgressSection.jsx";

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
    const {
        lecture,
        testId,
        id,
        amount,
        amountKanji,
        starredAmount,
        userDataQueryData,
        allLecturesDataQueryStatus,
        title,
        isKanjiView,
        amountCanLearn,
    } = props;
    const [percentage, setPercentage] = useState(0); //for future use
    const [japanesePercentage, setJapanesePercentage] = useState(0); //for future use
    const navigate = useNavigate();
    const hasTest = testId !== "-1" && testId !== undefined;

    //Listens to user change to show the progress
    useEffect(() => {
        if (user.currentProgress) {
            const lectureProgress = user.currentProgress[id];

            if (lectureProgress) {
                let learnedAmount = 0;
                let japaneseLearnedAmount = 0;

                const terms = lecture.termList;

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

                setPercentage(Math.trunc((learnedAmount / amount) * 100));
                setJapanesePercentage(
                    Math.trunc((japaneseLearnedAmount / amount) * 100),
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
        allLecturesDataQueryStatus === "loading" ? (
            <Spinner size="sm" />
        ) : (
            "aaaaaaaaa"
        );

    const lastReviewDate =
        allLecturesDataQueryStatus === "loading" ? (
            <Spinner size="sm" />
        ) : (
            "aaaaaaaaa"
        );

    const type1 = isKanjiView ? "recognize" : "japanese";
    const type2 = isKanjiView ? "write" : "spanish";

    const japaneseSessionTermsAmount = amountCanLearn[id]?.aAmount;
    const spanishSessionTermsAmount = amountCanLearn[id]?.bAmount;

    //string date
    const japaneseLastSessionTime =
        userDataQueryData?.[id]?.[`${type1}_session`]?.lastReviewed;

    const spanishLastSessionTime =
        userDataQueryData?.[id]?.[`${type2}_session`]?.lastReviewed;

    const japaneseSessionTimeDiff = japaneseLastSessionTime
        ? {
              chosenDiff: Math.abs(
                  new Date(japaneseLastSessionTime).getTime() -
                      new Date().getTime(),
              ),
          }
        : undefined;

    const spanishSessionTimeDiff = spanishLastSessionTime
        ? {
              chosenDiff: Math.abs(
                  new Date(spanishLastSessionTime).getTime() -
                      new Date().getTime(),
              ),
          }
        : undefined;

    const isBookmarked = userDataQueryData?.[id]?.bookmarked;

    const lectureName = isBookmarked ? (
        <>
            <FaStarOfLife /> {title} <FaStarOfLife />
        </>
    ) : (
        <>{title}</>
    );

    function navigateToLecture() {
        backToTop();
        navigate(isKanjiView ? `/lectures/kanji/${id}` : `/lectures/${id}`);
    }

    const LectureButton = ({ children }) => (
        <div className="lectureButton" onClick={navigateToLecture}>
            {children}
        </div>
    );

    const progress = userDataQueryData
        ? getProgress(userDataQueryData, lecture)
        : {};

    return (
        <LectureButton>
            <div className="lectureProgress">
                <div className="japaneseTitle">Japonés: </div>
                <div className="japaneseProgress">
                    <ProgressSection progress={progress?.[id]?.japanese} />
                </div>
                <div className="spanishTitle">Español: </div>
                <div className="spanishProgress">
                    <ProgressSection progress={progress?.[id]?.spanish} />
                </div>
            </div>
            <div className="title">
                <div className="terms">
                    <span>{amount} Palabras</span>
                    {isKanjiView && <span> - {amountKanji} Kanji</span>}
                </div>
                <span className="lectureButtonTitle">{lectureName}</span>
                <div className="icons">
                    {hasTest && (
                        <HiClipboardDocumentList className="testIcon" />
                    )}
                </div>
            </div>
            <div className="session">
                {loggedIn && (
                    <>
                        <div className="japaneseTitle">Japonés: </div>
                        <div className="japaneseSection">
                            <div className="amountJapanese">
                                <PiStackOverflowLogoFill /> :
                                <TermsReviewAmount
                                    status={allLecturesDataQueryStatus}
                                    amount={japaneseSessionTermsAmount}
                                ></TermsReviewAmount>
                            </div>
                            <div className="lastReviewJapanese">
                                <FaClock /> :{" "}
                                <ReviewSessionTime
                                    status={allLecturesDataQueryStatus}
                                    diff={japaneseSessionTimeDiff}
                                ></ReviewSessionTime>
                            </div>
                        </div>

                        <div className="spanishTitle">Español: </div>
                        <div className="spanishSection">
                            <div className="amountSpanish">
                                <PiStackOverflowLogoFill /> :
                                <TermsReviewAmount
                                    status={allLecturesDataQueryStatus}
                                    amount={spanishSessionTermsAmount}
                                ></TermsReviewAmount>
                            </div>
                            <div className="lastReviewSpanish">
                                <FaClock /> :{" "}
                                <ReviewSessionTime
                                    status={allLecturesDataQueryStatus}
                                    diff={spanishSessionTimeDiff}
                                ></ReviewSessionTime>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </LectureButton>
    );
};

function getProgress(userData, lecture) {
    const progress = {};

    for (const [lectureId, progressData] of Object.entries(userData)) {
        const japaneseLevels = getLevels(
            progressData.japanese_terms_levels,
            lecture.termList.length,
        );
        const spanishLevels = getLevels(
            progressData.spanish_terms_levels,
            lecture.termList.length,
        );

        progress[lectureId] = {
            japanese: japaneseLevels,
            spanish: spanishLevels,
        };
    }

    return progress;
}

function getLevels(data, total) {
    const levels = {
        noView: total,
        learning: 0,
        midPoint: 0,
        memorized: 0,
        total: total,
    };

    if (!data) return levels;

    for (const termData of Object.values(data)) {
        if (termData.level >= 9) {
            levels.memorized += 1;
            levels.noView -= 1;
        } else if (termData.level >= 6) {
            levels.midPoint += 1;
            levels.noView -= 1;
        } else if (termData.level > 0) {
            levels.learning += 1;
            levels.noView -= 1;
        }
    }

    return levels;
}

function getAbreviation(type) {
    switch (type) {
        case "japanese":
            return "(jpn)";
        case "spanish":
            return "(esp)";
        case "recognize":
            return "(reconocer)";
        case "write":
            return "(escribir)";
        default:
            throw new Error("wrong lang type: " + type);
    }
}

export default LectureButton;
