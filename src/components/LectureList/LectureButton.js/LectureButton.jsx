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
    } = props;
    const [percentage, setPercentage] = useState(0); //for future use
    const [japanesePercentage, setJapanesePercentage] = useState(0); //for future use
    const navigate = useNavigate();

    //Cambiar por leer un read en la data de la lecture en el testId
    // const [hasTest] = useState(testId);

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
                    Math.trunc((japaneseLearnedAmount / amount) * 100)
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

    const firstAbreviation = getAbreviation(type1);
    const secondAbreviation = getAbreviation(type2);

    // VARS
    const japaneseSessionTermsAmount =
        userDataQueryData?.[id]?.[`${type1}_session`]?.terms?.length;

    const spanishSessionTermsAmount =
        userDataQueryData?.[id]?.[`${type2}_session`]?.terms?.length;

    //string date
    const japaneseLastSessionTime =
        userDataQueryData?.[id]?.[`${type1}_session`]?.lastReviewed;

    const spanishLastSessionTime =
        userDataQueryData?.[id]?.[`${type2}_session`]?.lastReviewed;

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
              lang: firstAbreviation,
          }
        : undefined;

    const spanishSessionTimeDiff = spanishLastSessionTime
        ? {
              chosenDiff: Math.abs(
                  new Date(spanishLastSessionTime).getTime() -
                      new Date().getTime()
              ),
              lang: secondAbreviation,
          }
        : undefined;

    return (
        <div
            className="lectureButton"
            onClick={() => {
                backToTop();
                navigate(
                    isKanjiView ? `/lectures/kanji/${id}` : `/lectures/${id}`
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
            <span className="lectureButtonTitle">{title}</span>
            <div className="terms">
                <span>{amount} Palabras</span>
                {isKanjiView && <span> - {amountKanji} Kanji</span>}
                {/* {loggedIn && (
                    <>
                        <span className="mobile"> - </span>
                        <span>
                            <StarAmount
                                querySuccess={uallLecturesDataQueryStatus}
                                starredAmount={starredAmount}
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
                            status={allLecturesDataQueryStatus}
                            amount={japaneseSessionTermsAmount}
                        ></TermsReviewAmount>
                    </div>
                    <div className="amountSpanish">
                        <PiStackOverflowLogoFill /> :
                        <TermsReviewAmount
                            status={allLecturesDataQueryStatus}
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
                            status={allLecturesDataQueryStatus}
                            diff={japaneseSessionTimeDiff}
                        ></ReviewSessionTime>
                    </div>
                    <div className="lastReviewSpanish">
                        <FaClock /> :{" "}
                        <ReviewSessionTime
                            status={allLecturesDataQueryStatus}
                            diff={spanishSessionTimeDiff}
                        ></ReviewSessionTime>
                    </div>
                </>
            )}
            <div className="icons">
                {testId && <HiClipboardDocumentList className="testIcon" />}
            </div>
        </div>
    );
};

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
