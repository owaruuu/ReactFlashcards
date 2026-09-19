import _ from "lodash";
import { kanjiLookup } from "../data/kanjiLookup";

export const ONE_HOUR = 1000 * 60 * 60;
export const ONE_DAY = 1000 * 60 * 60 * 24;

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
                easyArr.length, //eg. 6
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
                midArr.length, //eg. 5
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
                hardArr.length, //eg. 5
            );

            random.push(...randomNumbers.map((index) => hardArr[index][1]));
        }
    }

    return random;
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

export function showDifference({ chosenDiff }) {
    const days = chosenDiff / (1000 * 60 * 60 * 24);
    const hours = chosenDiff / (1000 * 60 * 60);

    if (Math.floor(days) === 1) {
        return `hace 1 dia.`;
    }

    if (days > 1) {
        return `hace ${Math.round(days)} dias.`;
    }

    if (hours < 1) {
        return `hace un momento.`;
    }

    if (hours > 0 && hours < 2) {
        return `hace 1 hora.`;
    }

    return `hace ${Math.round(hours)} horas.`;
}

export function getDiff(timeObject) {
    if (!timeObject) {
        return null;
    }
    return Math.abs(timeObject.getTime() - new Date().getTime());
}

export function pickDifference(japanese, spanish) {
    if (japanese && spanish) {
        const japaneseDiff = Math.abs(
            japanese.getTime() - new Date().getTime(),
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
            japanese.getTime() - new Date().getTime(),
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
                term,
            );
        }
    });

    return reorderedList;
}

export function getKanjiSvgName(kanji) {
    return kanjiLookup[kanji].at(-1);
}

// each level corresponds to an amount of hours to wait before the next review.
const levelToMultiplier = {
    1: 24, // 1 day
    2: 24, // 1 day
    3: 48, // 2 days
    4: 72, // 3 days
    5: 120, // 5 days
    6: 168, // 7 days
    7: 240, // 10 days
    8: 360, // 15 days
    9: 480, // 20 days
    10: 648, // 27 days
};

const MIN_LEVEL = 1;
const MAX_LEVEL = 10;

/**
 * Returns the amount of hours to wait before the next review based on the CURRENT level.
 * @param {int} level level before change
 * @returns {int} hours
 */
export function levelToHours(level) {
    // if level is 0 calculate as level 1, used on new terms that have not been reviewed yet.
    if (level <= 0) return levelToMultiplier[1];

    // if level is greater than max level, just in case the level is higher than the max level, return the max level multiplier.
    if (level > MAX_LEVEL) return levelToMultiplier[MAX_LEVEL];

    return levelToMultiplier[level];
}

/**
 *
 * @param {int} level
 * @param {int} change
 * @returns {int} newLevel
 */
export function getNewLevel(level, change) {
    // avoid going negative
    if (level + change < MIN_LEVEL) return MIN_LEVEL;

    // avoid going over max level
    if (level + change > MAX_LEVEL) return MAX_LEVEL;

    return level + change;
}

export function normalizeDate(date) {
    let newDate = new Date(date);

    if (newDate.getHours() < 17) {
        newDate.setHours(8);
        newDate.setMinutes(0);
        newDate.setSeconds(0);
        newDate.setMilliseconds(0);

        return newDate;
    } else if (newDate.getHours() >= 17) {
        newDate.setHours(17);
        newDate.setMinutes(0);
        newDate.setSeconds(0);
        newDate.setMilliseconds(0);

        return newDate;
    }

    console.error(
        "🚀 ~ normalizeDate ~ newDate: fecha no es valida",
        new Date(newDate),
    );

    return newDate;
}

export function getShortTime(date) {
    const d = new Date(date);
    const dateStr = d.toLocaleDateString(undefined, {
        day: "numeric",
        month: "2-digit",
        year: "2-digit",
    });
    const timeStr = d.toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
    return `${dateStr}, ${timeStr}`;
}

export function isAvailable(nextDate) {
    if (nextDate === undefined) return true;

    const now = new Date();

    return new Date(nextDate) < now;
}

export function getComingTerms(levelsData) {
    let comingTerms = {};
    let comingTermsArray = [];
    let sameDayEight = 0;
    let sameDaySeventeen = 0;

    const now = new Date();

    for (const [key, value] of Object.entries(levelsData)) {
        const nextDate = new Date(value.nextDate);

        if (isAvailable(nextDate)) {
            continue;
        }

        if (isSameDay(now, nextDate)) {
            if (nextDate.getHours() === 8) {
                sameDayEight += 1;
                comingTerms["08:00"] = {
                    amount: (comingTerms["08:00"]?.amount || 0) + 1,
                    date: nextDate,
                };
            } else if (nextDate.getHours() === 17) {
                sameDaySeventeen += 1;
                comingTerms["17:00"] = {
                    amount: (comingTerms["17:00"]?.amount || 0) + 1,
                    date: nextDate,
                };
            }
        }

        if (isTomorrow(now, nextDate)) {
            comingTerms["Mañana"] = {
                amount: (comingTerms["Mañana"]?.amount || 0) + 1,
                date: nextDate,
            };
        }

        if (isMoreThanOneDay(now, nextDate)) {
            const date = toDDMMYY(nextDate);
            comingTerms[date] = {
                amount: (comingTerms[date]?.amount || 0) + 1,
                date: nextDate,
            };
        }
    }

    comingTermsArray = Object.entries(comingTerms)
        .map((entry) => {
            return {
                key: entry[0],
                amount: entry[1]["amount"],
                date: entry[1]["date"],
            };
        })
        .sort((a, b) => a.date - b.date);

    return comingTermsArray;
}

function isSameDay(a, b) {
    const d1 = new Date(a);
    const d2 = new Date(b);
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);
    return d1.getTime() === d2.getTime();
}

function isTomorrow(a, b) {
    const d1 = new Date(a); //today
    const d2 = new Date(b); //nextDate
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);
    return d1.getTime() + ONE_DAY === d2.getTime();
}

function isMoreThanOneDay(a, b) {
    const d1 = new Date(a); //today
    const d2 = new Date(b); //nextDate
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);
    return d1.getTime() + ONE_DAY < d2.getTime();
}

function toDDMMYY(date) {
    const d = new Date(date);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yy = String(d.getFullYear()).slice(-2);
    return `${dd}/${mm}/${yy}`;
}
