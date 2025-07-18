import LectureButton from "./LectureButton.js/LectureButton";
import { pickDifference, getDiff, ONE_HOUR } from "../../utils/utils.js";

const LectureButtons = (props) => {
    const {
        allLecturesDataQuery,
        orderingState,
        filterState,
        lectures,
        isKanjiView,
    } = props;
    // console.log("🚀 ~ LectureButtons ~ lectures:", lectures);

    const starredAmountObject =
        allLecturesDataQuery?.status === "success"
            ? calculateStarred(allLecturesDataQuery.data)
            : {};

    const dataObject =
        allLecturesDataQuery?.status === "success"
            ? buildLectureData(allLecturesDataQuery.data)
            : {};

    const filledLectures = insertSessionData(lectures, dataObject, isKanjiView);
    // console.log("🚀 ~ LectureButtons ~ filledLectures:", filledLectures);

    const amountCanLearn =
        allLecturesDataQuery?.status === "success"
            ? calculateAmountReady(filledLectures, isKanjiView)
            : {};
    // console.log("🚀 ~ LectureButtons ~ amountCanLearn:", amountCanLearn);

    let filters = [];

    for (const [key, value] of Object.entries(filterState)) {
        if (value) {
            filters.push(key);
        }
    }

    let filteredLectures = [];

    if (filters.length > 0) {
        filteredLectures = filterLectures(filters, filledLectures);
    } else {
        filteredLectures = filledLectures;
    }

    const sortedLectures = sortLectures(orderingState, filteredLectures);

    const lectureButtons = sortedLectures.map((lecture) => {
        return (
            <LectureButton
                key={lecture.lectureId}
                lecture={lecture}
                testId={lecture.testId}
                id={lecture.lectureId}
                amount={lecture.termList.length}
                amountKanji={lecture.kanjiList?.length}
                starredAmount={starredAmountObject?.[lecture.lectureId]}
                userDataQueryData={dataObject}
                allLecturesDataQueryStatus={allLecturesDataQuery?.status}
                title={lecture.name}
                isKanjiView={isKanjiView}
                amountCanLearn={amountCanLearn}
                // progress={myProgress[lecture.lectureId]}
            />
        );
    });
    return lectureButtons;
};

//FUNCTIONS

function insertSessionData(lectures, dataObject, isKanjiView) {
    let filledLectures = JSON.parse(JSON.stringify(lectures));
    if (isKanjiView) {
        filledLectures = filledLectures.map((lecture) => {
            //NEW agregar mapa de lectures
            //sera un objeto
            lecture["termListObject"] = {};

            lecture.termList.map((term) => {
                lecture["termListObject"][term.id] = term;
            });

            //NEW agregar mapa de kanjis
            lecture["kanjiListObject"] = {};

            lecture.kanjiList.map((kanji) => {
                lecture["kanjiListObject"][kanji.id] = kanji;
            });

            if (dataObject[lecture.lectureId]) {
                if (dataObject[lecture.lectureId]["recognize_session"]) {
                    lecture["recognize_session"] =
                        dataObject[lecture.lectureId]["recognize_session"];
                }
                if (dataObject[lecture.lectureId]["write_session"]) {
                    lecture["write_session"] =
                        dataObject[lecture.lectureId]["write_session"];
                }
                if (dataObject[lecture.lectureId]["recognize_terms_data"]) {
                    lecture["recognize_terms_data"] =
                        dataObject[lecture.lectureId]["recognize_terms_data"];
                }
                if (dataObject[lecture.lectureId]["recognize_terms_points"]) {
                    lecture["recognize_terms_points"] =
                        dataObject[lecture.lectureId]["recognize_terms_points"];
                }
                if (dataObject[lecture.lectureId]["write_terms_data"]) {
                    lecture["write_terms_data"] =
                        dataObject[lecture.lectureId]["write_terms_data"];
                }
                if (dataObject[lecture.lectureId]["write_terms_points"]) {
                    lecture["write_terms_points"] =
                        dataObject[lecture.lectureId]["write_terms_points"];
                }
            }

            return lecture;
        });
    } else {
        filledLectures = filledLectures.map((lecture) => {
            //NEW agregar mapa de lectures
            //sera un objeto
            lecture["termListObject"] = {};

            lecture.termList.map((term) => {
                lecture["termListObject"][term.id] = term;
            });
            if (dataObject[lecture.lectureId]) {
                if (dataObject[lecture.lectureId]["japanese_session"]) {
                    lecture["japanese_session"] =
                        dataObject[lecture.lectureId]["japanese_session"];
                }
                if (dataObject[lecture.lectureId]["spanish_session"]) {
                    lecture["spanish_session"] =
                        dataObject[lecture.lectureId]["spanish_session"];
                }
                if (dataObject[lecture.lectureId]["japanese_terms_points"]) {
                    lecture["japanese_terms_points"] =
                        dataObject[lecture.lectureId]["japanese_terms_points"];
                }
                if (dataObject[lecture.lectureId]["spanish_terms_points"]) {
                    lecture["spanish_terms_points"] =
                        dataObject[lecture.lectureId]["spanish_terms_points"];
                }
                if (dataObject[lecture.lectureId]["japanese_terms_data"]) {
                    lecture["japanese_terms_data"] =
                        dataObject[lecture.lectureId]["japanese_terms_data"];
                }
                if (dataObject[lecture.lectureId]["spanish_terms_data"]) {
                    lecture["spanish_terms_data"] =
                        dataObject[lecture.lectureId]["spanish_terms_data"];
                }
            }

            return lecture;
        });
    }

    return filledLectures;
}

