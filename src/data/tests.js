export const tests = {
    3: {
        version: "24112023",
        mondai: [
            //5 problemas por set
            //primer problema de multiple eleccion
            [
                //frase en japones
                "わたしは、チリじんです。",
                //set de traducciones
                [
                    {
                        id: 0,
                        phrase: "Yo soy chileno.",
                    },
                    {
                        id: 1,
                        phrase: "Yo soy americano.",
                    },
                    {
                        id: 2,
                        phrase: "Yo soy japones.",
                    },
                ],
            ],
            // segundo problema...
            // [
            //     //frase en japones
            //     "わたしは、エンジニアです。",
            //     //set de traducciones
            //     [
            //         {
            //             id: 0,
            //             phrase: "Yo soy ingeniero.",
            //         },
            //         {
            //             id: 1,
            //             phrase: "Yo soy profesor.",
            //         },
            //         {
            //             id: 2,
            //             phrase: "Yo soy estudiante.",
            //         },
            //     ],
            // ],
            // [
            //     //frase en japones
            //     "わたしは、おとなです。",
            //     //set de traducciones
            //     [
            //         {
            //             id: 0,
            //             phrase: "Yo soy adulto.",
            //         },
            //         {
            //             id: 1,
            //             phrase: "Yo soy niño.",
            //         },
            //         {
            //             id: 2,
            //             phrase: "Yo soy hombre.",
            //         },
            //     ],
            // ],
            // [
            //     //frase en japones
            //     "じぶんは、がくせいじゃありません。",
            //     //set de traducciones
            //     [
            //         {
            //             id: 0,
            //             phrase: "Yo no soy estudiante.",
            //         },
            //         {
            //             id: 1,
            //             phrase: "Yo no soy profesor.",
            //         },
            //         {
            //             id: 2,
            //             phrase: "Yo no soy trabajador.",
            //         },
            //     ],
            // ],
            // [
            //     //frase en japones
            //     "あなたは、ねこではありません。",
            //     //set de traducciones
            //     [
            //         {
            //             id: 0,
            //             phrase: "Usted no es gato.",
            //         },
            //         {
            //             id: 1,
            //             phrase: "Usted no es perro.",
            //         },
            //         {
            //             id: 2,
            //             phrase: "Usted no es animal.",
            //         },
            //     ],
            // ],
        ],
        dragDrop: [
            //primer set
            [
                "Yo no soy japones.",
                "うちはにほんじんじゃありません",
                [
                    { id: 0, drag: "うち" },
                    { id: 1, drag: "は" },
                    { id: 2, drag: "にほん" },
                    { id: 3, drag: "じん" },
                    { id: 4, drag: "じゃ" },
                    { id: 5, drag: "ありません" },
                ],
                [
                    { id: 6, drag: "あなた" },
                    { id: 7, drag: "を" },
                    { id: 8, drag: "くん" },
                ],
            ],
            // //segundo set
            // [
            //     "Usted es chileno?",
            //     "あなたは、チリじんですか",
            //     [
            //         { id: 0, drag: "あなた" },
            //         { id: 1, drag: "は、" },
            //         { id: 2, drag: "チリ" },
            //         { id: 3, drag: "じん" },
            //         { id: 4, drag: "です" },
            //         { id: 5, drag: "か" },
            //     ],
            //     [
            //         { id: 6, drag: "わたし" },
            //         { id: 7, drag: "が" },
            //         { id: 8, drag: "さん" },
            //     ],
            // ],
        ],
        manga: {},
    },
};
