import { useEffect, useState } from "react";
import TestDivider from "../Misc/TestDivider";
import { shuffleArray } from "../../utils/utils";

const Mondai = (props) => {
    const { mondai, problem, correct, incorrect, thinking, handleClick } =
        props;

    //el array de opciones revueltas
    const [currentOptionsElem, setCurrentOptionsElem] = useState([]);
    // console.log("🚀 ~ Mondai ~ currentOptionsElem:", currentOptionsElem);
    const currentPhrase = mondai[problem].sentence;

    //al principio y cada vez que cambio de problema
    useEffect(() => {
        setCurrentOptionsElem(
            shuffleArray(
                Object.values(mondai[problem].mondaiOptions).map(
                    (option, index) => {
                        return { id: index, phrase: option };
                    }
                )
            )
        );
    }, [problem]);

    //recorro el array revuelto de opciones para crear los botones
    const optionsElements = currentOptionsElem.map((option) => {
        let className = "testOptionButton";
        if (correct === option.id) className += " correct";
        if (incorrect === option.id) className += " incorrect";
        return (
            <button
                className={className}
                key={option.id}
                onClick={() =>
                    handleClick({
                        index: option.id,
                        prompt: currentPhrase,
                        expected: mondai[problem].mondaiOptions[0],
                        answer: option.phrase,
                        correct: option.id === 0 ? true : false,
                    })
                }
                disabled={thinking}
            >
                {option.phrase}
            </button>
        );
    });

    return (
        <div className="testContent">
            <div className="testPhrase">
                <p>{currentPhrase}</p>
            </div>
            <TestDivider />
            <div className="mondaiOptions">{optionsElements}</div>
        </div>
    );
};

export default Mondai;
