import React from "react";

const ExampleSentenceSpan = ({ string }) => {
    const proccesedString = ColorSentence(string);
    return <>{proccesedString}</>;
};

function ColorSentence(string) {
    let foundOpen = false;
    let foundClose = false;
    let firstPart = "";
    let redPart = "";
    let secondPart = "";

    for (let i = 0; i < string.length; i++) {
        if (string[i] === "[") {
            foundOpen = true;
            i += 1;
        }

        if (string[i] === "]") {
            foundClose = true;
            continue;
        }

        if (foundOpen && foundClose) {
            secondPart += string[i];
        } else if (foundOpen) {
            redPart += string[i];
        } else {
            firstPart += string[i];
        }
    }

    // console.log(firstPart);
    // console.log(secondPart);
    // console.log(redPart);

    return (
        <div className="exampleSentence">
            <span>{firstPart}</span>
            <span className="red">{redPart}</span>
            <span>{secondPart}</span>
        </div>
    );
}

export default ExampleSentenceSpan;