function calculateStarred(dataArray) {
    let result = {};

    dataArray.forEach((element) => {
        let japaneseStarred = 0;
        let spanishStarred = 0;

        if (element["japanese_terms_data"]) {
            for (const value of Object.values(element["japanese_terms_data"])) {
                if (value == "highlighted") {
                    japaneseStarred += 1;
                }
            }
        }

        if (element["spanish_terms_data"]) {
            for (const value of Object.values(element["spanish_terms_data"])) {
                if (value == "highlighted") {
                    spanishStarred += 1;
                }
            }
        }

        result = {
            ...result,
            [element.lecture_id]: japaneseStarred + spanishStarred,
        };
    });

    return result;
}

//calcula la cantidad de terminos listos para ser estudiados por cada leccion
function calculateAmountReady(dataArray, isKanjiView) {
    // console.log("🚀 ~ calculateAmountReady ~ isKanjiView:", isKanjiView);
    // console.log("🚀 ~ calculateAmountReady ~ dataArray:", dataArray);
    const amountReady = {};

    dataArray.forEach((lecture) => {
        let aMuted = 0;
        let bMuted = 0;
        let aAmountReviewedToday = 0;
        let bAmountReviewedToday = 0;

        //calcular muteados
        if (!isKanjiView) {
            // console.warn("here ?");

            const japaneseData = lecture["japanese_terms_data"]
                ? lecture["japanese_terms_data"]
                : {}; //ADD default value
            const spanishData = lecture["spanish_terms_data"]
                ? lecture["spanish_terms_data"]
                : {}; //ADD default value

            const japanesePointsData = lecture["japanese_terms_points"];
            const spanishPointsData = lecture["spanish_terms_points"];

            if (japaneseData) {
                Object.entries(japaneseData).forEach((element) => {
                    if (lecture["termListObject"][element[0]]) {
                        if (element[1] === "muted") {
                            aMuted += 1;
                        }
                    }
                });
            }

            if (spanishData) {
                Object.entries(spanishData).forEach((element) => {
                    if (lecture["termListObject"][element[0]]) {
                        if (element[1] === "muted") {
                            bMuted += 1;
                        }
                    }
                });
            }

            if (japanesePointsData) {
                for (const [key, value] of Object.entries(japanesePointsData)) {
                    if (japaneseData[key] !== "muted") {
                        //ADD check for muted state
                        const moreThanTwelve = calculateTwelve(value.date);
                        if (!moreThanTwelve) {
                            aAmountReviewedToday += 1;
                        }
                    }
                }
            }
            if (spanishPointsData) {
                for (const [key, value] of Object.entries(spanishPointsData)) {
                    if (spanishData[key] !== "muted") {
                        //ADD check for muted state
                        const moreThanTwelve = calculateTwelve(value.date);
                        if (!moreThanTwelve) {
                            bAmountReviewedToday += 1;
                        }
                    }
                }
            }

            amountReady[lecture.lectureId] = {
                aAmount:
                    lecture.termList.length - aMuted - aAmountReviewedToday,
                bAmount:
                    lecture.termList.length - bMuted - bAmountReviewedToday,
            };
        } else {
            // console.warn("here");

            const recognizeData = lecture["recognize_terms_data"]
                ? lecture["recognize_terms_data"]
                : {}; //ADD default value
            const writeData = lecture["write_terms_data"]
                ? lecture["write_terms_data"]
                : {}; //ADD default value
            const recognizePointsData = lecture["recognize_terms_points"];
            const writePointsData = lecture["write_terms_points"];

            //NEW ahora revisa que el id del muted exista en la leccion
            if (recognizeData) {
                Object.entries(recognizeData).forEach((element) => {
                    if (lecture["termListObject"][element[0]]) {
                        if (element[1] === "muted") {
                            aMuted += 1;
                        }
                    }
                });
            }

            if (writeData) {
                Object.entries(writeData).forEach((element) => {
                    if (lecture["kanjiListObject"][element[0]]) {
                        if (element[1] === "muted") {
                            bMuted += 1;
                        }
                    }
                });
            }

            if (recognizePointsData) {
                for (const [key, value] of Object.entries(
                    recognizePointsData
                )) {
                    if (recognizeData[key] !== "muted") {
                        //ADD check for muted state
                        const moreThanTwelve = calculateTwelve(value.date);
                        if (!moreThanTwelve) {
                            aAmountReviewedToday += 1;
                        }
                    }
                }
            }
            if (writePointsData) {
                for (const [key, value] of Object.entries(writePointsData)) {
                    if (writeData[key] !== "muted") {
                        //ADD check for muted state
                        const moreThanTwelve = calculateTwelve(value.date);
                        if (!moreThanTwelve) {
                            bAmountReviewedToday += 1;
                        }
                    }
                }
            }

            amountReady[lecture.lectureId] = {
                aAmount:
                    lecture.termList.length - aMuted - aAmountReviewedToday,
                bAmount:
                    lecture.kanjiList.length - bMuted - bAmountReviewedToday,
            };
        }

        // amountReady[lecture.lectureId] = {
        //     aAmount: lecture.termList.length - aMuted - aAmountReviewedToday,
        //     bAmount: lecture.kanjiList.length - bMuted - bAmountReviewedToday,
        // };
    });

    return amountReady;
}

