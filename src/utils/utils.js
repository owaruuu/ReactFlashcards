import _ from "lodash";
import { kanjiLookup } from "../data/kanjiLookup";

export const getLectureQueryString = (id) => `id-${id}-LectureQuery`;

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
