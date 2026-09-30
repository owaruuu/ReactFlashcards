/**
 * Filter lectures, with special rules for the 'favoritos' filter
 * @param {*} filters
 * @param {*} lectures
 * @returns
 */
export function filterLectures(filters, lectures) {
    let filteredLectures = [];

    if (filters.includes("favoritos")) {
        filteredLectures = lectures.filter((lecture) => {
            return lecture.bookmarked;
        });
    } else {
        filteredLectures = lectures.filter((lecture) => {
            return filters.includes(lecture.lectureGroup);
        });
    }

    return filteredLectures;
}

// Sort config map
const SORT_BT_STATE = {
    jpnDateASC: byLastReviewed("japanese", 1),
    jpnDateDESC: byLastReviewed("japanese", -1),
    espDateASC: byLastReviewed("spanish", 1),
    espDateDESC: byLastReviewed("spanish", -1),
    recDateASC: byLastReviewed("recognize", 1),
    recDateDESC: byLastReviewed("recognize", -1),
    wrtDateASC: byLastReviewed("write", 1),
    wrtDateDESC: byLastReviewed("write", -1),
};

/**
 * Sort lectures based on the current state of `orderingState`, returns the same array if no ordering is present
 * @param {*} orderingState
 * @param {*} lectures
 * @returns
 */
export function sortLectures(orderingState, lectures) {
    const comparator = SORT_BT_STATE[orderingState];

    return comparator ? lectures.toSorted(comparator) : lectures;
}

/**
 * Returns a comparator function to sort lectures by the last reviewed date of a given language session.
 * @param {*} lang the language session to sort by (e.g., "japanese", "spanish", "recognize", "write")
 * @param {*} dir the direction of sorting: 1 for ascending, -1 for descending
 * @returns
 */
function byLastReviewed(lang, dir = 1) {
    const now = new Date();

    function comparator(a, b) {
        const dateA = a[`${lang}_session`]?.lastReviewed;
        let dataObjectA;
        if (dateA) {
            dataObjectA = new Date(dateA);
        }
        const aDiff = getDiff(dataObjectA, now);

        const dateB = b[`${lang}_session`]?.lastReviewed;
        let dataObjectB;
        if (dateB) {
            dataObjectB = new Date(dateB);
        }
        const bDiff = getDiff(dataObjectB, now);

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

/**
 * Helper function to calculate the difference in milliseconds between a given date and the current date. Return null if the date is invalid or not provided.
 * @param {*} timeObject
 * @returns
 */
function getDiff(timeObject, now) {
    if (!timeObject) {
        return null;
    }

    return Math.abs(timeObject.getTime() - now.getTime());
}
