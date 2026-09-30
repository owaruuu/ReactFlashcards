import "./Styles/LectureButton.css";
import { useContext, useEffect } from "react";
import { AppContext } from "../../../context/AppContext.jsx";
import { backToTop } from "../../../utils/utils";
import { HiClipboardDocumentList } from "react-icons/hi2";
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

    const localProgress = isKanjiView
        ? { left: progress?.recognize, right: progress?.write }
        : { left: progress?.japanese, right: progress?.spanish };

    return (
        <div className="lectureButton" onClick={navigateToLecture}>
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
        </div>
    );
};

export default LectureButton;
