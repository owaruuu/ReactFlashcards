export const tests = {
    3: {
        mondai: [
            //5 problemas por set
            //primer problema de multiple eleccion
            [
                //set de frases en japones
                {
                    0: "わたしは　マイク・ミラーです。",
                    1: "サントスさんは　学生じゃありません。",
                    2: "ミラーさんは　会社員ですか。",
                },
                //set de traducciones
                [
                    {
                        id: 0,
                        phrase: "Yo soy Mike Miller.",
                    },
                    {
                        id: 1,
                        phrase: "El Sr. Santos no es estudiante.",
                    },
                    {
                        id: 2,
                        phrase: "Es el Sr. Miller empleado de una empresa ?",
                    },
                ],
            ],
            //segundo problema...
            [
                //set de frases en japones
                {
                    0: "サントスさんも　会社員です。",
                    1: "ミラーさんは　学生ですか。",
                    2: "あの　方は　どなたですか。",
                },
                //set de traducciones
                [
                    {
                        id: 0,
                        phrase: "El Sr. Santos tambien es un empleado de una empresa.",
                    },
                    {
                        id: 1,
                        phrase: "Es el Sr. Miller estudiante ?",
                    },
                    {
                        id: 2,
                        phrase: "Quien es aquella persona ?",
                    },
                ],
            ],
        ],
        dragDrop: [],
        manga: {},
    },
};
