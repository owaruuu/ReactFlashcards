import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import TermCard from "../../components/LearnScreen/TermCard";
import LearnPanel from "../../components/LearnScreen/LearnPanel";
import DisappearingCard from "../../components/LearnScreen/DisappearingCard";
import OptionsModal from "../../components/OptionsModal/OptionsModal";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { shuffleArray } from "../../utils/utils";
import NormalTermCard from "../../components/LearnScreen/NormalTermCard";

const FlashCardView = () => {
    //outlet context
    const { lecture } = useOutletContext();

    //Flashcard State
    const [terms, setTerms] = useState(lecture.termList);
    const [originalTerms] = useState(lecture.termList);
    const [showAnswer, setShowAnswer] = useState(false);
    const [index, setIndex] = useState(0);
    const [disappearingCards, setDisappearingCards] = useState([]);

    //Modal State
    const [showModal, setShowModal] = useState(false);
    const [flip, setFlip] = useState(false);
    const [random, setRandom] = useState(false);

    //diccionario de terminos para poder acceder a los terminos en o(n)
    const [termsDict] = useState(() => {
        const termsDict = {};

        lecture.termList.forEach((term) => {
            termsDict[term.id] = term;
        });

        return termsDict;
    });

    //Effects
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

    //Funciones
    const handleClick = () => {
        setShowAnswer((prevState) => !prevState);
    };

    const removeDisappearingCard = () => {
        const now = new Date().getTime();

        setDisappearingCards((prevCards) => {
            return prevCards.filter((card) => {
                const diff = now - card.props.timeStamp;
                return diff < 299;
            });
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

    const goForward = () => {
        setShowAnswer(false);

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

    const goBack = () => {
        setShowAnswer(false);

        const now = new Date().getTime();
        const uniqueKey = `${index}-${now}`;

        setDisappearingCards([
            <DisappearingCard
                id={uniqueKey}
                timeStamp={now}
                key={uniqueKey}
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
            setIndex(terms.length - 1);
        } else {
            setIndex(index - 1);
        }
    };

    return (
        <div className="learnScreen">
            <OptionsModal
                hideFunc={() => handleOptionsButtonClick(false)}
                handleFlip={() => handleSwitchChange(0)}
                handleRandom={() => handleSwitchChange(1)}
                visible={showModal}
                flip={flip}
                random={random}
            />
            <h2 className="learnScreenTitle">{lecture.name}</h2>
            <LearnPanel
                terms={terms}
                index={index}
                showFunc={() => handleOptionsButtonClick(true)}
                flip={flip}
            />
            <div className="termCardSection">
                <button className="termCardButtonDesktop" onClick={goBack}>
                    <BiSolidLeftArrow></BiSolidLeftArrow>
                </button>
                <div className="termCardDiv">
                    <NormalTermCard
                        termId={terms[index].id}
                        termsDict={termsDict}
                        showAnswer={showAnswer}
                        answerFunction={handleClick}
                        flipped={flip}
                        state={null}
                    />
                    {disappearingCards}
                </div>
                <button className="termCardButtonDesktop" onClick={goForward}>
                    <BiSolidRightArrow></BiSolidRightArrow>
                </button>
            </div>
            <div className="mobileTermButtons">
                <button className="termCardButtonMobile" onClick={goBack}>
                    <BiSolidLeftArrow></BiSolidLeftArrow>
                </button>
                <button className="termCardButtonMobile" onClick={goForward}>
                    <BiSolidRightArrow></BiSolidRightArrow>
                </button>
            </div>
        </div>
    );
};

export default FlashCardView;
