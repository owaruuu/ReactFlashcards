import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import TermCard from "./TermCard";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { lectures } from "../../data/lectures";

const LearnScreen = () => {
    const { dispatch, appState } = useContext(AppContext);
    const [lecture, setLecture] = useState(() => {
        return lectures.find(
            (lecture) => lecture.lectureId === appState.currentLecture
        );
    });

    const [index, setIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

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

    return (
        <div className="learnScreen">
            <h2>{lecture.name}</h2>
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
                <button className="learningButton" onClick={handleLearning}>
                    Learning
                </button>
                <button className="learnedButton" onClick={handleLearned}>
                    Learned
                </button>
            </div>
        </div>
    );
};

const handleLearning = () => {
    console.log("handleLearning");
};

const handleLearned = () => {
    console.log("handleLearned");
};

export default LearnScreen;
