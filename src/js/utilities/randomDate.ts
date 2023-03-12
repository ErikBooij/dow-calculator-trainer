import { AppDate, WeekDay, weekDayFromIndex, weekDayToLabel } from './date';

export type ChallengeDate = AppDate & {
    weekDay: WeekDay;
}

export const randomDateWithinBounds = (bounds?: { start?: AppDate, end?: AppDate }): ChallengeDate => {
    let startBound = timestampForDate(
        bounds?.start?.day || 1,
        bounds?.start?.month || 1,
        bounds?.start?.year || 1950,
    );

    let endBound = timestampForDate(
        bounds?.end?.day || 30,
        bounds?.end?.month || 12,
        bounds?.end?.year || 2050,
    );

    if (startBound > endBound) {
        [ startBound, endBound ] = [ endBound, startBound ];
    }

    const availableRange = endBound - startBound;

    const selectedTs = (Math.random() * availableRange) + startBound;

    const selectedDate = new Date();
    selectedDate.setTime(selectedTs);
    selectedDate.setHours(12, 0, 0);

    return {
        day: selectedDate.getDate(),
        month: selectedDate.getMonth() + 1,
        year: selectedDate.getFullYear(),
        weekDay: weekDayFromIndex(selectedDate.getDay()),
    };
}

const timestampForDate = (day: number, month: number, year: number): number => {
    return new Date(year, month - 1, day, 0, 0, 0, 0).getTime();
}
