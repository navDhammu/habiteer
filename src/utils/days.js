export const weekDaysArray = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
];

export function orderDays(daysObject) {
    const sortedArray = Object.entries(daysObject).sort(
        ([dayA], [dayB]) => order[dayA] - order[dayB]
    );
    daysObject = {};
    for (let [day, value] of sortedArray) {
        daysObject[day] = value;
    }
    return daysObject;
}

export function getSelectedDays(days) {
    return Object.entries(days)
        .filter((day) => day[1] === true)
        .map((day) => day[0]);
}

export function daysObjectsEqual(daysA, daysB) {
    return Object.entries(daysA).every(
        ([day, isSelected]) => daysB[day] === isSelected
    );
}
