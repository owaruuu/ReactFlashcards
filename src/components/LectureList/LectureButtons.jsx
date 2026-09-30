import LectureButton from "./LectureButton.js/LectureButton";
import {
    filterLectures,
    sortLectures,
} from "../../utils/lectureButtonsUtils.js";

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

export default LectureButtons;
