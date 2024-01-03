export const tests = {
    1: {
        version: "01012024",
        mondai: [
            //5 problemas por set
            //primer problema de multiple eleccion
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
};
