export type AppDate = {
    day: number;
    month: number;
    year: number;
}

export enum WeekDay {
    Saturday = 0,
    Sunday = 1,
    Monday = 2,
    Tuesday = 3,
    Wednesday = 4,
    Thursday = 5,
    Friday = 6,
}

export const daysInMonth = (year: number, month: number): number => new Date(year, month, 0).getDate();

export const weekDayFromIndex = (index: number): WeekDay => ({
    [0]: WeekDay.Sunday,
    [1]: WeekDay.Monday,
    [2]: WeekDay.Tuesday,
    [3]: WeekDay.Wednesday,
    [4]: WeekDay.Thursday,
    [5]: WeekDay.Friday,
    [6]: WeekDay.Saturday,
}[index]);

export const weekDayMap = (): { [key in WeekDay]: string} => ({
    [WeekDay.Sunday]: 'Sunday',
    [WeekDay.Monday]: 'Monday',
    [WeekDay.Tuesday]: 'Tuesday',
    [WeekDay.Wednesday]: 'Wednesday',
    [WeekDay.Thursday]: 'Thursday',
    [WeekDay.Friday]: 'Friday',
    [WeekDay.Saturday]: 'Saturday',
});

export const weekDayToLabel = (weekday: WeekDay): string => {
    return weekDayMap()[weekday] || 'unsupported-weekday';
};
