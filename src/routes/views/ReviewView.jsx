import React, { useRef } from "react";
import "../../components/Styles/Main.css";
import "../../components/ReviewScreen/Styles/ReviewScreen.css";
import { useState, useEffect } from "react";
import ReviewOptionsModal from "../../components/ReviewScreen/ReviewOptionsModal";
import ReviewPanel from "../../components/ReviewScreen/ReviewPanel";
import TermCard from "../../components/LearnScreen/TermCard";
import DisappearingCard from "../../components/LearnScreen/DisappearingCard";
import NextButton from "../../components/ReviewScreen/NextButton";
import {
    useTermOptionsMutation,
    useCreateSessionMutation,
    useSessionPointsMutation,
} from "../../hooks/userDataQueryHook";
import TermOptionsContainer from "../../components/TermOptionButtons/TermOptionsContainer";
import { useParams } from "react-router-dom";
import { getLectureQueryString, ONE_HOUR } from "../../utils/utils";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NormalTermCard from "../../components/LearnScreen/NormalTermCard";
import RecognizeTermCard from "../../components/LearnScreen/Flashcards/RecognizeTermCard";
import WriteKanjiCard from "../../components/LearnScreen/Flashcards/WriteKanjiCard";
import DisappearingElement from "../../components/Misc/DisappearingElement";
import AnswerButtons from "../../components/ReviewView/AnswerButtons.jsx";
import ErrorFlashCard from "../../components/LearnScreen/Flashcards/ErrorFlashCard.jsx";

const HOURS_MIN = 12;

