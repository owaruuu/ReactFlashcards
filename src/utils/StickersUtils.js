const stickers = {
    1: "torii",
    702: "uchiwa",
    // 703: "missing",
    704: "onigiri",
    708: "shuriken",
    // 999: "one",

    // 997: "missing",
    // 996: "missing",
    // 995: "missing",
};

const descriptions = {
    1: {
        title: "とりい(鳥居)",
        content: `Los Torii son puertas de color rojo ligeramente amarillento (しゅいろ/朱色) que se alza a la entrada de los santuarios. Las puertas Torii representan el límite entre las zonas interiores y sagradas del santuario y las zonas exteriores, donde vive la gente. Además, también se dice que las puertas Torii sirven de "frontera" para impedir que entren cosas impuras al santuario.`,
    },
    702: {
        title: "うちわ",
        content: `Uchiwa es un objeto importante para sentir "verano". Generalmente delgado y plano con un mango que se utiliza para agitarlo y hacer viento. Tradicionalmente está hecho con un armazón de bambú y recubierto de papel. Hoy en día en vez de bambú se utiliza plástico reciclado, etc.`,
    },
    703: {
        title: "???",
        content: "les debo un sticker u.u",
    },
    704: {
        title: "おにぎり(お握り)",
        content: `Onigiri es una comida típica e icónica de Japón. Aquí en Chile se dice "Bolita de arroz". En general tiene algún relleno dentro de esa bolita. O también puede ser arroz mezclado con algo. Nigiru significa "Doblar todos los dedos de la mano hacia dentro.  también, agarre o sujete objetos de esta forma."`,
    },
    708: {
        title: "しゅりけん(手裏剣)",
        content: `Un shuriken es un tipo de arma blanca arrojadiza, originaria del Japón medieval. Posee una gran variedad de formas y estilos, pero predominantemente en forma de estrella, con filos cortantes y de un tamaño lo bastante pequeño para ocultarlo con facilidad. Su uso está asociado con los ninja, lo que le ha otorgado el nombre popular de «estrella ninja».`,
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
