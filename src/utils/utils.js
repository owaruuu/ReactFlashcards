import _, { map } from "lodash";
import { kanjiLookup } from "../data/kanjiLookup";

export const ONE_HOUR = 1000 * 60 * 60;

export const getLectureQueryString = (id) => `id-${id}-LectureQuery`;

export const readFromLocal = (key) => {
    const local = localStorage.getItem(key);
    if (local == null) return {};

    return JSON.parse(local);
};

export const writeToLocal = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const fakeBusy = (length = 5000) => {
    setTimeout(() => {
        console.log("fake busy ended");
    }, length);
};

export const shuffleArray = (array) => {
    const newArray = _.cloneDeep(array);
    let currentIndex = newArray.length;
    let randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [newArray[currentIndex], newArray[randomIndex]] = [
            newArray[randomIndex],
            newArray[currentIndex],
        ];
    }

    return newArray;
};

export const backToTop = () => {
    window.scrollTo(0, 0);
};
export const randomInt = (lower, upper) => {
    return Math.floor(Math.random() * (upper - lower + 1)) + lower;
};

//Eligo una cantidad x al azar de problemas por dificultad basado en la config
export const getRandomQuestions = (easy, mid, hard, options) => {
    const random = [];
    const easyArr = Object.entries(easy);
    const midArr = Object.entries(mid);
    const hardArr = Object.entries(hard);

    if (options.easy > 0) {
        if (options.easy === easyArr.length) {
            random.push(...easyArr.map((mondai) => mondai[1]));
        } else {
            const randomNumbers = getRandomNumbers(
                options.easy, // eg.4
                easyArr.length //eg. 6
            );

            random.push(...randomNumbers.map((index) => easyArr[index][1]));
        }
    }

    if (options.mid > 0) {
        if (options.mid === midArr.length) {
            random.push(...midArr.map((mondai) => mondai[1]));
        } else {
            const randomNumbers = getRandomNumbers(
                options.mid, // eg.3
                midArr.length //eg. 5
            );

            random.push(...randomNumbers.map((index) => midArr[index][1]));
        }
    }

    if (options.hard > 0) {
        if (options.hard === hardArr.length) {
            random.push(...hardArr.map((mondai) => mondai[1]));
        } else {
            const randomNumbers = getRandomNumbers(
                options.hard, // eg.3
                hardArr.length //eg. 5
            );

            random.push(...randomNumbers.map((index) => hardArr[index][1]));
        }
    }

    return random;

    // if (test.mondai_options.mid > 0) {
    // }

    // if (test.mondai_options.hard > 0) {
    // }

    // // const options = test.mondai_options;
    // const questions = test.mondai;

    // let randomArray = [];
    // let randomNumbers = [];

    // const easyLimit =
    //     options.easy > questions.easy.length
    //         ? questions.easy.length
    //         : options.easy;
    // const midLimit =
    //     options.mid > questions.mid.length ? questions.mid.length : options.mid;
    // const hardLimit =
    //     options.hard > questions.hard.length
    //         ? questions.hard.length
    //         : options.hard;

    // //pick questions from easy
    // while (randomNumbers.length < easyLimit) {
    //     let number = randomInt(0, questions.easy.length - 1);

    //     //si randomNumbersArray no contiene
    //     if (!randomNumbers.includes(number)) {
    //         randomNumbers.push(number);
    //     }
    // }

    // randomArray = [
    //     ...randomArray,
    //     ...randomNumbers.map((item) => questions.easy[item]),
    // ];
    // randomNumbers = [];

    // //pick questions from mid
    // while (randomNumbers.length < midLimit) {
    //     let number = randomInt(0, questions.mid.length - 1);

    //     //si randomNumbersArray no contiene
    //     if (!randomNumbers.includes(number)) {
    //         randomNumbers.push(number);
    //     }
    // }

    // randomArray = [
    //     ...randomArray,
    //     ...randomNumbers.map((item) => questions.mid[item]),
    // ];
    // randomNumbers = [];

    // //pick questions from hard
    // while (randomNumbers.length < hardLimit) {
    //     let number = randomInt(0, questions.hard.length - 1);

    //     //si randomNumbersArray no contiene
    //     if (!randomNumbers.includes(number)) {
    //         randomNumbers.push(number);
    //     }
    // }

    // randomArray = [
    //     ...randomArray,
    //     ...randomNumbers.map((item) => questions.hard[item]),
    // ];

    // return randomArray;
};

