import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import TermCard from "./TermCard";
import DisappearingCard from "./DisappearingCard";
import LearnPanel from "./LearnPanel";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { BiSolidLeftArrow } from "react-icons/bi";
import { BiSolidRightArrow } from "react-icons/bi";
// import { lectures } from "../../data/lectures";
import { shuffleArray } from "../../utils/utils";
import OptionsModal from "../OptionsModal/OptionsModal";
import NextRedTermButton from "./NextRedTermButton";

const LearnScreen = (props) => {
    const { dispatch, appState, user, lectures } = useContext(AppContext);

    const currentLecture = lectures.find(
        (lecture) => lecture.lectureId === appState.currentLecture
    );

    const [lecture, setLecture] = useState(currentLecture);
    const [originalTerms, setOriginalTerms] = useState(currentLecture.termList);
    const [terms, setTerms] = useState(currentLecture.termList);
    const [index, setIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [disappearingCards, setDisappearingCards] = useState([]);
    const [blocked, setBlocked] = useState(false);
    const [flip, setFlip] = useState(false);
    const [random, setRandom] = useState(false);

    const removeDisappearingCard = () => {
        const now = new Date().getTime();

        setDisappearingCards((prevCards) => {
            return prevCards.filter((card) => {
                const diff = now - card.props.timeStamp;
                return diff < 299;
            });
        });
    };

    const goBack = () => {
        setShowAnswer(false);
        setBlocked(false);

        const now = new Date().getTime();
        const uniqueKey = `${index}-${now}`;

        setDisappearingCards([
            <DisappearingCard
                id={uniqueKey}
                timeStamp={now}
                key={uniqueKey}
                // terms={terms}
                // index={index}
                term={
                    terms[index].extra
                        ? terms[index].term + " - " + terms[index].extra
                        : terms[index].term
                }
                answer={terms[index].answer}
                showAnswer={showAnswer}
                killFunc={() => removeDisappearingCard()}
                direction={" disappear-right"}
                flipped={flip}
            />,
            ...disappearingCards,
        ]);

        if (index - 1 < 0) {
            setIndex(lecture.termList.length - 1);
        } else {
            setIndex(index - 1);
        }
    };

    const goForward = () => {
        setShowAnswer(false);
        setBlocked(false);

        const now = new Date().getTime();
        const uniqueKey = `${index}-${now}`;

        setDisappearingCards([
            <DisappearingCard
                key={uniqueKey}
                terms={terms}
                index={index}
                id={uniqueKey}
                timeStamp={now}
                term={
                    terms[index].extra
                        ? terms[index].term + " - " + terms[index].extra
                        : terms[index].term
                }
                answer={terms[index].answer}
                showAnswer={showAnswer}
                killFunc={() => removeDisappearingCard()}
                direction={" disappear-left"}
                flipped={flip}
            />,
            ...disappearingCards,
        ]);

        if (index + 1 > lecture.termList.length - 1) {
            setIndex(0);
        } else {
            setIndex(index + 1);
        }
    };

    const findNextRed = () => {
        const currentLectureProgress = user.currentProgress[lecture.lectureId];

        for (let i = index + 1; i < terms.length; i++) {
            if (
                currentLectureProgress[
                    flip ? `j${terms[i].id}` : terms[i].id
                ] == "learning"
            ) {
                return i;
            }
        }

        for (let i = 0; i < index; i++) {
            if (
                currentLectureProgress[
                    flip ? `j${terms[i].id}` : terms[i].id
                ] == "learning"
            ) {
                return i;
            }
        }

        return -1;
    };

    const handleNextRedClick = () => {
        const nextIndex = findNextRed();

        if (nextIndex === -1) {
            return alert("No red term found.");
        }

        setShowAnswer(false);
        setBlocked(false);

        const now = new Date().getTime();
        const uniqueKey = `${index}-${now}`;

        setDisappearingCards([
            <DisappearingCard
                key={uniqueKey}
                terms={terms}
                index={index}
                id={uniqueKey}
                timeStamp={now}
                term={
                    terms[index].extra
                        ? terms[index].term + " - " + terms[index].extra
                        : terms[index].term
                }
                answer={terms[index].answer}
                showAnswer={showAnswer}
                killFunc={() => removeDisappearingCard()}
                direction={" disappear-left"}
                flipped={flip}
            />,
            ...disappearingCards,
        ]);

        setIndex(nextIndex);
    };

    const handleClick = () => {
        setShowAnswer((prevState) => !prevState);
    };

    const handleLearnButton = (value) => {
        setBlocked(true);

        //obtener id del current term
        let currentTermId = terms[index].id;

        if (flip) {
            currentTermId = "j" + currentTermId;
        }

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

    const handleOptionsButtonClick = (state) => {
        setShowModal(state);
    };

    const handleSwitchChange = (input) => {
        if (input === 0) {
            //si es el flip
            setFlip((prev) => !prev);
        } else {
            //si es el random
            setRandom((prev) => !prev);
        }

        setIndex(0);
    };

    useEffect(() => {
        if (blocked) {
            const timer = setTimeout(() => {
                goForward();
                setBlocked(false);
                // }
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [blocked]);

    useEffect(() => {
        if (random) {
            //shuffle array
            let randomTermList = [];
            //deep copy la leccion
            randomTermList = JSON.parse(JSON.stringify(terms));

            //randomiza and set
            randomTermList = shuffleArray(randomTermList);

            setTerms(randomTermList);
        } else {
            //return to original
            setTerms(originalTerms);
        }
    }, [random]);

    const populateProgressCells = () => {
        let firstHalf = [],
            secondHalf = [];

        terms.map((term, termIndex) => {
            let classNames = "progressBarItem";
            const termId = flip ? "j" + term.id : term.id;

            const termState =
                user.currentProgress?.[lecture.lectureId]?.[termId];

            if (termState) {
                classNames += ` ${termState}`;
            }

            if (termIndex == index) {
                classNames += " activeItem";
            }

            if (termIndex > terms.length / 2) {
                secondHalf.push(
                    <div key={term.id} className={classNames}></div>
                );
            } else {
                firstHalf.push(
                    <div key={term.id} className={classNames}></div>
                );
            }
        });

        return [firstHalf, secondHalf];
    };

    const progressCells = populateProgressCells();

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
            <OptionsModal
                visible={showModal}
                hideFunc={() => handleOptionsButtonClick(false)}
                handleFlip={() => handleSwitchChange(0)}
                handleRandom={() => handleSwitchChange(1)}
                flip={flip}
                random={random}
            />
            {/* {props.isReview && (
                <DismissableBanner
                    text={
                        "Ocupa el modo Memorizar para marcar las palabras que ya has aprendido."
                    }
                    bgColor={"#ab071d"}
                    color={"white"}
                    transition={1}
                ></DismissableBanner>
            )} */}
            <h2 className="learnScreenTitle">{lecture.name}</h2>
            <LearnPanel
                terms={terms}
                index={index}
                showFunc={() => handleOptionsButtonClick(true)}
                flip={flip}
            />
            {props.isReview
                ? ""
                : user.currentProgress && (
                      <div className="progressBar">
                          <div className="progressHalf">{progressCells[0]}</div>
                          <div className="progressHalf">{progressCells[1]}</div>
                      </div>
                  )}
            <div className="termCardSection">
                <button className="termCardButtonDesktop" onClick={goBack}>
                    <BiSolidLeftArrow></BiSolidLeftArrow>
                </button>
                <div className="termCardDiv">
                    <TermCard
                        // terms={terms}
                        // index={index}
                        //
                        term={
                            terms[index].extra
                                ? terms[index].term + " - " + terms[index].extra
                                : terms[index].term
                        }
                        answer={terms[index].answer}
                        showAnswer={showAnswer}
                        answerFunction={handleClick}
                        flipped={flip}
                    />
                    {disappearingCards}
                </div>
                <button className="termCardButtonDesktop" onClick={goForward}>
                    <BiSolidRightArrow></BiSolidRightArrow>
                </button>
            </div>
            <div className="learnButtons">
                {props.isReview
                    ? ""
                    : user.currentProgress &&
                      learnButtons.map((button, id) => {
                          const modifier = flip ? "j" : "";
                          return (
                              <button
                                  key={id}
                                  className={
                                      user.currentProgress[lecture.lectureId]?.[
                                          modifier + terms[index].id
                                      ] === button.id
                                          ? button.classes[1]
                                          : button.classes[0]
                                  }
                                  onClick={() => handleLearnButton(button.id)}
                                  disabled={blocked}
                              >
                                  {button.text}
                              </button>
                          );
                      })}
            </div>
            <div className="mobileTermButtons">
                <button className="termCardButtonMobile" onClick={goBack}>
                    <BiSolidLeftArrow></BiSolidLeftArrow>
                </button>
                <button className="termCardButtonMobile" onClick={goForward}>
                    <BiSolidRightArrow></BiSolidRightArrow>
                </button>
            </div>
            {props.isReview ? (
                ""
            ) : (
                <NextRedTermButton func={handleNextRedClick} />
            )}
        </div>
    );
};

export default LearnScreen;
