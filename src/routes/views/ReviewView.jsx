import React from "react";
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

const ReviewView = (props) => {
    //lectureQuery viene lista
    const { setTab, allLecturesDataQuery, lectureQuery, lecture } =
        useOutletContext();

    const { lang } = useParams();
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const [disappearingCards, setDisappearingCards] = useState([]);
    const [feedbackMessage, setFeedbackMessage] = useState("");

    //diccionario de terminos para poder acceder a los terminos en o(n)
    const [termsDict] = useState(() => {
        const termsDict = {};
        lecture.termList.forEach((term) => {
            termsDict[term.id] = term;
        });

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
            setShowAnswer(false);
            createDissappearingCard();
            setFeedbackMessage("Cambiando termino...");
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

            navigate(`/lectures/${lecture.lectureId}`);
        } catch (error) {
            console.log("🚀 ~ onNewSessionCreate ~ error:", error);
            setFeedbackMessage(
                "No se pudo terminar la sesion, intentalo otra vez."
            );
        }
    }

    const nextButton =
        termsIds.length > 1 ? (
            <NextButton
                next={true}
                onClick={handleNextTerm}
                loading={
                    lectureSessionMutation.status === "loading" ||
                    lectureMutation.status === "loading"
                }
                // loading={true}
            />
        ) : (
            <NextButton
                onClick={handleEndSession}
                loading={
                    lectureSessionMutation.status === "loading" ||
                    lectureMutation.status === "loading"
                }
            />
        );

    const termId = termsIds[0];

    const term =
        termId !== undefined
            ? termsDict[termId].extra
                ? termsDict[termId].term + " - " + termsDict[termId].extra
                : termsDict[termId].term
            : "Cargando...";

    const answer =
        termId !== undefined ? termsDict[termId].answer : "Cargando...";

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
            <DisappearingCard
                id={uniqueKey}
                timeStamp={now}
                key={uniqueKey}
                term={term}
                answer={answer}
                showAnswer={showAnswer}
                killFunc={() => removeDisappearingCard()}
                direction={" disappear-left"}
                flipped={
                    lang === "japanese" || lang === "recognize" ? false : true
                }
            />,
            ...disappearingCards,
        ]);
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
                isKanjiView={props.isKanjiView}
            />

            <div className="termCardDiv">
                <NormalTermCard
                    // termsDict={termsDict}
                    // termsIds={termsIds}
                    // index={0}
                    term={term}
                    answer={answer}
                    showAnswer={showAnswer}
                    answerFunction={handleClick}
                    flipped={
                        lang === "japanese" || lang === "recognize"
                            ? false
                            : true
                    }
                    state={
                        lectureQuery.data?.data?.[`${lang}_terms_data`]?.[
                            termId
                        ]
                    }
                />
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
