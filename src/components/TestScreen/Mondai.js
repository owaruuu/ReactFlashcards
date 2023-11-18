import { useEffect, useState } from "react";
import TestDivider from "../Misc/TestDivider";
import { shuffleArray } from "../../utils/utils";

const Mondai = (props) => {
    const { test, problem, correct, incorrect, thinking, handleClick } = props;
    //el array de opciones revueltas
    const [currentOptionsElem, setCurrentOptionsElem] = useState([]);
    const currentPhrase = test.mondai[problem][0];

    useEffect(() => {
        setCurrentOptionsElem(shuffleArray(test.mondai[problem][1]));
        // setCurrentOptionsElem("shuffleArray(test.mondai[problem][0])");
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
                onClick={(event) => handleClick(event, option.id)}
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
