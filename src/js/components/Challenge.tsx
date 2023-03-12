import React, { PropsWithChildren, useEffect, useState } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

import { fetch, store } from '../utilities/storage';

type ChallengeProps = {
    challenge: Challenge;
    refresh: () => void;
}

type Challenge = {
    day: number;
    month: number;
    year: number;
}

enum DateDisplayFormat {
    Text,
    DDMMYYYY,
    MMDDYYYY
}

const STRG_DATE_DISPLAY_FORMAT = 'date-display-format';

export default ({ challenge, refresh }: ChallengeProps): React.ReactElement => {
    const [ displayFormat, setDisplayFormat ] = useState(fetch(STRG_DATE_DISPLAY_FORMAT, DateDisplayFormat.Text));

    useEffect(() => {
        store(STRG_DATE_DISPLAY_FORMAT, displayFormat);
    }, [ displayFormat ]);

    return <div className="bg-gray-900 p-4 sm:pt-8 rounded-lg">
        <div className="flex items-center justify-center gap-8 text-center font-bold">
            <span className="text-3xl sm:text-6xl">
            { renderDate(challenge, displayFormat) }
            </span>
            <button
                className="bg-gray-800 p-2 sm:p-4 rounded-full hover:bg-gray-900/80 hover:outline-double hover:outline-offset-2 hover:outline-slate-500"
                onClick={ refresh }
            >
                <ArrowPathIcon width={ 24 }/>
            </button>
        </div>
        <div className="flex justify-center mt-4 sm:mt-8 gap-4">
            <DisplayFormatButton
                onClick={ setDisplayFormat }
                currentFormat={ displayFormat }
                targetFormat={ DateDisplayFormat.DDMMYYYY }
            >
                31 / 10 / 2008
            </DisplayFormatButton>
            <DisplayFormatButton
                onClick={ setDisplayFormat }
                currentFormat={ displayFormat }
                targetFormat={ DateDisplayFormat.Text }
            >
                Text
            </DisplayFormatButton>
            <DisplayFormatButton
                onClick={ setDisplayFormat }
                currentFormat={ displayFormat }
                targetFormat={ DateDisplayFormat.MMDDYYYY }
            >
                10 / 31 / 2008
            </DisplayFormatButton>
        </div>
    </div>
}

type DisplayFormatButtonProps = PropsWithChildren<{
    onClick: (format: DateDisplayFormat) => void;
    currentFormat: DateDisplayFormat;
    targetFormat: DateDisplayFormat;
}>

const DisplayFormatButton = ({ children, currentFormat, targetFormat, onClick }: DisplayFormatButtonProps) => {
    const isActive = currentFormat === targetFormat;

    const baseBtnClass: HTMLButtonElement['className'] = 'rounded-md py-1.5 px-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20';

    const btnClass = baseBtnClass + ' ' + (
        isActive
            ? 'bg-white/40 focus:bg-white/40'
            : 'bg-white/10 focus:bg-white/10'
    )

    return <button
        className={ btnClass }
        onClick={ () => onClick(targetFormat) }
    >
        { children }
    </button>
};

const renderDate = ({ day, month, year }: Challenge, format: DateDisplayFormat): string => {
    const fmt = new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

    const date = new Date(year, month - 1, day, 12, 0, 0, 0);

    switch (format) {
        case DateDisplayFormat.Text:
            return fmt.format(date);
        case DateDisplayFormat.DDMMYYYY:
            return `${ day } / ${ month } / ${ year }`;
        case DateDisplayFormat.MMDDYYYY:
            return `${ month } / ${ day } / ${ year }`;
    }

    return `${ day }/${ month }/${ year } (unsupported format)`;
}
