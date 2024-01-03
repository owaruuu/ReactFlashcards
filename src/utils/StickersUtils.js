const stickers = {
    1: "torii",
    2: "uchiwa",
    3: "onigiri",
    // 999: "one",
    // 998: "missing",
    // 997: "missing",
    // 996: "missing",
    // 995: "missing",
};

const descriptions = {
    1: {
        title: "とりい(鳥居)",
        content: `Los Torii son puertas de color rojo ligeramente amarillento (しゅいろ/朱色) que se alza a la entrada de los santuarios. Las puertas Torii representan el límite entre las zonas interiores y sagradas del santuario y las zonas exteriores, donde vive la gente. Además, también se dice que las puertas Torii sirven de "frontera" para impedir que entren cosas impuras al santuario.`,
    },
    2: {
        title: "うちわ",
        content: `Uchiwa es un objeto importante para sentir "verano". Generalmente delgado y plano con un mango que se utiliza para agitarlo y hacer viento. Tradicionalmente está hecho con un armazón de bambú y recubierto de papel. Hoy en día en vez de bambú se utiliza plástico reciclado, etc.`,
    },
    3: {
        title: "おにぎり(お握り)",
        content: `Onigiri es una comida típica e icónica de Japón. Aquí en Chile se dice "Bolita de arroz". En general tiene algún relleno dentro de esa bolita. O también puede ser arroz mezclado con algo. Nigiru significa "Doblar todos los dedos de la mano hacia dentro.  también, agarre o sujete objetos de esta forma."`,
    },

    999: {
        title: "???",
        content: "Obten este sticker para saber mas.",
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
