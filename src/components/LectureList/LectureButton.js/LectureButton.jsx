import "./Styles/LectureButton.css";
import { useContext, useEffect } from "react";
import { AppContext } from "../../../context/AppContext.jsx";
import { backToTop } from "../../../utils/utils";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaStarOfLife } from "react-icons/fa6";
import ProgressSection from "./ProgressSection/ProgressSection.jsx";
import SessionSection from "./SessionSection/SessionSection.jsx";

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
        userDataQueryData,
        allLecturesDataQueryStatus,
        title,
        isKanjiView,
        amountCanLearn,
    } = props;
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
            }
        }
    }, [user]);

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
            <FaStarOfLife className="bookmarkIcon" /> {title}{" "}
            <FaStarOfLife className="bookmarkIcon" />
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
        ? getProgress(userDataQueryData, amount)
        : {};

    return (
        <LectureButton>
            <div className="japaneseData">
                {loggedIn && (
                    <>
                        <ProgressSection
                            progress={progress?.[id]?.japanese}
                            total={amount}
                        />
                        <SessionSection
                            allLecturesDataQueryStatus={
                                allLecturesDataQueryStatus
                            }
                            amount={japaneseSessionTermsAmount}
                            timeDiff={japaneseSessionTimeDiff}
                        />
                    </>
                )}
            </div>
            <div className="title">
                <div className="terms">
                    <span>{amount} Palabras</span>
                    {isKanjiView && <span> - {amountKanji} Kanji</span>}
                </div>
                <span className="lectureButtonTitle">
                    {lectureName}{" "}
                    {hasTest && (
                        <HiClipboardDocumentList className="testIcon" />
                    )}
                </span>
            </div>
            <div className="spanishData">
                {loggedIn && (
                    <>
                        <ProgressSection
                            progress={progress?.[id]?.spanish}
                            total={amount}
                        />
                        <SessionSection
                            allLecturesDataQueryStatus={
                                allLecturesDataQueryStatus
                            }
                            amount={spanishSessionTermsAmount}
                            timeDiff={spanishSessionTimeDiff}
                        />
                    </>
                )}
            </div>
        </LectureButton>
    );
};

function getProgress(userData, total) {
    const progress = {};

    for (const [lectureId, progressData] of Object.entries(userData)) {
        const japaneseLevels = getLevels(
            progressData.japanese_terms_levels,
            total,
        );
        const spanishLevels = getLevels(
            progressData.spanish_terms_levels,
            total,
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

export default LectureButton;
