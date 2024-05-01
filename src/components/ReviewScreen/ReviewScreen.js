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

    //QUERIES
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

    async function handleNextTerm() {
        setShowAnswer(false);

        const clonedArray = JSON.parse(JSON.stringify(termsIds));
        clonedArray.shift();

        const newValue = {
            options:
                lectureQuery.data.data[`${props.language}_session`].options,
            terms: clonedArray,
            lastReviewed: new Date(),
        };

        try {
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
        // console.log("intentar terminar sesion");
        const clonedArray = JSON.parse(JSON.stringify(termsIds));
        clonedArray.shift();
        // console.log("🚀 ~ handleNextTerm ~ newValue:", clonedArray);
        // console.log(
        //     "🚀 ~ ReviewScreen ~ lectureQuery.data.data[`${props.language}_session`]:",
        //     lectureQuery.data.data[`${props.language}_session`]
        // );
        //aqui hacer la mutacion
        //necesito eliminar el primer id del array

        const newValue = {
            options:
                lectureQuery.data.data[`${props.language}_session`].options,
            terms: clonedArray,
            lastReviewed: new Date(),
        };

        try {
            await lectureSessionMutation.mutateAsync({
                lectureId: lectureId,
                attributeName: `${props.language}_session`,
                newValue: newValue,
                lastReviewed: new Date(),
            });

            dispatch({
                type: "CHANGE_SCREEN",
                payload: {
                    currentScreen: `lecture-${props.language}`,
                },
            });
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
                loading={lectureSessionMutation.status === "loading"}
            />
        ) : (
            <NextButton
                onClick={handleEndSession}
                loading={lectureSessionMutation.status === "loading"}
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
                    flipped={false}
                />
                {disappearingCards}
            </div>
            <div className="controls">
                <p></p>
                <p>{feedbackMessage}</p>
                {nextButton}
            </div>
        </div>
    );
};

export default ReviewScreen;
