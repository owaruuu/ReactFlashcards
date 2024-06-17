import React from "react";
import "../../components/ReviewScreen/Styles/ReviewScreen.css";
import "../../components/Styles/Main.css";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import ReviewOptionsModal from "../../components/ReviewScreen/ReviewOptionsModal";
import ReviewPanel from "../../components/ReviewScreen/ReviewPanel";
import TermCard from "../../components/LearnScreen/TermCard";
import DisappearingCard from "../../components/LearnScreen/DisappearingCard";
import NextButton from "../../components/ReviewScreen/NextButton";
import {
    useLectureMutation,
    useLectureQuery,
    useSessionMutation,
} from "../../hooks/userDataQueryHook";
import { useQueryClient } from "react-query";
import TermOptionsContainer from "../../components/TermOptionButtons/TermOptionsContainer";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { getLectureQueryString } from "../../utils/utils";

const ReviewView = () => {
    const { dispatch, appState, user, lectures, gotLectures, loggedIn } =
        useContext(AppContext);

    const { lectureId, lang } = useParams();

    const [config, setConfig] = useState(false);
    const [lecture, setLecture] = useState({
        lectureId: null,
        name: "",
        testId: null,
        lectureGroup: "",
        termList: [],
    });
    const [showModal, setShowModal] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const [disappearingCards, setDisappearingCards] = useState([]);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [termsDict, setTermsDict] = useState({});
    // console.log("🚀 ~ ReviewScreen ~ termsDict:", termsDict);

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
    const lectureQuery = useQueryClient().getQueryState(
        getLectureQueryString(lectureId)
    );
    // console.log("🚀 ~ ReviewScreen ~ lectureQuery:", lectureQuery);

    //MUTATIONS
    const lectureMutation = useLectureMutation(
        getLectureQueryString(lectureId)
    );

    const lectureSessionMutation = useSessionMutation(
        getLectureQueryString(lectureId)
    );

    useEffect(() => {
        const configLecture = () => {
            const currentLecture = lectures.find(
                (lecture) => lecture.lectureId === lectureId
            );
            setLecture(currentLecture);

            const termsDict = {};
            currentLecture["termList"].forEach((term) => {
                termsDict[term.id] = term;
            });

            setTermsDict(termsDict);
        };

        if (!config && gotLectures) {
            configLecture();
            setConfig(true);
        }
    }, [gotLectures]);

    //loading
    if (!gotLectures || lectureQuery.isFetching || !config) {
        return (
            <div className="lectureScreen">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    const termsIds = lectureQuery.data.data[`${lang}_session`].terms;
    // console.log("🚀 ~ ReviewScreen ~ termsIds:", termsIds);
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
            // createDissappearingCard();
            setFeedbackMessage("Terminando sesion...");
            await lectureSessionMutation.mutateAsync({
                lectureId: lectureId,
                attributeName: `${lang}_session`,
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
                flipped={lang === "japanese" ? false : true}
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
            <ReviewPanel
                terms={termsIds}
                showFunc={() => handleOptionsButtonClick(true)}
                language={lang}
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
                    flipped={lang === "japanese" ? false : true}
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
                    globalQuery={globalQuery}
                    queryStatus={lectureQuery}
                    queryData={lectureQuery.data?.data?.[`${lang}_terms_data`]}
                    termData={
                        lectureQuery.data?.data?.[`${lang}_terms_data`]?.[
                            termId
                        ]
                    }
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