//calcula si ya han pasado las 12 horas
function calculateTwelve(date) {
    if (date === undefined) {
        return true;
    }

    const termDate = new Date(date).getTime();
    const today = new Date().getTime();
    const difference = today - termDate;
    if (difference / ONE_HOUR >= 12) {
        return true;
    } else {
        return false;
    }
}

function buildLectureData(dataArray) {
    let result = {};

    dataArray.forEach((element) => {
        result[element.lecture_id] = {
            japanese_session: element["japanese_session"],
            japanese_terms_data: element["japanese_terms_data"],
            japanese_terms_points: element["japanese_terms_points"],
            spanish_session: element["spanish_session"],
            spanish_terms_data: element["spanish_terms_data"],
            spanish_terms_points: element["spanish_terms_points"],
            recognize_session: element["recognize_session"],
            recognize_terms_data: element["recognize_terms_data"],
            recognize_terms_points: element["recognize_terms_points"],
            write_session: element["write_session"],
            write_terms_data: element["write_terms_data"],
            write_terms_points: element["write_terms_points"],
        };
    });

    return result;
}

function filterLectures(filters, lectures) {
    let clonedLectures = JSON.parse(JSON.stringify(lectures));

    clonedLectures = clonedLectures.filter((lecture) => {
        return filters.includes(lecture.lectureGroup);
    });

    return clonedLectures;
}

