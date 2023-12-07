[
    {
        date: "2015-20-10",
        multiple: [
            {
                question: "What do you want to",
                answer: "asdasdasd",
                correct: false,
            },
        ],
        drag: [
            {
                question: "What do you want to",
                answer: "asdasdasd",
                correct: false,
            },
        ],
    },
];

[
    {
        currentProgress: {
            ...user.currentProgress,
            [lecture.lectureId]: {
                ...user.currentProgress[lecture.lectureId],
                highScore: {
                    score: {
                        [test.version]: score,
                    },
                    date: "2015-20-10",
                    multiple: [
                        {
                            prompt: "What do you want to",
                            answer: "asdasdasd",
                            correct: false,
                        },
                    ],
                    drag: [
                        {
                            prompt: "frase en espaniol",
                            expected: "frase traducida al japones",
                            answer: "mi respuesta",
                            correct: false,
                        },
                    ],
                },
                lastTest: {
                    score: {
                        [test.version]: score,
                    },
                    date: "2015-20-10",
                    multiple: [
                        {
                            question: "What do you want to",
                            answer: "asdasdasd",
                            correct: false,
                        },
                    ],
                    drag: [
                        {
                            prompt: "frase en espaniol",
                            expected: "frase traducida al japones",
                            answer: "mi respuesta",
                            correct: false,
                        },
                    ],
                },
            },
        },
    },
];
