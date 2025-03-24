import LectureButton from "./LectureButton.js/LectureButton";
import { pickDifference, getDiff } from "../../utils/utils.js";

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

    //POR AQUIIIIIIIIIII
    const dataObject =
        allLecturesDataQuery?.status === "success"
            ? buildLectureData(allLecturesDataQuery.data)
            : {};

    const filledLectures = insertSessionData(lectures, dataObject, isKanjiView);
    // console.log("🚀 ~ LectureButtons ~ lectures DIFF:", lectures);
    // console.log("🚀 ~ LectureButtons ~ filledLectures DIFF:", filledLectures);

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
                id={lecture.lectureId}
                amount={lecture.termList.length}
                amountKanji={lecture.kanjiList?.length}
                starredAmount={starredAmountObject?.[lecture.lectureId]}
                userDataQueryData={dataObject}
                allLecturesDataQueryStatus={allLecturesDataQuery?.status}
                title={lecture.name}
                isKanjiView={isKanjiView}
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
            if (dataObject[lecture.lectureId]) {
                if (dataObject[lecture.lectureId]["recognize_session"]) {
                    lecture["recognize_session"] =
                        dataObject[lecture.lectureId]["recognize_session"];
                }
                if (dataObject[lecture.lectureId]["write_session"]) {
                    lecture["write_session"] =
                        dataObject[lecture.lectureId]["write_session"];
                }
            }

            return lecture;
        });
    } else {
        filledLectures = filledLectures.map((lecture) => {
            if (dataObject[lecture.lectureId]) {
                if (dataObject[lecture.lectureId]["japanese_session"]) {
                    lecture["japanese_session"] =
                        dataObject[lecture.lectureId]["japanese_session"];
                }
                if (dataObject[lecture.lectureId]["spanish_session"]) {
                    lecture["spanish_session"] =
                        dataObject[lecture.lectureId]["spanish_session"];
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

function buildLectureData(dataArray) {
    let result = {};

    dataArray.forEach((element) => {
        result[element.lecture_id] = {
            japanese_session: element["japanese_session"],
            spanish_session: element["spanish_session"],
            recognize_session: element["recognize_session"],
            write_session: element["write_session"],
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
