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
