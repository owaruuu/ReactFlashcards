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
    useLectureMutation,
    useSessionMutation,
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
    const lectureMutation = useLectureMutation(
        getLectureQueryString(lecture.lectureId)
    );

    const lectureSessionMutation = useSessionMutation(
        getLectureQueryString(lecture.lectureId)
    );

    //helper para cambiar el estado de los tabs
    useEffect(() => {
        setTab(lang);
    }, []);

    //current sesion
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

    //funcion para los botoes de highlight y mute
    async function onIconClick(language, termId, newValue) {
        try {
            setFeedbackMessage("Modificando termino...");
            await lectureMutation.mutateAsync({
                lectureId: lecture.lectureId,
                attributeName: `${language}_terms_data`,
                newValue: {
                    ...lectureQuery.data.data[`${language}_terms_data`],
                    [termId]: newValue,
                },
            });

            setShowAnswer(false);

            termsIds.length > 1 ? handleNextTerm() : handleEndSession();
        } catch (error) {
            console.log("🚀 ~ onIconClick ~ error:", error);
            setFeedbackMessage("Hubo un error, intentalo otra vez.");
        }
    }

    async function handleNextTerm() {
        const newValue = removeFirstTerm();

        try {
            handleResetClick();
            setShowAnswer(false);
            // createDissappearingCard();
            setFeedbackMessage("Modificando sesion...");
            await lectureSessionMutation.mutateAsync({
                lectureId: lecture.lectureId,
                attributeName: `${lang}_session`,
                newValue: newValue,
            });

            setFeedbackMessage("");
        } catch (error) {
            console.log("🚀 ~ onNewSessionCreate ~ error:", error);
            setFeedbackMessage("Hubo un error, intentalo otra vez.");
        }
    }

    async function handleEndSession() {
        const newValue = removeFirstTerm();

        try {
            setFeedbackMessage("Terminando sesion...");
            await lectureSessionMutation.mutateAsync({
                lectureId: lecture.lectureId,
                attributeName: `${lang}_session`,
                newValue: newValue,
            });

            navigate(lectureDir);
        } catch (error) {
            console.log("🚀 ~ onNewSessionCreate ~ error:", error);
            setFeedbackMessage(
                "No se pudo terminar la sesion, intentalo otra vez."
            );
        }
    }

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

    const nextButton = (
        <NextButton
            next={termsIds.length > 1 ? true : false}
            onClick={termsIds.length > 1 ? handleNextTerm : handleEndSession}
            loading={
                lectureSessionMutation.status === "loading" ||
                lectureMutation.status === "loading"
            }
        />
    );

    const termId = termsIds[0];

    const normalFlashCard = (
        <NormalTermCard
            termId={termId}
            termsDict={termsDict}
            showAnswer={showAnswer}
            answerFunction={handleClick}
            flipped={lang === "spanish"}
            state={lectureQuery.data?.data?.[`${lang}_terms_data`]?.[termId]}
        />
    );

    const recognizeFlashCard = (
        <RecognizeTermCard
            termId={termId}
            termsDict={termsDict}
            showAnswer={showAnswer}
            answerFunction={handleClick}
            state={lectureQuery.data?.data?.[`${lang}_terms_data`]?.[termId]}
        />
    );

    const writeFlashCard = (
        <WriteKanjiCard
            termId={termId}
            termsDict={termsDict}
            showAnswer={showAnswer}
            answerFunction={handleClick}
            state={lectureQuery.data?.data?.[`${lang}_terms_data`]?.[termId]}
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
                    lectureQuery.data?.data?.[`${lang}_terms_data`]?.[termId]
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
                {lang === "recognize"
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
                            termId
                        ]
                    } //
                    language={lang}
                    onIconClick={onIconClick}
                    termId={termId}
                />
                <p>{feedbackMessage}</p>
                {nextButton}
            </div>
        </div>
    );
};

export default ReviewView;
