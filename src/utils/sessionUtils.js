import {
    isAvailable,
    isMoreThanOneDay,
    isSameDay,
    isTomorrow,
    toDDMMYY,
} from "./dateUtils";

// each level corresponds to an amount of hours to wait before the next review.
const levelToMultiplier = {
    1: 24, // 1 day
    2: 24, // 1 day
    3: 48, // 2 days
    4: 72, // 3 days
    5: 120, // 5 days
    6: 168, // 7 days
    7: 240, // 10 days
    8: 360, // 15 days
    9: 480, // 20 days
    10: 648, // 27 days
};

const MIN_LEVEL = 1;
const MAX_LEVEL = 10;

/**
 * Returns the amount of hours to wait before the next review based on the CURRENT level.
 * @param {int} level level before change
 * @returns {int} hours
 */
export function levelToHours(level) {
    // if level is 0 calculate as level 1, used on new terms that have not been reviewed yet.
    if (level <= 0) return levelToMultiplier[1];

    // if level is greater than max level, just in case the level is higher than the max level, return the max level multiplier.
    if (level > MAX_LEVEL) return levelToMultiplier[MAX_LEVEL];

    return levelToMultiplier[level];
}

/**
 *
 * @param {int} level
 * @param {int} change
 * @returns {int} newLevel
 */
export function getNewLevel(level, change) {
    // avoid going negative
    if (level + change < MIN_LEVEL) return MIN_LEVEL;

    // avoid going over max level
    if (level + change > MAX_LEVEL) return MAX_LEVEL;

    return level + change;
}

export function getComingTerms(levelsData) {
    let comingTerms = {};
    let comingTermsArray = [];
    let sameDayEight = 0;
    let sameDaySeventeen = 0;

    const now = new Date();

    for (const [key, value] of Object.entries(levelsData)) {
        const nextDate = new Date(value.nextDate);

        if (isAvailable(nextDate)) {
            continue;
        }

        if (isSameDay(now, nextDate)) {
            if (nextDate.getHours() === 8) {
                sameDayEight += 1;
                comingTerms["08:00"] = {
                    amount: (comingTerms["08:00"]?.amount || 0) + 1,
                    date: nextDate,
                };
            } else if (nextDate.getHours() === 17) {
                sameDaySeventeen += 1;
                comingTerms["17:00"] = {
                    amount: (comingTerms["17:00"]?.amount || 0) + 1,
                    date: nextDate,
                };
            }
        }

        if (isTomorrow(now, nextDate)) {
            comingTerms["Mañana"] = {
                amount: (comingTerms["Mañana"]?.amount || 0) + 1,
                date: nextDate,
            };
        }

        if (isMoreThanOneDay(now, nextDate)) {
            const date = toDDMMYY(nextDate);
            comingTerms[date] = {
                amount: (comingTerms[date]?.amount || 0) + 1,
                date: nextDate,
            };
        }
    }

    comingTermsArray = Object.entries(comingTerms)
        .map((entry) => {
            return {
                key: entry[0],
                amount: entry[1]["amount"],
                date: entry[1]["date"],
            };
        })
        .sort((a, b) => a.date - b.date);

    return comingTermsArray;
}
