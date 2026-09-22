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

function randomInt(lower, upper) {
    return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

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
