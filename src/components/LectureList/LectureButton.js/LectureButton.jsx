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
        dataObject,
        allLecturesDataQueryStatus,
        title,
        isKanjiView,
        amountCanLearn,
        progress,
    } = props;
    // console.log("🚀 ~ LectureButton ~ progress:", progress);
    // console.log("🚀 ~ LectureButton ~ amountCanLearn:", amountCanLearn);
    // console.log("🚀 ~ LectureButton ~ id:", id);
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

    //TODO cambiar por referencia que no ocupe ID
    const leftSessionTermsAmount = amountCanLearn.aAmount;
    const rightSessionTermsAmount = amountCanLearn.bAmount;

    //string date
    const leftLastSessionTime =
        dataObject?.[id]?.[`${type1}_session`]?.lastReviewed;

    const rightLastSessionTime =
        dataObject?.[id]?.[`${type2}_session`]?.lastReviewed;

    const leftSessionTimeDiff = leftLastSessionTime
        ? {
              chosenDiff: Math.abs(
                  new Date(leftLastSessionTime).getTime() -
                      new Date().getTime(),
              ),
          }
        : undefined;

    const rightSessionTimeDiff = rightLastSessionTime
        ? {
              chosenDiff: Math.abs(
                  new Date(rightLastSessionTime).getTime() -
                      new Date().getTime(),
              ),
          }
        : undefined;

    const isBookmarked = dataObject?.[id]?.bookmarked;

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

    //TODO subir mas arriba en el tree
    // const progress = dataObject?.[id]
    //     ? getProgress(dataObject[id], lecture, isKanjiView)
    //     : {};

    // if (lecture.lectureId === "20240131001") {
    //     console.log("🚀 ~ LectureButton ~ progress:", progress);
    // }
    const localProgress = isKanjiView
        ? { left: progress?.recognize, right: progress?.write }
        : { left: progress?.japanese, right: progress?.spanish };

    return (
        <LectureButton>
            <div className="leftData">
                {loggedIn && (
                    <>
                        <ProgressSection
                            progress={localProgress.left}
                            total={amount.termList}
                        />
                        <SessionSection
                            allLecturesDataQueryStatus={
                                allLecturesDataQueryStatus
                            }
                            amount={leftSessionTermsAmount}
                            timeDiff={leftSessionTimeDiff}
                        />
                    </>
                )}
            </div>
            <div className="title">
                <div className="terms">
                    <span>{amount.termList} Palabras</span>
                    {isKanjiView && <span> - {amount.kanjiList} Kanji</span>}
                </div>
                <span className="lectureButtonTitle">
                    {lectureName}{" "}
                    {hasTest && (
                        <HiClipboardDocumentList className="testIcon" />
                    )}
                </span>
            </div>
            <div className="rightData">
                {loggedIn && (
                    <>
                        <ProgressSection
                            progress={localProgress.right}
                            total={
                                isKanjiView ? amount.kanjiList : amount.termList
                            }
                        />
                        <SessionSection
                            allLecturesDataQueryStatus={
                                allLecturesDataQueryStatus
                            }
                            amount={rightSessionTermsAmount}
                            timeDiff={rightSessionTimeDiff}
                        />
                    </>
                )}
            </div>
        </LectureButton>
    );
};

function getProgress(lectureData, lecture, isKanjiView) {
    // console.log("🚀 ~ getProgress ~ lecture:", lecture);
    let progress = {};

    const leftLevels = getLevels(
        lectureData[
            isKanjiView ? "recognize_terms_levels" : "japanese_terms_levels"
        ],
        lecture.termList.length,
    );
    const rightLevels = getLevels(
        lectureData[
            isKanjiView ? "write_terms_levels" : "spanish_terms_levels"
        ],
        isKanjiView ? lecture.kanjiList.length : lecture.termList.length,
    );

    progress = {
        left: leftLevels,
        right: rightLevels,
    };

    return progress;
}

function getLevels(data, total) {
    // console.log("🚀 ~ getLevels ~ data:", data);
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
