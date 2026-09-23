import LectureButton from "./LectureButton.js/LectureButton";

const LectureButtons = (props) => {
    const {
        allLecturesDataQuery,
        orderingState,
        filterState,
        filledLectures,
        amountCanLearn,
        dataObject,
        progressObject,
        isKanjiView,
    } = props;

    // old code to show the amount of starred terms in each lecture button.
    // const starredAmountObject =
    //     allLecturesDataQuery?.status === "success"
    //         ? calculateStarred(allLecturesDataQuery.data)
    //         : {};

    let filters = [];

    for (const [key, value] of Object.entries(filterState)) {
        if (value) {
            filters.push(key);
        }
    }

    let filteredLectures = [];

    if (filters.length > 0) {
        filteredLectures = filterLectures(
            filters,
            isKanjiView
                ? filledLectures?.filledKanjiSets
                : filledLectures?.filledLectures,
        );
    } else {
        filteredLectures = isKanjiView
            ? filledLectures?.filledKanjiSets
            : filledLectures?.filledLectures;
    }

    const sortedLectures = sortLectures(orderingState, filteredLectures);

    const lectureButtons = sortedLectures.map((lecture) => {
        return (
            <LectureButton
                key={lecture.lectureId}
                progress={progressObject[lecture.lectureId]}
                lecture={lecture}
                testId={lecture.testId}
                id={lecture.lectureId}
                amount={{
                    termList: lecture.termList.length,
                    kanjiList: lecture.kanjiList?.length,
                }}
                dataObject={dataObject}
                allLecturesDataQueryStatus={allLecturesDataQuery?.status}
                title={lecture.name}
                isKanjiView={isKanjiView}
                amountCanLearn={
                    isKanjiView
                        ? amountCanLearn.kanjiSets[lecture.lectureId]
                        : amountCanLearn.lectures[lecture.lectureId]
                }
            />
        );
    });
    return lectureButtons.length > 0 ? (
        lectureButtons
    ) : (
        <div className="noLecturesMessage">
            No hay lecciones que coincidan con los filtros
        </div>
    );
};

//FUNCTIONS

/**
 * Calculate the amount of starred terms in a lecture
 * NOT USED
 * @param {*} dataArray
 * @returns
 */
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

/**
 * Filter lectures, with special rules for the 'favoritos' filter
 * @param {*} filters
 * @param {*} lectures
 * @returns
 */
function filterLectures(filters, lectures) {
    let filteredLectures = JSON.parse(JSON.stringify(lectures));

    if (filters.includes("favoritos")) {
        filteredLectures = filteredLectures.filter((lecture) => {
            return lecture.bookmarked;
        });
    } else {
        filteredLectures = filteredLectures.filter((lecture) => {
            return filters.includes(lecture.lectureGroup);
        });
    }

    return filteredLectures;
}

/**
 * Sort lectures based on the current state of `orderingState`, returns the same array if no ordering is present
 * @param {*} orderingState
 * @param {*} lectures
 * @returns
 */
function sortLectures(orderingState, lectures) {
    let clonedLectures = JSON.parse(JSON.stringify(lectures));

    switch (orderingState) {
        case "jpnDateASC":
            return clonedLectures.sort(byLastReviewed("japanese", 1));
        case "jpnDateDESC":
            return clonedLectures.sort(byLastReviewed("japanese", -1));
        case "espDateASC":
            return clonedLectures.sort(byLastReviewed("spanish", 1));
        case "espDateDESC":
            return clonedLectures.sort(byLastReviewed("spanish", -1));
        case "recDateASC":
            return clonedLectures.sort(byLastReviewed("recognize", 1));
        case "recDateDESC":
            return clonedLectures.sort(byLastReviewed("recognize", -1));
        case "wrtDateASC":
            return clonedLectures.sort(byLastReviewed("write", 1));
        case "wrtDateDESC":
            return clonedLectures.sort(byLastReviewed("write", -1));
        // case "sizeASC":
        //     return clonedLectures.sort(sortJapaneseBySessionSizeASC);
        // case "sizeDESC":
        //     return clonedLectures.sort(sortJapaneseBySessionSizeDESC);
    }

    return clonedLectures;
}

/**
 * Returns a comparator function to sort lectures by the last reviewed date of a given language session.
 * @param {*} lang the language session to sort by (e.g., "japanese", "spanish", "recognize", "write")
 * @param {*} dir the direction of sorting: 1 for ascending, -1 for descending
 * @returns
 */
function byLastReviewed(lang, dir = 1) {
    function comparator(a, b) {
        const dateA = a[`${lang}_session`]?.lastReviewed;
        let dataObjectA;
        if (dateA) {
            dataObjectA = new Date(dateA);
        }
        const aDiff = getDiff(dataObjectA);

        const dateB = b[`${lang}_session`]?.lastReviewed;
        let dataObjectB;
        if (dateB) {
            dataObjectB = new Date(dateB);
        }
        const bDiff = getDiff(dataObjectB);

        //a is less than b by some ordering criterion

        if (aDiff && bDiff) {
            if (aDiff < bDiff) {
                // console.log("a is less than b by some ordering criterion");
                return 1 * dir;
            } else if (aDiff > bDiff) {
                // console.log("a is greater than b by the ordering criterion");
                //a is greater than b by the ordering criterion
                return -1 * dir;
            }
        } else if (aDiff && !bDiff) {
            return 1 * dir;
        } else if (!aDiff && bDiff) {
            return -1 * dir;
        }

        return 0;
    }

    return comparator;
}

//OLD sort functions wrappers
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

//OLD sort function for amount of terms in session left
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

/**
 * Helper function to calculate the difference in milliseconds between a given date and the current date. Return null if the date is invalid or not provided.
 * @param {*} timeObject
 * @returns
 */
function getDiff(timeObject) {
    if (!timeObject) {
        return null;
    }

    return Math.abs(timeObject.getTime() - new Date().getTime());
}

export default LectureButtons;
