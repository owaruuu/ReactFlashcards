import LectureButton from "./LectureButton.js/LectureButton";
import { pickDifference, getDiff } from "../../utils/utils.js";

const LectureButtons = (props) => {
    //data de todas las lectures
    const { allLecturesDataQuery } = props;

    const starredAmountObject =
        allLecturesDataQuery?.status === "success"
            ? calculateStarred(allLecturesDataQuery.data)
            : {};

    const dataObject =
        allLecturesDataQuery?.status === "success"
            ? buildLectureData(allLecturesDataQuery.data)
            : {};

    const filledLectures = props.lectures.map((lecture) => {
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

    let filters = [];

    for (const [key, value] of Object.entries(props.filterState)) {
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

    const sortedLectures = sortLectures(props.orderingState, filteredLectures);

    const lectureButtons = sortedLectures.map((lecture) => {
        return (
            <LectureButton
                key={lecture.lectureId}
                lecture={lecture}
                id={lecture.lectureId}
                amount={lecture.termList.length}
                starredAmount={starredAmountObject?.[lecture.lectureId]}
                userDataQueryData={dataObject}
                allLecturesDataQueryStatus={allLecturesDataQuery?.status}
                title={lecture.name}
                // progress={myProgress[lecture.lectureId]}
            />
        );
    });
    return lectureButtons;
};

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
            return clonedLectures.sort(sortByDateASC);
        case "jpnDateDESC":
            // console.log("Date DESC");
            return clonedLectures.sort(sortByDateDESC);
        case "espDateASC":
            // console.log("Date ASC");
            return clonedLectures.sort(sortBySpanishDateASC);
        case "espDateDESC":
            // console.log("Date DESC");
            return clonedLectures.sort(sortBySpanishDateDESC);
        case "sizeASC":
            // console.log("Name ASC");
            return clonedLectures.sort(sortBySessionSizeASC);
        case "sizeDESC":
            // console.log("Name DESC");
            return clonedLectures.sort(sortBySessionSizeDESC);
    }

    return clonedLectures;
}

function sortByDateASC(a, b) {
    return sortByDate(a, b);
}

function sortByDateDESC(a, b) {
    return sortByDate(b, a);
}

function sortBySpanishDateASC(a, b) {
    return sortBySpanishDate(a, b);
}

function sortBySpanishDateDESC(a, b) {
    return sortBySpanishDate(b, a);
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

function sortBySessionSizeASC(a, b) {
    return sortBySessionSize(a, b);
}

function sortBySessionSizeDESC(a, b) {
    return sortBySessionSize(b, a);
}

function sortBySessionSize(a, b) {
    let japaneseSessionSizeA = a["japanese_session"]?.terms.length;
    let spanishSessionSizeA = a["spanish_session"]?.terms.length;
    if (japaneseSessionSizeA === undefined) {
        japaneseSessionSizeA = 0;
    }

    if (spanishSessionSizeA === undefined) {
        spanishSessionSizeA = 0;
    }

    const aSessionSize = japaneseSessionSizeA + spanishSessionSizeA;

    let japaneseSessionSizeB = b["japanese_session"]?.terms.length;
    let spanishSessionSizeB = b["spanish_session"]?.terms.length;
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
