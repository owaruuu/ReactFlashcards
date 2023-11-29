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
    let currentIndex = array.length;
    let randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
};

export const backToTop = () => {
    window.scrollTo(0, 0);
};
export const randomInt = (lower = 0, upper) => {
    return Math.floor(Math.random() * (upper - lower + 1)) + lower;
};

export const getFiveRandomNumbers = () => {
    let randomNumbersArray = [];

    while (randomNumbersArray.length <= 1) {
        let number = randomInt(0, 4);

        //si randomNumbersArray no contiene
        if (!randomNumbersArray.includes(number)) {
            randomNumbersArray.push(number);
        }
    }

    while (randomNumbersArray.length <= 3) {
        let number = randomInt(5, 9);

        //si randomNumbersArray no contiene
        if (!randomNumbersArray.includes(number)) {
            randomNumbersArray.push(number);
        }
    }

    let number = randomInt(10, 14);
    randomNumbersArray.push(number);

    randomNumbersArray.sort((a, b) => a - b);

    return randomNumbersArray;
};

export const chooseFiveMondai = (test, randomNumberArray) => {
    let mondaiArray = [];

    mondaiArray = randomNumberArray.map((index) => {
        return test.mondai[index];
    });

    return mondaiArray;
};

export const getThreeRandomNumbers = () => {
    let randomNumbersArray = [];

    while (randomNumbersArray.length <= 2) {
        let number = randomInt(0, 10);

        //si randomNumbersArray no contiene
        if (!randomNumbersArray.includes(number)) {
            randomNumbersArray.push(number);
        }
    }

    randomNumbersArray.sort((a, b) => a - b);
    console.log(
        "🚀 ~ file: utils.js:97 ~ getThreeRandomNumbers ~ randomNumbersArray:",
        randomNumbersArray
    );

    return randomNumbersArray;
};

export const chooseThreeDrag = (test, randomNumberArray) => {
    let dragArray = [];

    dragArray = randomNumberArray.map((index) => {
        return test.dragDrop[index];
    });

    return dragArray;
};
