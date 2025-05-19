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
    useSessionMutation,
    useSessionPointsMutation,
} from "../../hooks/userDataQueryHook";
import TermOptionsContainer from "../../components/TermOptionButtons/TermOptionsContainer";
import { useParams } from "react-router-dom";
import { getLectureQueryString } from "../../utils/utils";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NormalTermCard from "../../components/LearnScreen/NormalTermCard";
import RecognizeTermCard from "../../components/LearnScreen/Flashcards/RecognizeTermCard";
import WriteKanjiCard from "../../components/LearnScreen/Flashcards/WriteKanjiCard";
import DisappearingElement from "../../components/Misc/DisappearingElement";
import AnswerButtons from "../../components/ReviewView/AnswerButtons.jsx";
import ErrorFlashCard from "../../components/LearnScreen/Flashcards/ErrorFlashCard.jsx";

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

    const lectureSessionMutation = useSessionMutation(
        getLectureQueryString(lecture.lectureId)
    );

    const lectureSessionAndPointsMutation = useSessionPointsMutation(
        getLectureQueryString(lecture.lectureId)
    );

    //helper para cambiar el estado de los tabs
    useEffect(() => {
        setTab(lang);
    }, []);

    //current sesion
    // const [termsIds, setTermsIds] = useState(getSessionTermIds);

    //acceder a terminos directamente
    const termsIds = lectureQuery.data.data[`${lang}_session`].terms;
    // console.log("🚀 ~ ReviewView ~ termsIds:", termsIds);

    //revisa los ids, se hace cada vez que cambie el valor del query
    //TODO revisar si la session esta vacia y navegar ?
    // useEffect(() => {
    //     console.log("effect de lecture query");
    //     if (lectureQuery.data.data[`${lang}_session`].terms.length < 1) {
    //         console.log("ya no quedan terminos");

    //         // navigate(lectureDir);
    //     }
    // }, [lectureQuery]);

    // useEffect(() => {
    //     if (termsIds.length < 1) navigate(lectureDir);
    // }, [lectureQuery]);

    //Reviso si hay discrepancias entre las ids en la sesion y las ids que existen en la sesion
    //si hay cualquier diferencia tengo que reescribir la sesion en la DB al finalizar
    // function checkSessionValidity() {
    //     let dbSessionTermIds = lectureQuery.data.data[`${lang}_session`].terms;
    //     let validSessionIds = [];

    //     dbSessionTermIds.forEach((id) => {
    //         if (termsDict[id]) {
    //             validSessionIds.push(id);
    //         }
    //     });

    //     //TODO si hubieron 'cambios' mandar un mutate a la sesion con los nuevos ids
    //     if (dbSessionTermIds !== validSessionIds) {
    //         console.warn("hay discrepancias");
    //         console.log(
    //             "🚀 ~ checkSessionValidity ~ dbSessionTermIds:",
    //             dbSessionTermIds
    //         );
    //         console.log(
    //             "🚀 ~ dbSessionTermIds.forEach ~ validSessionIds:",
    //             validSessionIds
    //         );
    //     }
    //     return validSessionIds;
    // }

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

            await lectureSessionMutation.mutateAsync(
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
        const newPoints = getNewPoints(points);
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
                        // console.log(
                        //     "🚀 ~ handleNextTerm ~ data,variables,context:",
                        //     data,
                        //     variables,
                        //     context
                        // );
                        // console.warn(
                        //     "🚀 ~ useEffect ~ lectureQuery.data.data[`${lang}_session`].terms.length:",
                        //     lectureQuery.data.data[`${lang}_session`].terms
                        //         .length
                        // );
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

    // async function handleEndSession() {
    //     const newValue = removeFirstTerm();

    //     try {
    //         setFeedbackMessage("Terminando sesion...");
    //         await lectureSessionMutation.mutateAsync({
    //             lectureId: lecture.lectureId,
    //             attributeName: `${lang}_session`,
    //             newValue: newValue,
    //         });

    //         navigate(lectureDir);
    //     } catch (error) {
    //         console.log("🚀 ~ onNewSessionCreate ~ error:", error);
    //         setFeedbackMessage(
    //             "No se pudo terminar la sesion, intentalo otra vez."
    //         );
    //     }
    // }

    // function handleUndoClick(canvasRef) {
    //     canvasRef.current?.undo();
    // }

    // const handleResetClick = (canvasRef) => {
    //     canvasRef.current?.resetCanvas();
    // };

    function handleUndoClick() {
        childrenRef.current?.undo();
    }

    function handleResetClick() {
        childrenRef.current?.resetCanvas();
    }

    // const nextButton = (
    //     <NextButton
    //         next={termsIds.length > 1 ? true : false}
    //         onClick={termsIds.length > 1 ? handleNextTerm : handleEndSession}
    //         loading={
    //             lectureSessionMutation.status === "loading" ||
    //             termOptionsMutation.status === "loading"
    //         }
    //     />
    // );

    const currentTermId = termsIds[0];
    const validId =
        termsIds.length > 0 ? (termsDict[currentTermId] ? true : false) : true;

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
                        lectureSessionMutation.status === "loading" ||
                        lectureSessionAndPointsMutation.status === "loading" ||
                        termOptionsMutation.status === "loading"
                    }
                />
                <p className="feedback">{feedbackMessage}</p>
                <AnswerButtons
                    termPointsData={
                        lectureQuery.data.data[`${lang}_terms_points`]
                    }
                    termsIds={termsIds}
                    handleNextTerm={handleNextTerm}
                    // handleEndSession={handleEndSession}
                    onClick={handleNextTerm}
                    fixSession={fixSession}
                    loading={
                        lectureSessionMutation.status === "loading" ||
                        lectureSessionAndPointsMutation.status === "loading" ||
                        termOptionsMutation.status === "loading"
                    }
                    validId={validId}
                />
                {/* {nextButton} */}
            </div>
        </div>
    );
};

export default ReviewView;