const ReviewView = (props) => {
    //lectureQuery viene lista
    const { setTab, allLecturesDataQuery, lectureQuery, lecture } =
        useOutletContext();

    const childrenRef = useRef();

    const { lang } = useParams();
    const navigate = useNavigate();

    const isKanjiView = lang === "write" || lang === "recognize" ? true : false;
    const lectureDir = isKanjiView
        ? `/lectures/kanji/${lecture.lectureId}`
        : `/lectures/${lecture.lectureId}`;

    const [showModal, setShowModal] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const [disappearingCards, setDisappearingCards] = useState([]);
    const [feedbackMessage, setFeedbackMessage] = useState("");

    //diccionario de terminos para poder acceder a los terminos en o(n)
    const [termsDict] = useState(() => {
        const termsDict = {};
        if (lang === "write") {
            lecture.kanjiList.forEach((term) => {
                termsDict[term.id] = term;
            });
        } else {
            lecture.termList.forEach((term) => {
                termsDict[term.id] = term;
            });
        }

        return termsDict;
    });

    //MUTATIONS que ocuparan los botones
    const termOptionsMutation = useTermOptionsMutation(
        getLectureQueryString(lecture.lectureId)
    );

    const lectureCreateSessionMutation = useCreateSessionMutation(
        getLectureQueryString(lecture.lectureId)
    );

    const lectureSessionAndPointsMutation = useSessionPointsMutation(
        getLectureQueryString(lecture.lectureId)
    );

    //helper para cambiar el estado de los tabs
    useEffect(() => {
        setTab(lang);
    }, []);

    //acceder a terminos directamente
    const termsIds = lectureQuery.data.data[`${lang}_session`].terms;

    const handleOptionsButtonClick = (state) => {
        setShowModal(state);
    };

    const handleClick = () => {
        setShowAnswer((prevState) => !prevState);
    };

    //TODO sacar a archivo
    const removeDisappearingCard = () => {
        const now = new Date().getTime();

        setDisappearingCards((prevCards) => {
            return prevCards.filter((card) => {
                const diff = now - card.props.timeStamp;

                return diff < 299;
            });
        });
    };

    async function fixSession() {
        let dbSessionTermIds = lectureQuery.data.data[`${lang}_session`].terms;
        let validSessionIds = [];

        dbSessionTermIds.forEach((id) => {
            if (termsDict[id]) {
                validSessionIds.push(id);
            }
        });

        const newValue = {
            options: lectureQuery.data.data[`${lang}_session`].options,
            terms: validSessionIds,
            lastReviewed:
                lectureQuery.data.data[`${lang}_session`].lastReviewed,
        };

        try {
            handleResetClick();

            setFeedbackMessage("Modificando sesion...");

            await lectureCreateSessionMutation.mutateAsync(
                {
                    lectureId: lecture.lectureId,
                    attributeName: `${lang}_session`,
                    newValue: newValue,
                },
                {
                    onSuccess: (data, variables, context) => {
                        if (variables.newValue.terms.length < 1) {
                            navigate(lectureDir);
                        }
                    },
                }
            );

            setFeedbackMessage("");
        } catch (error) {
            console.log("🚀 ~ onNewSessionCreate ~ error:", error);
            setFeedbackMessage("Hubo un error, intentalo otra vez.");
        }
    }

    //funcion para los botoes de highlight y mute
    // Va con fecha para modificar asi la fecha de la sesion???
    //no es necesario la fecha porque luego de esto se modifica la sesion
    async function onIconClick(language, termId, newValue) {
        try {
            setFeedbackMessage("Modificando termino...");
            await termOptionsMutation.mutateAsync({
                lectureId: lecture.lectureId,
                attributeName: `${language}_terms_data`,
                newValue: {
                    ...lectureQuery.data.data[`${language}_terms_data`],
                    [termId]: newValue,
                },
            });
            setFeedbackMessage("");
        } catch (error) {
            console.log("🚀 ~ onIconClick ~ error:", error);
            setFeedbackMessage("Hubo un error, intentalo otra vez.");
        }
    }

    //funcion para cambiar al siguiente termino de la sesion
    //Va con fecha para modificar el...
    async function handleNextTerm(points) {
        const newPoints = points ? getNewPoints(points) : null;
        const newValue = removeFirstTerm();

        try {
            handleResetClick();
            setShowAnswer(false);
            // createDissappearingCard();
            if (termsIds.length > 1)
                setFeedbackMessage("Modificando sesion...");
            else {
                setFeedbackMessage("Terminando sesion...");
            }
            lectureSessionAndPointsMutation.mutate(
                {
                    lectureId: lecture.lectureId,
                    attributeName: `${lang}_session`,
                    pointsAttributeName: `${lang}_terms_points`,
                    newValue: newValue,
                    newPoints: newPoints,
                    lastReviewed: new Date().toISOString(),
                },
                {
                    onSuccess: (data, variables, context) => {
                        setFeedbackMessage("");

                        if (variables.newValue.terms.length < 1) {
                            navigate(lectureDir);
                        }
                    },
                }
            );
        } catch (error) {
            console.log("🚀 ~ onNewSessionCreate ~ error:", error);
            setFeedbackMessage("Hubo un error, intentalo otra vez.");
        }
    }

    function handleUndoClick() {
        childrenRef.current?.undo();
    }

    function handleResetClick() {
        childrenRef.current?.resetCanvas();
    }

    const nextButton = (
        <div className="containerNextButton">
            <p>Ya respondiste esta flashcard hoy</p>
            <NextButton
                next={termsIds.length > 1 ? true : false}
                onClick={handleNextTerm}
                loading={
                    lectureCreateSessionMutation.status === "loading" ||
                    lectureSessionAndPointsMutation.status === "loading" ||
                    termOptionsMutation.status === "loading"
                }
            />
        </div>
    );

    const currentTermId = termsIds[0];
    const validId =
        termsIds.length > 0 ? (termsDict[currentTermId] ? true : false) : true;

    const timeElapsedSinceLastAnswer = getHoursSinceAnswer();

    function getHoursSinceAnswer() {
        const pointsData = lectureQuery.data.data[`${lang}_terms_points`];
        const currentTermData = pointsData ? pointsData[currentTermId] : null;
        const answerTime = currentTermData ? currentTermData.date : null;

        if (!answerTime) {
            return HOURS_MIN + 1;
        }

        const today = new Date().getTime();
        const answerTimeMili = new Date(answerTime).getTime();
        const hoursSinceAnswer = (today - answerTimeMili) / ONE_HOUR;

        return Math.trunc(hoursSinceAnswer);
    }

    const errorFlashcard = <ErrorFlashCard />;

    const normalFlashCard = (
        <NormalTermCard
            termId={currentTermId}
            termsDict={termsDict}
            showAnswer={showAnswer}
            answerFunction={handleClick}
            flipped={lang === "spanish"}
            state={
                lectureQuery.data?.data?.[`${lang}_terms_data`]?.[currentTermId]
            }
            pointsInfo={lectureQuery.data.data[`${lang}_terms_points`]}
        />
    );

    const recognizeFlashCard = (
        <RecognizeTermCard
            termId={currentTermId}
            termsDict={termsDict}
            showAnswer={showAnswer}
            answerFunction={handleClick}
            state={
                lectureQuery.data?.data?.[`${lang}_terms_data`]?.[currentTermId]
            }
        />
    );

    const writeFlashCard = (
        <WriteKanjiCard
            termId={currentTermId}
            termsDict={termsDict}
            showAnswer={showAnswer}
            answerFunction={handleClick}
            state={
                lectureQuery.data?.data?.[`${lang}_terms_data`]?.[currentTermId]
            }
            handleUndo={handleUndoClick}
            handleReset={handleResetClick}
            ref={childrenRef}
        />
    );

    function removeFirstTerm() {
        const clonedArray = JSON.parse(JSON.stringify(termsIds));
        clonedArray.shift();

        const newValue = {
            options: lectureQuery.data.data[`${lang}_session`].options,
            terms: clonedArray,
            lastReviewed: new Date(),
        };

        return newValue;
    }

    function getNewPoints(points) {
        const termsQueryData = lectureQuery.data.data[`${lang}_terms_points`];
        const termsInfo = termsQueryData ? termsQueryData : {};

        const currentTermInfo = termsInfo[currentTermId]
            ? termsInfo[currentTermId].points
            : 0;
        const newTermInfo = {
            points: currentTermInfo + points,
            date: new Date().toISOString(),
        };
        const newValue = {
            ...termsInfo,
            [currentTermId]: newTermInfo,
        };
        return newValue;
    }

    function createDissappearingCard() {
        const now = new Date().getTime();
        const uniqueKey = `0-${now}`;

        setDisappearingCards([
            <DisappearingElement
                id={uniqueKey}
                timeStamp={now}
                key={uniqueKey}
                killFunc={() => removeDisappearingCard()}
                state={
                    lectureQuery.data?.data?.[`${lang}_terms_data`]?.[
                        currentTermId
                    ]
                }
                direction={" disappear-left"}
                element={chooseCard()}
            />,
            // <DisappearingCard
            //     id={uniqueKey}
            //     timeStamp={now}
            //     key={uniqueKey}
            //     // term={term}
            //     // answer={answer}
            //     showAnswer={showAnswer}
            //     killFunc={() => removeDisappearingCard()}
            //     direction={" disappear-left"}
            //     flipped={
            //         lang === "japanese" || lang === "recognize" ? false : true
            //     }
            // />,
            ...disappearingCards,
        ]);
    }

    function chooseCard() {
        return lang === "recognize"
            ? recognizeFlashCard
            : lang === "write"
            ? writeFlashCard
            : normalFlashCard;
    }

    return (
        <div className="ReviewV2Screen">
            <h2 id="title" className="lectureTitle" string={lecture.name}>
                {lecture.name}
            </h2>
            <ReviewOptionsModal
                visible={showModal}
                hideFunc={() => handleOptionsButtonClick(false)}
            />
            <ReviewPanel
                terms={termsIds}
                showFunc={() => handleOptionsButtonClick(true)}
                language={lang}
                isKanjiView={isKanjiView}
            />

            <div className="termCardDiv">
                {!validId
                    ? errorFlashcard
                    : lang === "recognize"
                    ? recognizeFlashCard
                    : lang === "write"
                    ? writeFlashCard
                    : normalFlashCard}
                {disappearingCards}
            </div>
            <div className="controls">
                <TermOptionsContainer
                    globalQuery={allLecturesDataQuery}
                    queryStatus={lectureQuery.status}
                    queryIsRefetching={lectureQuery.isRefetching}
                    hasQueryData={
                        lectureQuery.data?.data?.[`${lang}_terms_data`]
                            ? true
                            : false
                    }
                    state={
                        lectureQuery.data?.data?.[`${lang}_terms_data`]?.[
                            currentTermId
                        ]
                    } //
                    language={lang}
                    onIconClick={onIconClick}
                    termId={currentTermId}
                    validId={validId}
                    loading={
                        lectureCreateSessionMutation.status === "loading" ||
                        lectureSessionAndPointsMutation.status === "loading" ||
                        termOptionsMutation.status === "loading"
                    }
                />
                <div className="feedback">
                    <p>{feedbackMessage}</p>
                </div>
                {timeElapsedSinceLastAnswer >= 12 ? (
                    <AnswerButtons
                        termPointsData={
                            lectureQuery.data.data[`${lang}_terms_points`]
                        }
                        currentTermId={currentTermId}
                        termsIds={termsIds}
                        handleNextTerm={handleNextTerm}
                        onClick={handleNextTerm}
                        fixSession={fixSession}
                        loading={
                            lectureCreateSessionMutation.status === "loading" ||
                            lectureSessionAndPointsMutation.status ===
                                "loading" ||
                            termOptionsMutation.status === "loading"
                        }
                        validId={validId}
                    />
                ) : (
                    nextButton
                )}
            </div>
        </div>
    );
};

export default ReviewView;
