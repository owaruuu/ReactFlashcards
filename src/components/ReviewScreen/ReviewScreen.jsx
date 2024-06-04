import React from "react";
import "./Styles/ReviewScreen.css";
import "../Styles/Main.css";
import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import ReviewOptionsModal from "./ReviewOptionsModal";
import ReviewPanel from "./ReviewPanel";
import TermCard from "../LearnScreen/TermCard";
import DisappearingCard from "../LearnScreen/DisappearingCard";
import NextButton from "./NextButton";
import {
    useLectureMutation,
    useLectureQuery,
    useSessionMutation,
} from "../../hooks/useUserDataQuery";
import { useQueryClient } from "react-query";
import TermOptionsContainer from "../TermOptionButtons/TermOptionsContainer";

const ReviewScreen = (props) => {
    const { dispatch, appState, user, lectures, loggedIn } =
        useContext(AppContext);

    const currentLecture = lectures.find(
        (lecture) => lecture.lectureId === appState.currentLecture
    );
    const lectureId = currentLecture.lectureId;

    const [lecture, setLecture] = useState(currentLecture);
    const [showModal, setShowModal] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const [disappearingCards, setDisappearingCards] = useState([]);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [termsDict, setTermsDict] = useState(() => {
        const termsDict = {};
        lecture["termList"].forEach((term) => {
            termsDict[term.id] = term;
        });
        return termsDict;
    });

    const removeDisappearingCard = () => {
        const now = new Date().getTime();

        setDisappearingCards((prevCards) => {
            return prevCards.filter((card) => {
                const diff = now - card.props.timeStamp;
                return diff < 299;
            });
        });
    };

    //QUERIES
    const globalQuery = useQueryClient().getQueryState("allDataForUser");
    const lectureQuery = useLectureQuery(lectureId, loggedIn ? true : false);
    // console.log("🚀 ~ ReviewScreen ~ lectureQuery:", lectureQuery);

    //MUTATIONS
    const lectureMutation = useLectureMutation(`id-${lectureId}-LectureQuery`);
    // console.log("🚀 ~ ReviewScreen ~ lectureMutation:", lectureMutation)

    const lectureSessionMutation = useSessionMutation(
        `id-${lectureId}-LectureQuery`
    );
    // console.log(
    //     "🚀 ~ ReviewScreen ~ lectureSessionMutation:",
    //     lectureSessionMutation
    // );

    const termsIds = lectureQuery.data.data[`${props.language}_session`].terms;
    const handleOptionsButtonClick = (state) => {
        setShowModal(state);
    };

    const handleClick = () => {
        setShowAnswer((prevState) => !prevState);
    };

    //funcion para los botoes de highlight y mute
    async function onIconClick(language, termId, newValue) {
        try {
            setFeedbackMessage("Modificando termino...");
            await lectureMutation.mutateAsync({
                lectureId: lectureId,
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
                lectureId: lectureId,
                attributeName: `${props.language}_session`,
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
            // createDissappearingCard();
            setFeedbackMessage("Terminando sesion...");
            await lectureSessionMutation.mutateAsync({
                lectureId: lectureId,
                attributeName: `${props.language}_session`,
                newValue: newValue,
                // lastReviewed: new Date(),
            });

            // dispatch({
            //     type: "CHANGE_SCREEN",
            //     payload: {
            //         currentScreen: `lecture-${props.language}`,
            //     },
            // });
        } catch (error) {
            // console.log("🚀 ~ onNewSessionCreate ~ error:", error);
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
    // console.log("🚀 ~ ReviewScreen ~ termId:", termId);
    const term =
        termId !== undefined
            ? termsDict[termId].extra
                ? termsDict[termId].term + " - " + termsDict[termId].extra
                : termsDict[termId].term
            : "Cargando...";
    // console.log("🚀 ~ ReviewScreen ~ term:", term);
    const answer =
        termId !== undefined ? termsDict[termId].answer : "Cargando...";
    // console.log("🚀 ~ ReviewScreen ~ answer:", answer);

    function removeFirstTerm() {
        const clonedArray = JSON.parse(JSON.stringify(termsIds));
        clonedArray.shift();

        const newValue = {
            options:
                lectureQuery.data.data[`${props.language}_session`].options,
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
                flipped={props.language === "japanese" ? false : true}
            />,
            ...disappearingCards,
        ]);
    }

    return (
        <div className="ReviewV2Screen">
            {/* {props.language} */}
            <ReviewOptionsModal
                visible={showModal}
                hideFunc={() => handleOptionsButtonClick(false)}
            />
            <h2 className="learnScreenTitle">{lecture.name}</h2>
            <ReviewPanel
                terms={termsIds}
                showFunc={() => handleOptionsButtonClick(true)}
                language={props.language}
            />

            <div className="termCardDiv">
                <TermCard
                    termsDict={termsDict}
                    termsIds={termsIds}
                    //
                    term={term}
                    answer={answer}
                    index={0}
                    showAnswer={showAnswer}
                    answerFunction={handleClick}
                    flipped={props.language === "japanese" ? false : true}
                    state={
                        lectureQuery.data?.data?.[
                            `${props.language}_terms_data`
                        ]?.[termId]
                    }
                />
                {disappearingCards}
            </div>
            <div className="controls">
                <TermOptionsContainer
                    globalQuery={globalQuery}
                    queryStatus={lectureQuery}
                    queryData={
                        lectureQuery.data?.data?.[
                            `${props.language}_terms_data`
                        ]
                    }
                    termData={
                        lectureQuery.data?.data?.[
                            `${props.language}_terms_data`
                        ]?.[termId]
                    }
                    language={props.language}
                    onIconClick={onIconClick}
                    termId={termId}
                />
                <p>{feedbackMessage}</p>
                {nextButton}
            </div>
        </div>
    );
};

export default ReviewScreen;
