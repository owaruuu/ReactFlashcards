const stickers = {
    3: "torii",
    999: "one",
    998: "missing",
    997: "missing",
    996: "missing",
    995: "missing",
};

const descriptions = {
    3: {
        title: "とりい(鳥居)",
        content: `Los Torii son puertas de color rojo ligeramente amarillento (しゅいろ/朱色) que se alza a la entrada de los santuarios. Las puertas Torii representan el límite entre las zonas interiores y sagradas del santuario y las zonas exteriores, donde vive la gente. Además, también se dice que las puertas Torii sirven de "frontera" para impedir que entren cosas impuras al santuario.`,
    },
    999: {
        title: "one",
        content: "...",
    },
    998: {
        title: "missing",
        content: "...",
    },
    997: {
        title: "missing",
        content: "...",
    },
    996: {
        title: "missing",
        content: "...",
    },
    995: {
        title: "missing",
        content: "...",
    },
};

const getName = (id) => {
    return stickers[id];
};

const getDescription = (id) => {
    return descriptions[id];
};

const getArray = () => {
    const array = [];
    for (const key in stickers) {
        array.push({
            id: key,
            name: stickers[key],
        });
    }

    return array;
};

export { getArray, getName, getDescription };
