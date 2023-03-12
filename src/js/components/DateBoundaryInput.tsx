import React, { useRef, useState } from 'react';

import { AppDate, daysInMonth } from '../utilities/date';

type DateBoundaryProps = {
    initial: AppDate;
    onChange?: (value: AppDate) => void;
    onInput?: (value: AppDate) => void;
}

export default ({ initial, onInput, onChange }: DateBoundaryProps): React.ReactElement => {
    const dayRef = useRef<HTMLInputElement>();
    const monthRef = useRef<HTMLInputElement>();
    const yearRef = useRef<HTMLInputElement>();

    const [ maxDay, setMaxDay ] = useState(daysInMonth(initial.year, initial.month));

    const resetMaxDay = () => {
        const selectedMonth = monthRef.current?.valueAsNumber || initial.month;
        const selectedYear = yearRef.current?.valueAsNumber || initial.year;

        const maxDay = daysInMonth(selectedYear, selectedMonth);

        setMaxDay(maxDay);

        if (dayRef.current) {
            dayRef.current.value = String(Math.min((dayRef.current?.valueAsNumber || initial.day), maxDay));
        }
    }

    const convertSelfToAppDate = (): AppDate => ({
        day: dayRef.current.valueAsNumber || initial.day,
        month: monthRef.current.valueAsNumber || initial.month,
        year: yearRef.current.valueAsNumber || initial.year,
    });

    const onAnyInput = () => {
        resetMaxDay();

        onInput?.(convertSelfToAppDate());
    }

    const onAnyChange = () => {
        resetMaxDay();

        onChange?.(convertSelfToAppDate());
    }

    const inputClass: HTMLInputElement['className'] = 'bg-blue-200/20 px-4 py-2 text-center appearance-textfield font-bold rounded';

    return <span className="flex gap-2">
        <input
            type="number"
            className={ inputClass }
            defaultValue={ initial.day }
            min={ 1 }
            max={ maxDay }
            ref={ dayRef }
            onInput={ onAnyInput }
            onChange={ onAnyChange }
        />
        <input
            type="number"
            className={ inputClass }
            defaultValue={ initial.month }
            min={ 1 }
            max={ 12 }
            ref={ monthRef }
            onInput={ onAnyInput }
            onChange={ onAnyChange }
        />
        <input
            type="number"
            className={ inputClass }
            defaultValue={ initial.year }
            min={ 1500 }
            max={ 2500 }
            ref={ yearRef }
            onInput={ onAnyInput }
            onChange={ onAnyChange }
        />
    </span>
}
