const stickers = {
    1: "torii",
    2: "sakura",
    3: "fuurin",
    4: "taiko",
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
        content: `Torii. Son puertas de color rojo ligeramente amarillento (しゅいろ/朱色) que se alza a la entrada de los santuarios. Las puertas Torii representan el límite entre las zonas interiores y sagradas del santuario y las zonas exteriores, donde vive la gente. Además, también se dice que las puertas Torii sirven de "frontera" para impedir que entren cosas impuras al santuario.`,
    },
    2: {
        title: "さくら(桜)",
        content:
            "Flor de cerezo. En primavera es famoso el Hanami (contemplación de las flores de cerezos), donde la gente se junta a comer con sus amigos mientras admiran las flores de cerezo. En Chile, en Septiembre-Octubre la Corporación Nikkei organiza y realiza el Hanami dentro del Jardín Botánico Viña del Mar.",
    },
    3: {
        title: "ふうりん(風鈴)",
        content:
            "Carillón de viento o Campana de viento. Pequeñas campanas de metal, cerámica o cristal, una de las artesanías tradicionales de Japón. Antiguamente era un tipo de instrumentos de adivinación, una tira de papel colgada de la lengüeta se mueve con el viento y suena cuando la lengüeta golpea la campana. Especialmente en verano, se cuelgan de los aleros para disfrutar del sonido.",
    },
    4: {
        title: "わだいこ(和太鼓)",
        content:
            "Tambor japonés. Instrumento de percusión con cuerpo de madera recubierto de cuero, que vibra para producir sonido. Hoy en día se usa como simple instrumento musical pero, antiguamente se utilizaban en ceremonias.",
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