function sortLectures(orderingState, lectures) {
    let clonedLectures = JSON.parse(JSON.stringify(lectures));

    switch (orderingState) {
        case "jpnDateASC":
            // console.log("Date ASC");
            return clonedLectures.sort(sortJapaneseByDateASC);
        case "jpnDateDESC":
            // console.log("Date DESC");
            return clonedLectures.sort(sortJapaneseByDateDESC);
        case "espDateASC":
            // console.log("Date ASC");
            return clonedLectures.sort(sortSpanishByDateASC);
        case "espDateDESC":
            // console.log("Date DESC");
            return clonedLectures.sort(sortSpanishByDateDESC);
        case "recDateASC":
            return clonedLectures.sort(sortRecognizeByDateASC);
        case "recDateDESC":
            return clonedLectures.sort(sortRecognizeByDateDESC);
        case "wrtDateASC":
            return clonedLectures.sort(sortWriteByDateASC);
        case "wrtDateDESC":
            return clonedLectures.sort(sortWriteByDateDESC);
        case "sizeASC":
            // console.log("Name ASC");
            return clonedLectures.sort(sortJapaneseBySessionSizeASC);
        case "sizeDESC":
            // console.log("Name DESC");
            return clonedLectures.sort(sortJapaneseBySessionSizeDESC);
    }

    return clonedLectures;
}

function sortJapaneseByDateASC(a, b) {
    return sortBySessionLang(a, b, "japanese");
}

function sortJapaneseByDateDESC(a, b) {
    return sortBySessionLang(b, a, "japanese");
}

function sortSpanishByDateASC(a, b) {
    return sortBySessionLang(a, b, "spanish");
}
function sortSpanishByDateDESC(a, b) {
    return sortBySessionLang(b, a, "spanish");
}

function sortRecognizeByDateASC(a, b) {
    return sortBySessionLang(a, b, "recognize");
}

function sortRecognizeByDateDESC(a, b) {
    return sortBySessionLang(b, a, "recognize");
}

function sortWriteByDateASC(a, b) {
    return sortBySessionLang(a, b, "write");
}

function sortWriteByDateDESC(a, b) {
    return sortBySessionLang(b, a, "write");
}

// function sortByDateASC(a, b) {
//     return sortByDate(a, b);
// }

// function sortByDateDESC(a, b) {
//     return sortByDate(b, a);
// }

// function sortBySpanishDateASC(a, b) {
//     return sortBySpanishDate(a, b);
// }

// function sortBySpanishDateDESC(a, b) {
//     return sortBySpanishDate(b, a);
// }

function sortBySessionLang(a, b, lang) {
    const japaneseDateA = a[`${lang}_session`]?.lastReviewed;
    let japaneseDataObjectA;
    if (japaneseDateA) {
        japaneseDataObjectA = new Date(japaneseDateA);
    }
    const aDiff = getDiff(japaneseDataObjectA);

    const japaneseDateB = b[`${lang}_session`]?.lastReviewed;
    let japaneseDataObjectB;
    if (japaneseDateB) {
        japaneseDataObjectB = new Date(japaneseDateB);
    }
    const bDiff = getDiff(japaneseDataObjectB);

    //a is less than b by some ordering criterion

    if (aDiff && bDiff) {
        if (aDiff < bDiff) {
            // console.log("a is less than b by some ordering criterion");
            return 1;
        } else if (aDiff > bDiff) {
            // console.log("a is greater than b by the ordering criterion");
            //a is greater than b by the ordering criterion
            return -1;
        }
    } else if (aDiff && !bDiff) {
        return 1;
    } else if (!aDiff && bDiff) {
        return -1;
    }

    return 0;
}

