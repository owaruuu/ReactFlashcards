import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import TermCard from "./TermCard";
import DisappearingCard from "./DisappearingCard";
import BackButton from "../BackButton";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { lectures } from "../../data/lectures";

const LearnScreen = () => {
    const { dispatch, appState, user } = useContext(AppContext);

    const currentLecture = lectures.find(
        (lecture) => lecture.lectureId === appState.currentLecture
    );

    const [lecture, setLecture] = useState(currentLecture);
    const [terms, setTerms] = useState(currentLecture.termList);
    const [index, setIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [disappearingCards, setDisappearingCards] = useState([]);
    const [blocked, setBlocked] = useState(false);

    const removeDisappearingCard = (id) => {
        setDisappearingCards((prevCards) =>
            prevCards.filter((card) => {
                console.log(card.key, id);
                return Number(card.key) !== id;
            })
        );
    };

    const goBack = () => {
        console.log("click back");
        setShowAnswer(false);

        setDisappearingCards([
            <DisappearingCard
                key={index}
                terms={lecture.termList}
                index={index}
                showAnswer={showAnswer}
                killFunc={() => removeDisappearingCard(index)}
                direction={" disappear-right"}
            />,
            ...disappearingCards,
        ]);

        if (index - 1 < 0) {
            setIndex(lecture.termList.length - 1);
        } else {
            setIndex((prevIndex) => prevIndex - 1);
        }
    };

    const goForward = () => {
        setShowAnswer(false);

        setDisappearingCards([
            <DisappearingCard
                key={index}
                terms={lecture.termList}
                index={index}
                showAnswer={showAnswer}
                killFunc={() => removeDisappearingCard(index)}
                direction={" disappear-left"}
            />,
            ...disappearingCards,
        ]);

        if (index + 1 > lecture.termList.length - 1) {
            setIndex(0);
        } else {
            setIndex((prevIndex) => prevIndex + 1);
        }
    };

    const handleClick = () => {
        setShowAnswer((prevState) => !prevState);
    };

    const handleLearnButton = (value) => {
        setBlocked(true);
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
                        [currentTermId]: value,
                    },
                },
            },
        });
    };

    useEffect(() => {
        if (blocked) {
            const timer = setTimeout(() => {
                goForward();
                setBlocked(false);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [blocked]);

    const progressCells = terms.map((term, termIndex) => {
        // console.log(term.id);

        let classNames = "progressBarItem";

        const termState = user.currentProgress?.[lecture.lectureId]?.[term.id];

        if (termState) {
            classNames += ` ${termState}`;
        } else {
            return;
        }

        if (termIndex == index) {
            // console.log("entre aqui");
            classNames += " activeItem";
        }
        return <div key={term.id} className={classNames}></div>;
    });

    const learnButtons = [
        {
            text: "Learning",
            id: "learning",
            classes: ["learningButton", "learningButton learning"],
        },
        {
            text: "Learned",
            id: "learned",
            classes: ["learnedButton", "learnedButton learned"],
        },
    ];

    return (
        <div className="learnScreen">
            <h2>{lecture.name}</h2>
            <BackButton options={{ currentScreen: "lecture" }} />
            {user.currentProgress && (
                <div className="progressBar">{progressCells}</div>
            )}
            <div className="termCardSection">
                <button onClick={goBack}>
                    <BiLeftArrow></BiLeftArrow>
                </button>
                <div className="termCardDiv">
                    <TermCard
                        terms={lecture.termList}
                        index={index}
                        showAnswer={showAnswer}
                        answerFunction={handleClick}
                    />
                    {disappearingCards}
                </div>

                <button onClick={goForward}>
                    <BiRightArrow></BiRightArrow>
                </button>
            </div>
            <div className="learnButtons">
                {user.currentProgress &&
                    learnButtons.map((button) => (
                        <button
                            className={
                                user.currentProgress[lecture.lectureId]?.[
                                    terms[index].id
                                ] === button.id
                                    ? button.classes[1]
                                    : button.classes[0]
                            }
                            onClick={() => handleLearnButton(button.id)}
                            disabled={blocked}
                        >
                            {button.text}
                        </button>
                    ))}
            </div>
        </div>
    );
};

export default LearnScreen;
