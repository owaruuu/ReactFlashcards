export const ONE_HOUR = 1000 * 60 * 60;
const ONE_DAY = 1000 * 60 * 60 * 24;

export function isSameDay(a, b) {
    const d1 = new Date(a);
    const d2 = new Date(b);
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);
    return d1.getTime() === d2.getTime();
}

export function isTomorrow(a, b) {
    const d1 = new Date(a); //today
    const d2 = new Date(b); //nextDate
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);
    return d1.getTime() + ONE_DAY === d2.getTime();
}

export function isMoreThanOneDay(a, b) {
    const d1 = new Date(a); //today
    const d2 = new Date(b); //nextDate
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);
    return d1.getTime() + ONE_DAY < d2.getTime();
}

export function toDDMMYY(date) {
    const d = new Date(date);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yy = String(d.getFullYear()).slice(-2);
    return `${dd}/${mm}/${yy}`;
}

export function normalizeDate(date) {
    let newDate = new Date(date);

    if (newDate.getHours() < 17) {
        newDate.setHours(8);
        newDate.setMinutes(0);
        newDate.setSeconds(0);
        newDate.setMilliseconds(0);

        return newDate;
    } else if (newDate.getHours() >= 17) {
        newDate.setHours(17);
        newDate.setMinutes(0);
        newDate.setSeconds(0);
        newDate.setMilliseconds(0);

        return newDate;
    }

    console.error(
        "🚀 ~ normalizeDate ~ newDate: fecha no es valida",
        new Date(newDate),
    );

    return newDate;
}

export function getShortTime(date) {
    const d = new Date(date);
    const dateStr = d.toLocaleDateString(undefined, {
        day: "numeric",
        month: "2-digit",
        year: "2-digit",
    });
    const timeStr = d.toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
    return `${dateStr}, ${timeStr}`;
}

export function isAvailable(nextDate) {
    if (nextDate === undefined) return true;

    const now = new Date();

    return new Date(nextDate) < now;
}
