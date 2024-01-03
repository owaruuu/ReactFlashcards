export const tests = {
    3: {
        version: "24112023",
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
                "El nombre de mi profesor de idioma japones es Saitou.",
                "わたしのにほんごのせんせいのなまえは、さいとうです。",
                [
                    { id: 0, drag: "わたし" },
                    { id: 1, drag: "の" },
                    { id: 2, drag: "にほんご" },
                    { id: 3, drag: "の" },
                    { id: 4, drag: "せんせい" },
                    { id: 5, drag: "の" },
                    { id: 6, drag: "なまえ" },
                    { id: 7, drag: "は、" },
                    { id: 8, drag: "さいとう" },
                    { id: 9, drag: "です。" },
                ],
            ],
            [
                "El nombre de mi profesor de idioma es Yamaguchi.",
                "わたしのごがくのせんせいのなまえは、やまぐちです。",
                [
                    { id: 0, drag: "わたし" },
                    { id: 1, drag: "の" },
                    { id: 2, drag: "ごがく" },
                    { id: 3, drag: "の" },
                    { id: 4, drag: "せんせい" },
                    { id: 5, drag: "の" },
                    { id: 6, drag: "なまえ" },
                    { id: 7, drag: "は、" },
                    { id: 8, drag: "やまぐち" },
                    { id: 9, drag: "です。" },
                ],
            ],
            [
                "Manana es el dia de clase de japones?",
                "あしたは、にほんごのじゅぎょうのひですか",
                [
                    { id: 0, drag: "あした" },
                    { id: 1, drag: "は、" },
                    { id: 2, drag: "にほんご" },
                    { id: 3, drag: "の" },
                    { id: 4, drag: "じゅぎょう" },
                    { id: 5, drag: "の" },
                    { id: 6, drag: "ひ" },
                    { id: 7, drag: "です" },
                    { id: 8, drag: "か" },
                ],
            ],
            [
                "Feriado es dia de descanso.",
                "しゅくじつは、やすみです。",
                [
                    { id: 0, drag: "しゅくじつ" },
                    { id: 1, drag: "は、" },
                    { id: 2, drag: "やすみ" },
                    { id: 3, drag: "です。" },
                ],
            ],
            [
                "Este finde semana es mi cumpleaños.",
                "こんしゅうまつは、わたしのたんじょうびです。",
                [
                    { id: 0, drag: "こん" },
                    { id: 1, drag: "しゅうまつ" },
                    { id: 2, drag: "は、" },
                    { id: 3, drag: "わたし" },
                    { id: 4, drag: "の" },
                    { id: 5, drag: "たんじょうび" },
                    { id: 6, drag: "です。" },
                ],
            ],
            [
                "La chorillana es comida de chile.",
                "チョリジャナは、チリのたべものです。",
                [
                    { id: 0, drag: "チョリジャナ" },
                    { id: 1, drag: "は、" },
                    { id: 2, drag: "チリ" },
                    { id: 3, drag: "の" },
                    { id: 4, drag: "たべもの" },
                    { id: 5, drag: "です。" },
                ],
            ],
            [
                "El sake no es un alcohol de chile.",
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
                "El profesor no es Argentino.",
                "せんせいは、アルゼンチンじんではありません。",
                [
                    { id: 0, drag: "せんせい" },
                    { id: 1, drag: "は、" },
                    { id: 2, drag: "アルゼンチン" },
                    { id: 3, drag: "じん" },
                    { id: 4, drag: "では" },
                    { id: 5, drag: "ありません。" },
                ],
            ],
            [
                "La Cueca es Baile de Chile?",
                "クエカは、チリのおどりですか？",
                [
                    { id: 0, drag: "クエカ" },
                    { id: 1, drag: "は、" },
                    { id: 2, drag: "チリ" },
                    { id: 3, drag: "の" },
                    { id: 4, drag: "おどり" },
                    { id: 5, drag: "です" },
                    { id: 6, drag: "か？" },
                ],
            ],
            [
                "Seba es Chileno. Jose tambien.",
                "セバさんは、チリじんです。ホセさんもです。",
                [
                    { id: 0, drag: "セバ" },
                    { id: 1, drag: "さん" },
                    { id: 2, drag: "は、" },
                    { id: 3, drag: "チリ" },
                    { id: 4, drag: "じん" },
                    { id: 5, drag: "です。" },
                    { id: 6, drag: "ホセ" },
                    { id: 7, drag: "さん" },
                    { id: 8, drag: "も" },
                    { id: 9, drag: "です。" },
                ],
            ],
            [
                "Mon Laferte es cantante chilena. Violeta Parra tambien.",
                "モン・ラフェルテは、チリじんかしゅです。ビオレタ・パラもです。",
                [
                    { id: 0, drag: "モン・ラフェルテ" },
                    { id: 1, drag: "は、" },
                    { id: 2, drag: "チリ" },
                    { id: 3, drag: "じん" },
                    { id: 4, drag: "かしゅ" },
                    { id: 5, drag: "です。" },
                    { id: 6, drag: "ビオレタ・パラ" },
                    { id: 7, drag: "も" },
                    { id: 8, drag: "です。" },
                ],
            ],
        ],

        manga: {},
    },
};
