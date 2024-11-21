export const tests = {
    1: {
        version: "01012024",
        mondaiTitle: "Selecciona la traduccion correcta.",
        dragTitle:
            "Ordena la traduccion de la siguiente frase. (debes ocupar todas las palabras)",
        mondaiOptions: {
            easy: 2,
            mid: 2,
            hard: 1,
        },
        dragOptions: {
            quantity: 3,
        },
        mondai: {
            easy: [
                [
                    "わたしは、チリじんです。",
                    [
                        { id: 0, phrase: "Yo soy chileno." },
                        { id: 1, phrase: "Yo soy americano." },
                        { id: 2, phrase: "Yo soy japones." },
                    ],
                ],
                [
                    "わたしは、エンジニアです。",
                    [
                        { id: 0, phrase: "Yo soy ingeniero." },
                        { id: 1, phrase: "Yo soy profesor." },
                        { id: 2, phrase: "Yo soy estudiante." },
                    ],
                ],
                [
                    "わたしは、おとなです。",
                    [
                        { id: 0, phrase: "Yo soy adulto." },
                        { id: 1, phrase: "Yo soy niño." },
                        { id: 2, phrase: "Yo soy hombre." },
                    ],
                ],
                [
                    "じぶんは、がくせいじゃありません。",
                    [
                        { id: 0, phrase: "Yo no soy estudiante." },
                        { id: 1, phrase: "Yo no soy profesor." },
                        { id: 2, phrase: "Yo no soy trabajador." },
                    ],
                ],
                [
                    "あなたは、ねこではありません。",
                    [
                        { id: 0, phrase: "Usted no es gato." },
                        { id: 1, phrase: "Usted no es perro." },
                        { id: 2, phrase: "Usted no es animal. " },
                    ],
                ],
            ],
            mid: [
                [
                    "うちは、にほんじんじゃありません。",
                    [
                        { id: 0, phrase: "Yo no soy japones." },
                        { id: 1, phrase: "Yo no soy koreano." },
                        { id: 2, phrase: "Yo no soy chino." },
                    ],
                ],
                [
                    "あなたは、チリじんですか",
                    [
                        { id: 0, phrase: "Usted es chileno?" },
                        { id: 1, phrase: "Usted es japones?" },
                        { id: 2, phrase: "Usted es americano?" },
                    ],
                ],
                [
                    "カスエラは、たべものですか",
                    [
                        { id: 0, phrase: "Cazuela es comida?" },
                        { id: 1, phrase: "Cazuela es sopa?" },
                        { id: 2, phrase: "Cazuela es salado?" },
                    ],
                ],
                [
                    "リャマは、どうつぶですか",
                    [
                        { id: 0, phrase: "Llama es un animal?" },
                        { id: 1, phrase: "Llama es ser vivo?" },
                        { id: 2, phrase: "Llama es un objeto?" },
                    ],
                ],
                [
                    "カーラさんは、(お)いしゃ(さん)です。 わたしもです。",
                    [
                        { id: 0, phrase: "Carla es doctora. Yo tambien." },
                        { id: 1, phrase: "Carla es enfermera. Yo no." },
                        { id: 2, phrase: "Carla es profesora. Yo tambien. " },
                    ],
                ],
            ],
            hard: [
                [
                    "きょうは、はれです。 あしたもです。",
                    [
                        {
                            id: 0,
                            phrase: "Hoydia esta soleado. Mañana tambien.",
                        },
                        {
                            id: 1,
                            phrase: "Hoydia esta nublado. Mañana tambien.",
                        },
                        { id: 2, phrase: "Hoydia esta lloviendo. Mañana no." },
                    ],
                ],
                [
                    "ピスコラは、チリののみものです。チチャもです。",
                    [
                        {
                            id: 0,
                            phrase: "Piscola es un trago de chile. Chicha tambien.",
                        },
                        {
                            id: 1,
                            phrase: "Piscola es un jugo de chile. Chicha no.",
                        },
                        {
                            id: 2,
                            phrase: "Piscola es de chile. Chirimoya tambien.",
                        },
                    ],
                ],
                [
                    "わたしのスマホです。",
                    [
                        { id: 0, phrase: "Mi celular." },
                        { id: 1, phrase: "Tu celular." },
                        { id: 2, phrase: "Es un celular." },
                    ],
                ],
                [
                    "ともだちのかのじょのかばんです。",
                    [
                        {
                            id: 0,
                            phrase: "Es la cartera de la polola de mi amig@.",
                        },
                        {
                            id: 1,
                            phrase: "Es la mochila del amig@ de mi polola.",
                        },
                        {
                            id: 2,
                            phrase: "Es la maleta del mejor amig@ de mi polola.",
                        },
                    ],
                ],
                [
                    "こんしゅうのにほんごのじゅぎょうのしゅくだいです。",
                    [
                        {
                            id: 0,
                            phrase: "Es la tarea de la clase de idioma japones de esta semana.",
                        },
                        {
                            id: 1,
                            phrase: "Es el repaso de la clase de idioma japones de la proxima semana.",
                        },
                        {
                            id: 2,
                            phrase: "Es la practica de la clase de idioma japones de la semana pasada.",
                        },
                    ],
                ],
            ],
        },
        dragDrop: [
            [
                "Es el celular de mi mejor amigo.",
                "しんゆうのスマホです。",
                [
                    { id: 0, drag: "しんゆう" },
                    { id: 1, drag: "の" },
                    { id: 2, drag: "スマホ" },
                    { id: 3, drag: "です。" },
                ],
            ],
            [
                "Claro es una empresa de celulares. ",
                "クラロは、スマホのかいしゃです。",
                [
                    { id: 0, drag: "クラロ" },
                    { id: 1, drag: "は、" },
                    { id: 2, drag: "スマホ" },
                    { id: 3, drag: "の" },
                    { id: 4, drag: "かいしゃ" },
                    { id: 5, drag: "です。" },
                ],
            ],
            [
                "Yo estoy bien(animado). Usted tambien esta bien(animado)?",
                "わたしは、げんきです。あなたもげんきですか？",
                [
                    { id: 0, drag: "わたし" },
                    { id: 1, drag: "は、" },
                    { id: 2, drag: "げんき" },
                    { id: 3, drag: "です。" },
                    { id: 4, drag: "あなた" },
                    { id: 5, drag: "も" },
                    { id: 6, drag: "げんき" },
                    { id: 7, drag: "です" },
                    { id: 8, drag: "か？" },
                ],
            ],
            [
                "El lunes es clase de japones.",
                "げつようびは、にほんごのじゅぎょうです。",
                [
                    { id: 0, drag: "げつようび" },
                    { id: 1, drag: "は、" },
                    { id: 2, drag: "にほんご" },
                    { id: 3, drag: "の" },
                    { id: 4, drag: "じゅぎょう" },
                    { id: 5, drag: "です。" },
                ],
            ],
            [
                "Viña del mar es una ciudad de Chile.",
                "ビーニャデルマルは、チリのまちです。",
                [
                    { id: 0, drag: "ビーニャ" },
                    { id: 1, drag: "デルマル" },
                    { id: 2, drag: "は、" },
                    { id: 3, drag: "チリ" },
                    { id: 4, drag: "の" },
                    { id: 5, drag: "まち" },
                    { id: 6, drag: "です。" },
                ],
            ],
            [
                "Nihonshu no es un bebestible de Chile.",
                "にほんしゅは、チリののみものじゃありません。",
                [
                    { id: 0, drag: "にほんしゅ" },
                    { id: 1, drag: "は、" },
                    { id: 2, drag: "チリ" },
                    { id: 3, drag: "の" },
                    { id: 4, drag: "のみもの" },
                    { id: 5, drag: "じゃ" },
                    { id: 6, drag: "ありません。" },
                ],
            ],
            [
                "Goku no es una mujer.",
                "ごくうは、おんなのひとではありません。",
                [
                    { id: 0, drag: "ごくう" },
                    { id: 1, drag: "は、" },
                    { id: 2, drag: "おんな" },
                    { id: 3, drag: "の" },
                    { id: 4, drag: "ひと" },
                    { id: 5, drag: "では" },
                    { id: 6, drag: "ありません。" },
                ],
            ],
            [
                "Cazuela es sopa.",
                "カズエラは、スープです。",
                [
                    { id: 0, drag: "カズエラ" },
                    { id: 1, drag: "は、" },
                    { id: 2, drag: "スープ" },
                    { id: 3, drag: "です。" },
                ],
            ],
            [
                "Ustedes son Argentinos?",
                "みなさんは、アルゼンチンじんですか？",
                [
                    { id: 0, drag: "みなさん" },
                    { id: 1, drag: "は、" },
                    { id: 2, drag: "アルゼンチン" },
                    { id: 3, drag: "じん" },
                    { id: 4, drag: "です" },
                    { id: 5, drag: "か？" },
                ],
            ],
            [
                "Hiragana es idioma Japones?",
                "ひらがなは、にほんごですか？",
                [
                    { id: 0, drag: "ひらがな" },
                    { id: 1, drag: "は、" },
                    { id: 2, drag: "にほんご" },
                    { id: 3, drag: "です" },
                    { id: 4, drag: "か？" },
                ],
            ],
            [
                "El Sushi es comida de Japon. Omuraisu tambien.",
                "すしは、にほんのたべものです。オムライスもです。",
                [
                    { id: 0, drag: "すし" },
                    { id: 1, drag: "は、" },
                    { id: 2, drag: "にほん" },
                    { id: 3, drag: "の" },
                    { id: 4, drag: "たべもの" },
                    { id: 5, drag: "です。" },
                    { id: 6, drag: "オムライス" },
                    { id: 7, drag: "も" },
                    { id: 8, drag: "です。" },
                ],
            ],
            [
                "Usted es ingeniero?",
                "あなたは、エンジニアですか？",
                [
                    { id: 0, drag: "あなた" },
                    { id: 1, drag: "は、" },
                    { id: 2, drag: "エンジニア" },
                    { id: 3, drag: "です" },
                    { id: 4, drag: "か？" },
                ],
            ],
            [
                "Mari san es tu amiga?",
                "まりさんは、あなたのともだちですか？",
                [
                    { id: 0, drag: "まり" },
                    { id: 1, drag: "さん" },
                    { id: 2, drag: "は、" },
                    { id: 3, drag: "あなた" },
                    { id: 4, drag: "の" },
                    { id: 5, drag: "ともだち" },
                    { id: 6, drag: "です" },
                    { id: 7, drag: "か？" },
                ],
            ],
            [
                "Pikachu es personaje de anime?",
                "ピカチュウは、アニメのキャラクターですか？",
                [
                    { id: 0, drag: "ピカチュウ" },
                    { id: 1, drag: "は、" },
                    { id: 2, drag: "アニメ" },
                    { id: 3, drag: "の" },
                    { id: 4, drag: "キャラクター" },
                    { id: 5, drag: "です" },
                    { id: 6, drag: "か？" },
                ],
            ],
            [
                "Yo no soy hombre.",
                "わたしは、おとこじゃありません。",
                [
                    { id: 0, drag: "わたし" },
                    { id: 1, drag: "は、" },
                    { id: 2, drag: "おとこ" },
                    { id: 3, drag: "じゃ" },
                    { id: 4, drag: "ありません。" },
                ],
            ],
        ],

        manga: {},
    },
    708: {
        version: "22012024",
        mondaiTitle:
            "Selecciona la respuesta adecuada dependiendo de la situacion.",
        mondaiOptions: {
            easy: 3,
            mid: 3,
            hard: 3,
        },
        dragOptions: {
            quantity: 0,
        },
        mondai: {
            easy: [
                [
                    `Cuando hablas sobre el objeto y NO sabes como se llama el objeto O simplemente quiere decir "Esto, Eso, Aquello" como se dice? `,
                    [
                        {
                            id: 0,
                            phrase: "Kore, Sore, Are",
                        },
                        {
                            id: 1,
                            phrase: "Koko, Soko, Asoko",
                        },
                        {
                            id: 2,
                            phrase: "Kono, Sono, Ano",
                        },
                    ],
                ],
                [
                    `Cuando hablas sobre el objeto y SI sabes como se llama el objeto O quieres 'especificar' "Esta cosa, Esa cosa, Aquella cosa" como se dice?`,
                    [
                        {
                            id: 0,
                            phrase: "Kono, Sono, Ano",
                        },
                        {
                            id: 1,
                            phrase: "Koko, Soko, Asoko",
                        },
                        {
                            id: 2,
                            phrase: "Kore, Sore, Are",
                        },
                    ],
                ],
                [
                    `Estas guiando y quieres explicar sobre estacion de bomberos que esta en la Plaza Soto mayor, como vas a explicar?`,
                    [
                        {
                            id: 0,
                            phrase: `Koko wa Chiri no hajimete no shoubousho desu.`,
                        },
                        {
                            id: 1,
                            phrase: `Kore wa Chiri no hajimete no shoubousha desu.`,
                        },
                        {
                            id: 2,
                            phrase: `Kochira wa Chiri no hajimete no shoubousha desu.`,
                        },
                    ],
                ],
                [
                    `Cual es la diferencia entre "Koko, Soko, Asoko" y "Kochira, Sochira, Achira"?`,
                    [
                        {
                            id: 0,
                            phrase: `"Kochira, Sochira, Achira" mas formal que "Koko, Soko, Asoko".`,
                        },
                        {
                            id: 1,
                            phrase: `"Koko, Soko, Asoko" mas formal que "Kochira, Sochira, Achira".`,
                        },
                        { id: 2, phrase: "No hay diferencia." },
                    ],
                ],
                [
                    `Japones(a) te pregunto "Reji wa doko desuka? " como vas a responder?`,
                    [
                        {
                            id: 0,
                            phrase: "Achira desu.",
                        },
                        {
                            id: 1,
                            phrase: "Migi desu.",
                        },
                        {
                            id: 2,
                            phrase: "Are desu.",
                        },
                    ],
                ],
            ],
            mid: [
                [
                    `Quieres hablar sobre una iglesia que esta cerca de Japones(a) (Pero no cerca de ti), como vas a explicar?`,
                    [
                        {
                            id: 0,
                            phrase: "Soko wa Chiri no katorikku no kyoukai desu.",
                        },
                        {
                            id: 1,
                            phrase: "Koko wa Chiri no katorikku no kyoukai desu.",
                        },
                        {
                            id: 2,
                            phrase: "Asoko wa Chiri no katorikku no kyoukai desu.",
                        },
                    ],
                ],
                [
                    "Estamos viendo la vista desde el cerro y quieres explicar que aquel lugar son las Dunas de Con Con, como vas a explicar?",
                    [
                        {
                            id: 0,
                            phrase: "Mite kudasai ! Asoko wa chiri no sakyuu desu. KonKon Sakyuu desu.",
                        },
                        {
                            id: 1,
                            phrase: "Mimashou ! Koko wa chiri no sakyuu desu. KonKon Sakyuu desu.",
                        },
                        {
                            id: 2,
                            phrase: "Mite kudasai ! Mae wa chiri no sakyuu desu. KonKon Sakyuu desu.",
                        },
                    ],
                ],
                // [
                //     `Japones(a) te pregunto "Osusume no omiyageya san wa doko desuka? " como vas a responder?`,
                //     [
                //         { id: 0, phrase: "Sochira desu." },
                //         { id: 1, phrase: "Ushiro desu." },
                //         { id: 2, phrase: "Naname desu." },
                //     ],
                // ],
                [
                    `Estamos en el restaurante y quieres decir a Gojyou san "Tu asiento es aqui!", como vas a decir? `,
                    [
                        {
                            id: 0,
                            phrase: "Gojyou san ! Anata no seki wa kokodesu!",
                        },
                        {
                            id: 1,
                            phrase: "Gojyou san! Anata no isu wa kochira desu!",
                        },
                        {
                            id: 2,
                            phrase: "Gojyou san! Anata no kaban wa kore desu!",
                        },
                    ],
                ],
                [
                    `Estamos cerca del ascensor El Peral y quieres decir "Vamos a tomar el ascensor de ahi.",como vas a decir?`,
                    [
                        {
                            id: 0,
                            phrase: "Soko no Asenso-ru ni norimasu!",
                        },
                        {
                            id: 1,
                            phrase: "Koko no Asenso-ru ni norimasu!",
                        },
                        {
                            id: 2,
                            phrase: "Asoko no Asenso-ru ni norimasu!",
                        },
                    ],
                ],
            ],
            hard: [
                [
                    `Estas guiando cerca de otro grupo y Japones(a) te pregunto "Hoka no Gaido san wa dochira desuka?", como vas a responder?`,
                    [
                        {
                            id: 0,
                            phrase: "Achira desu.",
                        },
                        {
                            id: 1,
                            phrase: "Koko desu.",
                        },
                        { id: 2, phrase: "Sore desu." },
                    ],
                ],
                [
                    `Estamos viendo la vista desde el cerro y Japones(a) te pregunto "Watashitachi no fune wa doko desuka?", como vas a responder?`,
                    [
                        {
                            id: 0,
                            phrase: "Asoko desu!",
                        },
                        {
                            id: 1,
                            phrase: "Koko desu!",
                        },
                        {
                            id: 2,
                            phrase: "Sore desu!",
                        },
                    ],
                ],
                [
                    `Estas guiando en el cerro y hay varios lugares que se ve como una casa pero, es una galeria del arte, como vas a explicar?`,
                    [
                        {
                            id: 0,
                            phrase: "Soko wa minka jya arimasen. Garou desu. Hairimasenka?",
                        },
                        {
                            id: 1,
                            phrase: "Kochira wa minka jya arimasen. Toshokan desu. Hairimasenka?",
                        },
                        {
                            id: 2,
                            phrase: "Are wa eki jya arimasen. Garou desu. Hairimasenka?",
                        },
                    ],
                ],
                [
                    `Japones(a) esta caminando hacia otro lado (alejandose), que vas a decir? `,
                    [
                        {
                            id: 0,
                            phrase: "Sumimasen! Kochira desu! Kochira ni kite kudasai!",
                        },
                        {
                            id: 1,
                            phrase: "Sumimasen! Asoko desu! Asoko ni kite kudasai!",
                        },
                        {
                            id: 2,
                            phrase: "Sumimasen! Are desu! Are ni kite kudasai!",
                        },
                    ],
                ],
                [
                    `Estas guiando en el cerro y quieres enseñar el nombre del cerro que estas caminando, como vas a explicar?`,
                    [
                        {
                            id: 0,
                            phrase: `Koko no oka no namae wa, "Sero Aregure(cerro alegre) desu."`,
                        },
                        {
                            id: 1,
                            phrase: `Soko no oka no namae wa, "Sero Aregure(cerro alegre) desu." `,
                        },
                        {
                            id: 2,
                            phrase: `Asoko no oka no namae wa, "Sero Aregure(cerro alegre) desu."`,
                        },
                    ],
                ],
            ],
        },

        dragDrop: [],
    },
    704: {
        version: "22012024",
        mondaiTitle:
            "Selecciona la respuesta adecuada dependiendo de la situacion.",
        mondaiOptions: {
            easy: 3,
            mid: 3,
            hard: 3,
        },
        dragOptions: {
            quantity: 0,
        },
        mondai: {
            easy: [
                [
                    `"Cazuela es una sopa rica de Chile" wa Nihongo de nandesuka?`,
                    [
                        {
                            id: 0,
                            phrase: "Kasuera wa Chiri no oishii su-pu desu.",
                        },
                        {
                            id: 1,
                            phrase: "Kasuera wa Chiri no amai su-pu desu.",
                        },
                        {
                            id: 2,
                            phrase: "Kasuera wa Chiri no shoppai su-pu desu.",
                        },
                    ],
                ],
                [
                    "Japones(a) esta viendo dulce de Chile pero, parece que no ha entendido que es un dulce, que vas a decir?",
                    [
                        {
                            id: 0,
                            phrase: "Kore wa, Chiri no amai okashi desu.",
                        },
                        {
                            id: 1,
                            phrase: "Kore wa, Chiri no nigai okashi desu.",
                        },
                        {
                            id: 2,
                            phrase: "Kore wa, Chiri no karai okashi desu.",
                        },
                    ],
                ],
                [
                    `Estan en plaza soto mayor y Japones(a) te pregunto "Kore wa nan desuka?" apuntando hacia la estatua de Arturo Prat, como vas a explicar?`,
                    [
                        {
                            id: 0,
                            phrase: `Kono hito no namae wa "Aruturo puratto desu. Totemo Yuumei na Chiri no Hito desu".`,
                        },
                        {
                            id: 1,
                            phrase: `Kono hito no namae wa "Aruturo puratto desu. Himana Chiri no Hito desu.".`,
                        },
                        {
                            id: 2,
                            phrase: `Kono hito no namae wa "Aruturo puratto desu. Nigiyaka na Chiri no Hito desu.".`,
                        },
                    ],
                ],
                [
                    `Japones(a) te pregunto antes de comenzar el tour, "Baruparaiso wa donna machi desuka?", como vas a explicar?`,
                    [
                        {
                            id: 0,
                            phrase: "Baruparaiso wa omoshiroi machi desu.",
                        },
                        { id: 1, phrase: "Baruparaiso wa semai machi desu." },
                        { id: 2, phrase: "Baruparaiso wa chiisai machi desu." },
                    ],
                ],
                [
                    `Japones(a) te pregunto "Sero aregure(cerro alegre) wa abunai desuka?", como vas a responder?`,
                    [
                        {
                            id: 0,
                            phrase: "Hai, sukoshi abunai desu. Ki wo tsukete kudasai.",
                        },
                        {
                            id: 1,
                            phrase: "Iie, Abunakunai desu. Ki wo tsukete kudasai.",
                        },
                        {
                            id: 2,
                            phrase: "Iie, Abunaku arimasen desu.Ki wo tsukete kudasai.",
                        },
                    ],
                ],
            ],
            mid: [
                [
                    `En el restaurante, menu es "Chorillana" y Japones(a) te pregunto "Kore wa Karai desuka?", como vas a responder?`,
                    [
                        {
                            id: 0,
                            phrase: "Iie, Karaku arimasen. Shoppai desu. Soshite Oishii desu.",
                        },
                        {
                            id: 1,
                            phrase: "Iie, Karaku arimasen. Nigai desu. Soshite Oishii desu.",
                        },
                        {
                            id: 2,
                            phrase: "Iie, Karaku arimasen. Usui desu. Soshite Oishii desu.",
                        },
                    ],
                ],
                [
                    "En la tienda de regalo, Japones(a) se esta probando un poncho pero, se ve demasiado grande, que vas a decir? ",
                    [
                        { id: 0, phrase: "Dou desuka ? Ookii desuka?" },
                        { id: 1, phrase: "Dou desuka? Chiisai desuka?" },
                        { id: 2, phrase: "Dou desuka? Kitanai desuka?" },
                    ],
                ],
                [
                    `En la tienda de regalo, viendo cuchufli de $5000(4 cuchufli en una bolsa), Japones(a) te pregunto "Kono Kuchufuri- wa yasui desuka?",como vas a responder?`,
                    [
                        { id: 0, phrase: "U-n...Yasukunaidesu..." },
                        { id: 1, phrase: "U-n...Yasuidesu." },
                        { id: 2, phrase: "U-n...Oishikunaidesu." },
                    ],
                ],
                [
                    `Estamos en lugar X que dice "Silencio", que vas a decir?`,
                    [
                        { id: 0, phrase: "Koko wa shizuka ni shimashou." },
                        { id: 1, phrase: "Koko wa urusaku shimashou." },
                        { id: 2, phrase: "Koko wa otonashiku shimashou." },
                    ],
                ],
                [
                    "Estan viendo una Iglecia Catolica grande, como la describirias ?",
                    [
                        {
                            id: 0,
                            phrase: "Kono katorikku no kyoukai wa ookiidesu. Soshite, naka wa hiroi desu.",
                        },
                        {
                            id: 1,
                            phrase: "Kono katorikku no kyoukai wa semai. Soshite, naka wa samui desu.",
                        },
                        {
                            id: 2,
                            phrase: "Kono katorikku no kyoukai wa kirei. Soshite, naka wa kakkoii desu.",
                        },
                    ],
                ],
            ],
            hard: [
                [
                    "Estan caminando por el cerro y hay una persona extraña en la calle, que vas a decir?",
                    [
                        {
                            id: 0,
                            phrase: "Henna hito ga imasu ! ",
                        },
                        {
                            id: 1,
                            phrase: "Kawaii hito ga imasu!",
                        },
                        { id: 2, phrase: "Hima na hito ga imasu!" },
                    ],
                ],
                [
                    `Estan viendo "Manjar" y Japones(a) pregunto "Manha-ru wa donna aji desuka?" quieres decir "Es suave(textura) y dulce", como vas a decir?  `,
                    [
                        {
                            id: 0,
                            phrase: "ManHa-ru wa Yawarakai desu. Soshite amai desu.",
                        },
                        {
                            id: 1,
                            phrase: "ManHa-ru wa Katai desu. Soshite amai desu.",
                        },
                        {
                            id: 2,
                            phrase: "ManHa-ru wa Nigate desu. Soshite amai desu.",
                        },
                    ],
                ],
                [
                    `En la tienda de regalo, Japones(a) esta viendo sorprendido a un Indio picaro y te pregunto "Kore nandesuka?!", que vas a decir? `,
                    [
                        {
                            id: 0,
                            phrase: "Kore no namae wa Indio Pikaro desu. Chiri no shukougeihin desu. Kawaii Mapuche no ningyou desu.",
                        },
                        {
                            id: 1,
                            phrase: "Kore no namae wa Indio Pikaro desu. Chiri no osusume desu. Kawaii Mapuche no ningyou desu.",
                        },
                        {
                            id: 2,
                            phrase: "Kore no namae wa Indio Pikaro desu. Chiri no yuumeina desu. Warui Mapuche no ningyou desu.",
                        },
                    ],
                ],
                [
                    `En la calle viendo las tiendas, Japones(a) te pregunto "X san wa X ga sukidesuka?" y quieres decir "No me gusta tanto"`,
                    [
                        {
                            id: 0,
                            phrase: "Nigate desu.",
                        },
                        {
                            id: 1,
                            phrase: "Kirai desu.",
                        },
                        {
                            id: 2,
                            phrase: "Suki desuka?",
                        },
                    ],
                ],
                [
                    `En la tienda del regalo, Japones(a) te pregunto "Kore no Aka arimasuka?" y tu sabes que hay variedad de colores, como vas a responder?`,
                    [
                        {
                            id: 0,
                            phrase: "Iroiro na iro ga arimasu.",
                        },
                        {
                            id: 1,
                            phrase: "Aka ga arimasu.",
                        },
                        {
                            id: 2,
                            phrase: "Shiro ga arimasu.",
                        },
                    ],
                ],
            ],
        },
        dragDrop: [],
    },

    // 701: {
    //     version: "07012024",
    //     mondaiTitle:
    //         "Selecciona la respuesta adecuada dependiendo de la situacion.",
    //     dragTitle:
    //         "Ordena la respuesta a la pregunta en Japones. (pueden haber palabras extras dentro de las opciones)",
    //     mondaiOptions: {
    //         easy: 2,
    //         mid: 2,
    //         hard: 1,
    //     },
    //     dragOptions: {
    //         quantity: 3,
    //     },
    //     mondai: [
    //         [
    //             "Situacion en espaniol 1 facil",
    //             [
    //                 { id: 0, phrase: "Respuesta correcta en japones" },
    //                 { id: 1, phrase: "Respuesta incorrecta en japones 1" },
    //                 { id: 2, phrase: "Respuesta incorrecta en japones 2" },
    //             ],
    //         ],
    //         [
    //             "Situacion en espaniol 2 facil",
    //             [
    //                 { id: 0, phrase: "Respuesta correcta en japones" },
    //                 { id: 1, phrase: "Respuesta incorrecta en japones 1" },
    //                 { id: 2, phrase: "Respuesta incorrecta en japones 2" },
    //             ],
    //         ],
    //         [
    //             "Situacion en espaniol 3 facil",
    //             [
    //                 { id: 0, phrase: "Respuesta correcta en japones" },
    //                 { id: 1, phrase: "Respuesta incorrecta en japones 1" },
    //                 { id: 2, phrase: "Respuesta incorrecta en japones 2" },
    //             ],
    //         ],
    //         [
    //             "Situacion en espaniol 4 facil",
    //             [
    //                 { id: 0, phrase: "Respuesta correcta en japones" },
    //                 { id: 1, phrase: "Respuesta incorrecta en japones 1" },
    //                 { id: 2, phrase: "Respuesta incorrecta en japones 2" },
    //             ],
    //         ],
    //         [
    //             "Situacion en espaniol 5 facil",
    //             [
    //                 { id: 0, phrase: "Respuesta correcta en japones" },
    //                 { id: 1, phrase: "Respuesta incorrecta en japones 1" },
    //                 { id: 2, phrase: "Respuesta incorrecta en japones 2" },
    //             ],
    //         ],
    //         [
    //             "Situacion en espaniol 6 medio",
    //             [
    //                 { id: 0, phrase: "Respuesta correcta en japones" },
    //                 { id: 1, phrase: "Respuesta incorrecta en japones 1" },
    //                 { id: 2, phrase: "Respuesta incorrecta en japones 2" },
    //             ],
    //         ],
    //         [
    //             "Situacion en espaniol 7 medio",
    //             [
    //                 { id: 0, phrase: "Respuesta correcta en japones" },
    //                 { id: 1, phrase: "Respuesta incorrecta en japones 1" },
    //                 { id: 2, phrase: "Respuesta incorrecta en japones 2" },
    //             ],
    //         ],
    //         [
    //             "Situacion en espaniol 8 medio",
    //             [
    //                 { id: 0, phrase: "Respuesta correcta en japones" },
    //                 { id: 1, phrase: "Respuesta incorrecta en japones 1" },
    //                 { id: 2, phrase: "Respuesta incorrecta en japones 2" },
    //             ],
    //         ],
    //         [
    //             "Situacion en espaniol 9 medio",
    //             [
    //                 { id: 0, phrase: "Respuesta correcta en japones" },
    //                 { id: 1, phrase: "Respuesta incorrecta en japones 1" },
    //                 { id: 2, phrase: "Respuesta incorrecta en japones 2" },
    //             ],
    //         ],
    //         [
    //             "Situacion en espaniol 10 medio",
    //             [
    //                 { id: 0, phrase: "Respuesta correcta en japones" },
    //                 { id: 1, phrase: "Respuesta incorrecta en japones 1" },
    //                 { id: 2, phrase: "Respuesta incorrecta en japones 2" },
    //             ],
    //         ],
    //         [
    //             "Situacion en espaniol 11 dificil",
    //             [
    //                 { id: 0, phrase: "Respuesta correcta en japones" },
    //                 { id: 1, phrase: "Respuesta incorrecta en japones 1" },
    //                 { id: 2, phrase: "Respuesta incorrecta en japones 2" },
    //             ],
    //         ],
    //         [
    //             "Situacion en espaniol 12 dificil",
    //             [
    //                 { id: 0, phrase: "Respuesta correcta en japones" },
    //                 { id: 1, phrase: "Respuesta incorrecta en japones 1" },
    //                 { id: 2, phrase: "Respuesta incorrecta en japones 2" },
    //             ],
    //         ],
    //         [
    //             "Situacion en espaniol 13 dificil",
    //             [
    //                 { id: 0, phrase: "Respuesta correcta en japones" },
    //                 { id: 1, phrase: "Respuesta incorrecta en japones 1" },
    //                 { id: 2, phrase: "Respuesta incorrecta en japones 2" },
    //             ],
    //         ],
    //         [
    //             "Situacion en espaniol 14 dificil",
    //             [
    //                 { id: 0, phrase: "Respuesta correcta en japones" },
    //                 { id: 1, phrase: "Respuesta incorrecta en japones 1" },
    //                 { id: 2, phrase: "Respuesta incorrecta en japones 2" },
    //             ],
    //         ],
    //         [
    //             "Situacion en espaniol 15 dificil",
    //             [
    //                 { id: 0, phrase: "Respuesta correcta en japones" },
    //                 { id: 1, phrase: "Respuesta incorrecta en japones 1" },
    //                 { id: 2, phrase: "Respuesta incorrecta en japones 2" },
    //             ],
    //         ],
    //     ],
    //     dragDrop: [
    //         [
    //             "Pregunta en japones 1",
    //             "Respuestacorrectaenjapones1",
    //             [
    //                 { id: 0, drag: "Respuesta" },
    //                 { id: 1, drag: "correcta" },
    //                 { id: 2, drag: "en" },
    //                 { id: 3, drag: "japones" },
    //                 { id: 4, drag: "1" },
    //                 { id: 5, drag: "incorrecto 1" },
    //                 { id: 6, drag: "incorrecto 2" },
    //                 { id: 7, drag: "incorrecto 3" },
    //             ],
    //         ],
    //         [
    //             "Pregunta en japones 2",
    //             "Respuestacorrectaenjapones2",
    //             [
    //                 { id: 0, drag: "Respuesta" },
    //                 { id: 1, drag: "correcta" },
    //                 { id: 2, drag: "en" },
    //                 { id: 3, drag: "japones" },
    //                 { id: 4, drag: "2" },
    //                 { id: 5, drag: "incorrecto 1" },
    //                 { id: 6, drag: "incorrecto 2" },
    //                 { id: 7, drag: "incorrecto 3" },
    //             ],
    //         ],
    //         [
    //             "Pregunta en japones 3",
    //             "Respuestacorrectaenjapones3",
    //             [
    //                 { id: 0, drag: "Respuesta" },
    //                 { id: 1, drag: "correcta" },
    //                 { id: 2, drag: "en" },
    //                 { id: 3, drag: "japones" },
    //                 { id: 4, drag: "3" },
    //                 { id: 5, drag: "incorrecto 1" },
    //                 { id: 6, drag: "incorrecto 2" },
    //                 { id: 7, drag: "incorrecto 3" },
    //             ],
    //         ],
    //     ],
    // },
    // 777: {
    //     version: "321321",
    //     mondaiTitle:
    //         "Selecciona la respuesta adecuada dependiendo de la situacion.",
    //     dragTitle:
    //         "Ordena la respuesta a la pregunta en Japones. (pueden haber palabras extras dentro de las opciones)",
    //     mondaiOptions: {
    //         easy: 3,//y aqui elegimos cuantos queremos
    //         mid: 3,
    //         hard: 3,
    //     },
    //     mondai: {
    //         easy: [["la cantidad de problemas faciles que queramos"]],//puede ser la cantidad que sea
    //         mid: [["la cantidad de problemas medio que queramos"]],//otras pruebas pueden tener otra cantidad
    //         hard: [["la cantidad de problemas dificil que queramos"]],//asi no dependemos de dividir las preguntas en 5,5,5
    //     },
    // },
    702: {
        version: "09012024",
        mondaiTitle:
            "Selecciona la respuesta adecuada dependiendo de la situacion.",
        dragTitle:
            "Ordena la respuesta a la pregunta en Japones. (pueden haber palabras extras dentro de las opciones)",
        mondaiOptions: {
            easy: 3,
            mid: 3,
            hard: 3,
        },
        dragOptions: {
            quantity: 0,
        },
        mondai: {
            easy: [
                [
                    "Cuando ves a la persona por PRIMERA VEZ, como tienes que saludar?",
                    [
                        {
                            id: 0,
                            phrase: "Hajimemashite! Watashi wa Ferunando desu.Yoroshiku onegaishimasu",
                        },
                        {
                            id: 1,
                            phrase: "Konnichiwa! Watashi wa Ferunando desu.Yoroshiku onegaishimasu",
                        },
                        {
                            id: 2,
                            phrase: "Ohayou gozaimasu! Watashi wa Ferunando desu.Yoroshiku onegaishimasu",
                        },
                    ],
                ],
                [
                    "Cuando ves una persona que esta mirando para alla, para aca... que vas a decir a esta persona?",
                    [
                        { id: 0, phrase: "Daijyoubu desuka?" },
                        { id: 1, phrase: "Nandesuka?" },
                        { id: 2, phrase: "Doko desuka?" },
                    ],
                ],
                [
                    "Cuando quieres saber una palabra EN JAPONES, como tenias que preguntar?",
                    [
                        { id: 0, phrase: "XXX wa nihongo de nandesuka?" },
                        { id: 1, phrase: "XXX wa nandesuka?" },
                        { id: 2, phrase: "XXX wa nihongo desu." },
                    ],
                ],
                [
                    "Japones(a) te pregunto 「Kore wa nandesuka?」como puedes responder?",
                    [
                        { id: 0, phrase: "Kore wa XXX desu" },
                        { id: 1, phrase: "Kore XXX wa anata no desu." },
                        { id: 2, phrase: "Kore XXX wa chiri desu." },
                    ],
                ],
                [
                    "Japones(a) te pregunto「Otearai wa doko desuka?」como puedes responder?",
                    [
                        { id: 0, phrase: "Kochira desu." },
                        { id: 1, phrase: "Kono desu." },
                        { id: 2, phrase: "Kore desu." },
                    ],
                ],
            ],
            mid: [
                [
                    "Estas caminando en plaza soto mayor y pasando donde bomberos, que vas a decir?",
                    [
                        { id: 0, phrase: "Kore wa shoubousha desu." },
                        { id: 1, phrase: "Kore wa chiri desu." },
                        { id: 2, phrase: "Kore wa gakkou desu." },
                    ],
                ],
                [
                    "Estas caminando en plaza soto mayor y casi llegando al acensor, que vas a decir?",
                    [
                        { id: 0, phrase: "Are wa asenso-ru desu." },
                        { id: 1, phrase: "Are wa baruparaiso desu." },
                        { id: 2, phrase: "Are wa resutoran desu." },
                    ],
                ],
                [
                    "Cuando quieres saber el nombre de la(s) persona(s) que estas guiando, como vas a preguntar?",
                    [
                        {
                            id: 0,
                            phrase: "Sumimasen ga, Anata no namae wa nandesuka?",
                        },
                        {
                            id: 1,
                            phrase: "Sumimasen ga, Anata wa namae wa nandesuka?",
                        },
                        { id: 2, phrase: "Sumimasen ga, Anata namae desuka?" },
                    ],
                ],
                [
                    "Estamos en el restaurante, quieres explicar sobre el Menu del dia, como puedes explicar ?",
                    [
                        {
                            id: 0,
                            phrase: "Zensai wa Su-pu desu.Mein wa Oniku desu. Deza-to wa Chokore-to desu.",
                        },
                        {
                            id: 1,
                            phrase: "Sarada desu.Oniku desu.Chokore-to desu.",
                        },
                        {
                            id: 2,
                            phrase: "Menyu-desu.Su-pu desu. Oniku desu. Chokore-to desu.",
                        },
                    ],
                ],
                [
                    "Cuando termina el tour, que tienes que decir?",
                    [
                        {
                            id: 0,
                            phrase: "Otsukare sama deshita.Arigatou gozaimashita.",
                        },
                        { id: 1, phrase: "Konnichiwa.Arigatou gozaimashita." },
                        { id: 2, phrase: "Hai.Arigatou gozaimashita." },
                    ],
                ],
            ],
            hard: [
                [
                    "Japones(a) te pregunto teniendo un vino tinto a su mano「Kore wa Jyu-su desuka?」como puedes responder?",
                    [
                        {
                            id: 0,
                            phrase: "Iie, Jyu-su jya arimasen. Aka wain desu.",
                        },
                        { id: 1, phrase: "Hai, Jyu-su desu." },
                        { id: 2, phrase: "Iie, Jyu-su desu." },
                    ],
                ],
                [
                    "Japones(a) te pregunto mirando en direccion a la estatua de sotomayor 「Sore wa nandesuka?」como puedes responder?",
                    [
                        { id: 0, phrase: "Sore wa Sotomajyo-ru hiroba desu." },
                        { id: 1, phrase: "Sore wa Zou desu." },
                        { id: 2, phrase: "Sore wa Kafe desu." },
                    ],
                ],
                [
                    "Japones(a) te pregunto mirando la carta de restaurante, 「Carne de vacuno wa oniku desuka?」como puedes responder?",
                    [
                        { id: 0, phrase: "Hai, oniku desu. Gyuu niku desu." },
                        { id: 1, phrase: "Hai, oniku desu. Buta niku desu." },
                        {
                            id: 2,
                            phrase: "Iie, oniku jya arimasen. Daizu mi-to desu.",
                        },
                    ],
                ],
                [
                    "Japones(a) te pregunto mirando a la iglesia catolica 「Are wa nandesuka?」como puedes responder?",
                    [
                        { id: 0, phrase: "Katorikku no kyoukai desu." },
                        { id: 1, phrase: "Ie desu." },
                        { id: 2, phrase: "Tatemono desu." },
                    ],
                ],
                [
                    `Japones(a) mirando "$100" en asensor, y quieres decir 「Ese es precio (de ascensor).」como puedes decir?`,
                    [
                        {
                            id: 0,
                            phrase: "Kore wa ryoukin desu.(Kore wa asenso-ru no ryoukin desu.)",
                        },
                        {
                            id: 1,
                            phrase: "Kore wa otona desu.(Kore wa asenso-ru no otona desu.)",
                        },
                        {
                            id: 2,
                            phrase: "Kore wa norimono desu.(Kore wa asenso-ru no norimono desu.)",
                        },
                    ],
                ],
            ],
        },
        dragDrop: [],
    },
    703: {
        version: "24012024",
        mondaiTitle:
            "Selecciona la respuesta adecuada dependiendo de la situacion.",
        dragTitle:
            "Ordena la respuesta a la pregunta en Japones. (pueden haber palabras extras dentro de las opciones)",
        mondaiOptions: {
            easy: 3,
            mid: 3,
            hard: 3,
        },
        dragOptions: {
            quantity: 0,
        },
        mondai: {
            easy: [
                [
                    "Cuando caminando en el Hodou, los japoneses estan mirando otro lado... que vas a decir?",
                    [
                        {
                            id: 0,
                            phrase: "Sumimasen ! Kochira ni kite kudasai!",
                        },
                        {
                            id: 1,
                            phrase: "Sumimasen ! Kochira ni ikimashouka?",
                        },
                        {
                            id: 2,
                            phrase: "Sumimasen ! Kochira ni ittemo iidesuka?",
                        },
                    ],
                ],
                [
                    "En el restaurante, los japoneses estan buscando sus asientos... que vas a decir?",
                    [
                        { id: 0, phrase: "Anata no seki wa kokodesuyo." },
                        { id: 1, phrase: "Anata no seki wa jiyuu desu." },
                        { id: 2, phrase: "Anata no isu wa kore desu." },
                    ],
                ],
                [
                    "Cuando caminando hodou y no tiene semaforo pero, quieres cruzar, justamente viene auto un poco cerca... que vas a decir?",
                    [
                        { id: 0, phrase: "Sukoshi matte kudasai." },
                        { id: 1, phrase: "Sukoshi matemo iidesuka?" },
                        { id: 2, phrase: "Sukoshi matanaide kudasai." },
                    ],
                ],
                [
                    "Cuando hay Henna hito/Abunai hito en la calle, pero, para los japoneses les llamo la atencion y sacando la foto, grabando video... que vas a decir?",
                    [
                        {
                            id: 0,
                            phrase: "Sumimasen! Shashin wo toranaide kudasai./Bideo wo toranaide kudasai.",
                        },
                        {
                            id: 1,
                            phrase: "Sumimasen! Shashin wo torimashouka?/Bideo wo torimashouka?",
                        },
                        {
                            id: 2,
                            phrase: "Sumimasen! Henna hito/Abunai hito desune?",
                        },
                    ],
                ],
                [
                    "Cuando estan caminando hodou un poco mal estado, que vas a decir?",
                    [
                        { id: 0, phrase: "Ashimoto kiwo tsukete kudasai!" },
                        { id: 1, phrase: "Aruite kudasai! Mite kudasai!" },
                        { id: 2, phrase: "Ashi mite aruite kudasai." },
                    ],
                ],
            ],
            mid: [
                [
                    "Cuando un lugar mas o menos tranquilo, que vas a decir?",
                    [
                        {
                            id: 0,
                            phrase: "Koko de shashin wo tottemo iidesuyo.",
                        },
                        {
                            id: 1,
                            phrase: "Koko de shashin wo kattemo iidesuyo.",
                        },
                        { id: 2, phrase: "Koko de bideo wo mitemo iidesuyo." },
                    ],
                ],
                [
                    "Cuando caminando hodou y el(la) japones(a) se ve que tiene algun dificultad... que vas a decir?",
                    [
                        { id: 0, phrase: "(Watashi no) Ude wo mochimasuka?" },
                        {
                            id: 1,
                            phrase: "(Watashi no) Te wo motanaide kudasai.",
                        },
                        {
                            id: 2,
                            phrase: "(Watashi no) Kaban wo mochimashouka?",
                        },
                    ],
                ],
                [
                    "Cuando japones(a) te pregunto algunas cosas pero, no sabias la respuesta... que vas a decir?",
                    [
                        {
                            id: 0,
                            phrase: "Sumimasen, sukoshi matte kudasai, shirabemasu.",
                        },
                        {
                            id: 1,
                            phrase: "Wakaranai, shirabete.",
                        },
                        {
                            id: 2,
                            phrase: "Sumimasen, shiranai, sagashitemoiidesuka?",
                        },
                    ],
                ],
                [
                    "Ya llegando la hora de tren, pero, los japoneses estan caminando leeeento... que vas a decir?",
                    [
                        {
                            id: 0,
                            phrase: "Minasan ! Densha ga kimashita! Isogimashou!",
                        },
                        {
                            id: 1,
                            phrase: "Minasan ! Hayaku! Densha!",
                        },
                        {
                            id: 2,
                            phrase: "Minasan ! Nottemo iidesu!",
                        },
                    ],
                ],
                [
                    "Cuando caminando, henna hito (ho-muresu) pidio dinero a japoneses... que vas a decir?",
                    [
                        {
                            id: 0,
                            phrase: "Okane wo agenaide kudasai.",
                        },
                        { id: 1, phrase: "Daijyoubu desu." },
                        { id: 2, phrase: "Okane ga arimasuka?" },
                    ],
                ],
            ],
            hard: [
                [
                    "En el restaurante, el(la) japones(a) se ve que esta buscando el baño... que vas a decir?",
                    [
                        {
                            id: 0,
                            phrase: "Otearai wa shita ni hitotsu, ueni futatsu arimasu.",
                        },
                        { id: 1, phrase: "Otearai wo mimasuka?" },
                        { id: 2, phrase: "Otearai ni ikimashouka?" },
                    ],
                ],
                [
                    "Haciendo tour, quieres saber si los japoneses tienen duda o no... que vas a decir?",
                    [
                        { id: 0, phrase: "Shitsumon ga arimasuka?" },
                        { id: 1, phrase: "Shitsumon motteimasuka?" },
                        { id: 2, phrase: "Shitsumon iimasuka?" },
                    ],
                ],
                [
                    "En la tienda X los japoneses tiene algo en la mano y caminando... que vas a decir?",
                    [
                        { id: 0, phrase: "Sore, kaimasuka?" },
                        { id: 1, phrase: "Sore, irimasuka?" },
                        {
                            id: 2,
                            phrase: "Sore, moraimasuka?",
                        },
                    ],
                ],
                [
                    "En el ascensor, tren, los japoneses te preguntaron sobre precio de ellos y haciendo gesto de pagar... que vas a decir?",
                    [
                        {
                            id: 0,
                            phrase: "Daijyoubu desu! Watashi ga haraimasu.",
                        },
                        {
                            id: 1,
                            phrase: "Daijyoubu desu! Watashi ga hairimasu.",
                        },
                        {
                            id: 2,
                            phrase: "Daijyoubu desu! Watashi ga kaerimasu.",
                        },
                    ],
                ],
                [
                    `En la tienda, los japoneses estan viendo lo que hay, etc y quieres ofrecer vealo mas cerca o toma en su mano... como vas a decir?`,
                    [
                        {
                            id: 0,
                            phrase: "Douzo! Mite kudasai! Sawatte kudasai!",
                        },
                        {
                            id: 1,
                            phrase: "Doumo! Mite kudasai! Tsukatte kudasai!",
                        },
                        {
                            id: 2,
                            phrase: "Douzo! Mite kudasai! Suwatte kudasai!",
                        },
                    ],
                ],
            ],
        },

        dragDrop: [],
    },
};
