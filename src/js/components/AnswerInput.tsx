import React, { useEffect, useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';

import { WeekDay, weekDayToLabel } from '../utilities/date';
import { ChallengeDate } from '../utilities/randomDate';

type AnswerInputProps = {
    onSelect: (answer: WeekDay) => void;
    challenge: ChallengeDate;
}

const answerOptions: { value: WeekDay, label: string }[] = [
    WeekDay.Monday,
    WeekDay.Tuesday,
    WeekDay.Wednesday,
    WeekDay.Thursday,
    WeekDay.Friday,
    WeekDay.Saturday,
    WeekDay.Sunday,
].map(w => ({
    value: w,
    label: weekDayToLabel(w),
}));

export default ({ challenge, onSelect }: AnswerInputProps) => {
    const [ preselected, setPreselected ] = useState<WeekDay | undefined>(undefined);

    useEffect(() => {
        setPreselected(undefined);
    }, [ challenge ])

    const handleClick = (w: WeekDay) => (): void => {
        if (preselected === w) {
            setPreselected(undefined);

            return;
        }

        setPreselected(w);
    }

    const handleSubmit = () => {
        if (preselected === undefined) {
            return;
        }

        onSelect(preselected)

        setPreselected(undefined);
    }

    return <>
        <div className="flex flex-wrap justify-center gap-4">
            {
                answerOptions.map(({ value, label }) => (
                    <button
                        key={ label }
                        onClick={ handleClick(value) }
                        className={ `rounded bg-white/10 hover:bg-white/20 py-1 sm:py-3 px-2 sm:px-6 text-sm font-semibold text-white shadow-sm` }
                    >
                        { label }
                    </button>
                ))
            }
        </div>
        {
            preselected !== undefined
                ? <button
                    onClick={ handleSubmit }
                    className="block mt-8 mx-auto flex items-center gap-2 rounded-md bg-blue-500 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500">
                    Submit <strong>{ weekDayToLabel(preselected) }</strong> <CheckIcon width={ 20 }/>
                </button>
                : null
        }
    </>
}
