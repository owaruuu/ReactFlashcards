import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import TermCard from "./TermCard";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { lectures } from "../../data/lectures";

const LearnScreen = () => {
    const { dispatch, appState, user } = useContext(AppContext);

    const currentLecture = lectures.find(
        (lecture) => lecture.lectureId === appState.currentLecture
    );

    const [lecture, setLecture] = useState(currentLecture);
    const [terms, setTerms] = useState(currentLecture.termList);
    console.log("🚀 ~ file: LearnScreen.js:16 ~ LearnScreen ~ terms:", terms);
    const [index, setIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    console.log(
        "🚀 ~ file: LearnScreen.js:9 ~ LearnScreen ~ user:",
        user.currentProgress
    );

    {
        //obtener id del current term
        //dependiendo del boton, agregar o modificar el user.currentProgress
        //con un valor de "learned" o 'learning'
    }

    const goBack = () => {
        console.log("click back");
        setShowAnswer(false);

        if (index - 1 < 0) {
            setIndex(lecture.termList.length - 1);
        } else {
            setIndex((prevIndex) => prevIndex - 1);
        }
    };

    const goForward = () => {
        console.log("click forward");
        setShowAnswer(false);

        if (index + 1 > lecture.termList.length - 1) {
            setIndex(0);
        } else {
            setIndex((prevIndex) => prevIndex + 1);
        }
    };

    const handleClick = () => {
        setShowAnswer((prevState) => !prevState);
    };

    const handleLearning = () => {
        //obtener id del current term
        const currentTermId = terms[index].id;

        //dependiendo del boton, agregar o modificar el user.currentProgress
        //con un valor de "learned" o 'learning'
        dispatch({
            type: "UPDATE_PROGRESS",
            payload: {
                currentProgress: {
                    ...user.currentProgress,
                    [lecture.lectureId]: {
                        ...user.currentProgress[lecture.lectureId],
                        [currentTermId]: "learning",
                    },
                },
            },
        });
    };

    const handleLearned = () => {
        //obtener id del current term
        const currentTermId = terms[index].id;

        //dependiendo del boton, agregar o modificar el user.currentProgress
        //con un valor de "learned" o 'learning'
        dispatch({
            type: "UPDATE_PROGRESS",
            payload: {
                currentProgress: {
                    ...user.currentProgress,
                    [lecture.lectureId]: {
                        ...user.currentProgress[lecture.lectureId],
                        [currentTermId]: "learned",
                    },
                },
            },
        });
    };

    const progressCells = terms.map((term) => {
        // console.log(term.id);

        const termState = user.currentProgress[lecture.lectureId][term.id];
        console.log(
            "🚀 ~ file: LearnScreen.js:101 ~ progressCells ~ termState:",
            termState
        );

        if (termState) {
            const className = `progressBarItem ${termState}`;
            return <div key={term.id} className={className}></div>;
        }

        return <div key={term.id} className="progressBarItem"></div>;
    });

    return (
        <div className="learnScreen">
            <h2>{lecture.name}</h2>
            <div className="progressBar">{progressCells}</div>
            <div className="termCardSection">
                <button onClick={goBack}>
                    <BiLeftArrow></BiLeftArrow>
                </button>
                <TermCard
                    terms={lecture.termList}
                    index={index}
                    showAnswer={showAnswer}
                    answerFunction={handleClick}
                />
                <button onClick={goForward}>
                    <BiRightArrow></BiRightArrow>
                </button>
            </div>
            <div className="learnButtons">
                <button
                    // className="learningButton learning"
                    className={
                        user.currentProgress[lecture.lectureId][
                            terms[index].id
                        ] === "learning"
                            ? "learningButton learning"
                            : "learningButton"
                    }
                    onClick={handleLearning}
                >
                    Learning
                </button>
                <button
                    className={
                        user.currentProgress[lecture.lectureId][
                            terms[index].id
                        ] === "learned"
                            ? "learnedButton learned"
                            : "learnedButton"
                    }
                    onClick={handleLearned}
                >
                    Learned
                </button>
            </div>
        </div>
    );
};

export default LearnScreen;