function getRandomNumbers(amount, max) {
    let randomNumbersArray = [];

    while (randomNumbersArray.length < amount) {
        let number = randomInt(0, max - 1);

        //si randomNumbersArray no contiene
        if (!randomNumbersArray.includes(number)) {
            randomNumbersArray.push(number);
        }
    }

    return randomNumbersArray;
}

export const chooseFiveMondai = (test, randomNumberArray) => {
    let mondaiArray = [];

    mondaiArray = randomNumberArray.map((index) => {
        return test.mondai[index];
    });

    return mondaiArray;
};

export const getRandomNumbersSimple = (ammount, size) => {
    let randomNumbersArray = [];

    while (randomNumbersArray.length < ammount) {
        let number = randomInt(0, size - 1);

        //si randomNumbersArray no contiene
        if (!randomNumbersArray.includes(number)) {
            randomNumbersArray.push(number);
        }
    }

    randomNumbersArray.sort((a, b) => a - b);

    return randomNumbersArray;
};

export const chooseThreeDrag = (test, randomNumberArray) => {
    let dragArray = [];

    dragArray = randomNumberArray.map((index) => {
        return test.dragDrop[index];
    });

    return dragArray;
};

export const levelOrder = [
    "bronze",
    "silver",
    "gold",
    "platinum",
    "diamond",
    "master",
];

export function showDifference({ chosenDiff, lang }) {
    const days = chosenDiff / (1000 * 60 * 60 * 24);
    // console.log("🚀 ~ showDifference ~ days:", days);
    const hours = chosenDiff / (1000 * 60 * 60);

    // console.log("🚀 ~ showDifference ~ Math.abs(days):", Math.abs(days));
    if (Math.floor(days) === 1) {
        return `hace 1 dia.${lang || ""}`;
    }

    if (days > 1) {
        return `hace ${Math.round(days)} dias.${lang || ""}`;
    }

    if (hours < 1) {
        return `hace un momento.${lang || ""}`;
    }

    if (hours > 0 && hours < 2) {
        return `hace 1 hora.${lang || ""}`;
    }

    return `hace ${Math.round(hours)} horas.${lang || ""}`;
}

export function getDiff(timeObject) {
    // console.log("🚀 ~ getDiff ~ timeObject:", timeObject);
    if (!timeObject) {
        return null;
    }
    return Math.abs(timeObject.getTime() - new Date().getTime());
}

export function pickDifference(japanese, spanish) {
    // console.log("🚀 ~ pickDifference ~ japanese, spanish:", japanese, spanish);
    //
    if (japanese && spanish) {
        const japaneseDiff = Math.abs(
            japanese.getTime() - new Date().getTime()
        );

        const spanishDiff = Math.abs(spanish.getTime() - new Date().getTime());

        if (japaneseDiff > spanishDiff) {
            return { chosenDiff: japaneseDiff, lang: "(jpn)" };
        } else if (spanishDiff > japaneseDiff) {
            return { chosenDiff: spanishDiff, lang: "(esp)" };
        }

        return { chosenDiff: japaneseDiff, lang: "(jpn)" };
    } else if (japanese && !spanish) {
        const japaneseDiff = Math.abs(
            japanese.getTime() - new Date().getTime()
        );
        return { chosenDiff: japaneseDiff, lang: "(jpn)" };
    } else if (!japanese && spanish) {
        const spanishDiff = Math.abs(spanish.getTime() - new Date().getTime());
        return { chosenDiff: spanishDiff, lang: "(esp)" };
    } else {
        return null;
    }
}

export function reorderTermsList(originalList, data) {
    let reorderedList = [];
    let index = 0;
    let mutedAmount = 0;

    originalList.forEach((term) => {
        if (data[term.id]) {
            if (data[term.id] === "highlighted") {
                reorderedList.splice(index, 0, term);
                index += 1;
            } else if (data[term.id] === "muted") {
                reorderedList.push(term);
                mutedAmount += 1;
            }
        } else {
            reorderedList.splice(
                reorderedList.length - 1 - (mutedAmount - 1),
                0,
                term
            );
        }
    });

    return reorderedList;
}

export function getKanjiSvgName(kanji) {
    return kanjiLookup[kanji].at(-1);
}
