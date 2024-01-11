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
                    { id: 7, drag: "です。" },
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
                    "Japones(a) te pregunto mirando estatua de sotomayor 「Sore wa nandesuka?」como puedes responder?",
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
};