function sortByDate(a, b) {
    const japaneseDateA = a["japanese_session"]?.lastReviewed;
    let japaneseDataObjectA;
    if (japaneseDateA) {
        japaneseDataObjectA = new Date(japaneseDateA);
    }
    const aDiff = getDiff(japaneseDataObjectA);

    const japaneseDateB = b["japanese_session"]?.lastReviewed;
    let japaneseDataObjectB;
    if (japaneseDateB) {
        japaneseDataObjectB = new Date(japaneseDateB);
    }
    const bDiff = getDiff(japaneseDataObjectB);

    //a is less than b by some ordering criterion

    if (aDiff && bDiff) {
        if (aDiff < bDiff) {
            // console.log("a is less than b by some ordering criterion");
            return 1;
        } else if (aDiff > bDiff) {
            // console.log("a is greater than b by the ordering criterion");
            //a is greater than b by the ordering criterion
            return -1;
        }
    } else if (aDiff && !bDiff) {
        return 1;
    } else if (!aDiff && bDiff) {
        return -1;
    }

    return 0;
}

function sortBySpanishDate(a, b) {
    const spanishDateA = a["spanish_session"]?.lastReviewed;
    let spanishDataObjectA;
    if (spanishDateA) {
        spanishDataObjectA = new Date(spanishDateA);
    }
    const aDiff = getDiff(spanishDataObjectA);

    const spanishDateB = b["spanish_session"]?.lastReviewed;
    let spanishDataObjectB;
    if (spanishDateB) {
        spanishDataObjectB = new Date(spanishDateB);
    }
    const bDiff = getDiff(spanishDataObjectB);

    //a is less than b by some ordering criterion

    if (aDiff && bDiff) {
        if (aDiff < bDiff) {
            // console.log("a is less than b by some ordering criterion");
            return 1;
        } else if (aDiff > bDiff) {
            // console.log("a is greater than b by the ordering criterion");
            //a is greater than b by the ordering criterion
            return -1;
        }
    } else if (aDiff && !bDiff) {
        return 1;
    } else if (!aDiff && bDiff) {
        return -1;
    }

    return 0;
}

function sortJapaneseBySessionSizeASC(a, b) {
    return sortBySessionSize(a, b, "japanese");
}

function sortJapaneseBySessionSizeDESC(a, b) {
    return sortBySessionSize(b, a, "japanese");
}

function sortSpanishBySessionSizeASC(a, b) {
    return sortBySessionSize(a, b, "spanish");
}

function sortSpanishBySessionSizeDESC(a, b) {
    return sortBySessionSize(b, a, "spanish");
}

function sortBySessionSize(a, b, lang) {
    let japaneseSessionSizeA = a[`${lang}_session`]?.terms.length;
    let spanishSessionSizeA = a[`${lang}_session`]?.terms.length;
    if (japaneseSessionSizeA === undefined) {
        japaneseSessionSizeA = 0;
    }

    if (spanishSessionSizeA === undefined) {
        spanishSessionSizeA = 0;
    }

    const aSessionSize = japaneseSessionSizeA + spanishSessionSizeA;

    let japaneseSessionSizeB = b[`${lang}_session`]?.terms.length;
    let spanishSessionSizeB = b[`${lang}_session`]?.terms.length;
    if (japaneseSessionSizeB === undefined) {
        japaneseSessionSizeB = 0;
    }
    if (spanishSessionSizeB === undefined) {
        spanishSessionSizeB = 0;
    }

    const bSessionSize = japaneseSessionSizeB + spanishSessionSizeB;

    if (aSessionSize < bSessionSize) {
        return -1;
    }

    if (bSessionSize > aSessionSize) {
        return 1;
    }

    return 0;
}

export default LectureButtons;
