import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid';

import { AppDate } from '../utilities/date';

import DateBoundaryInput from './DateBoundaryInput';

type ChallengeSetupProps = {
    lowerDate: AppDate;
    upperDate: AppDate;
    onInput: (lowerDate: AppDate, upperDate: AppDate) => void;
}

export default ({ lowerDate, upperDate, onInput }: ChallengeSetupProps): React.ReactElement => {
    const [ showSetupFields, setShowSetupFields ] = useState(false);

    let lower: AppDate = lowerDate;
    let upper: AppDate = upperDate;

    const onElementInput = (field: string) => (date: AppDate) => {
        if (field === 'lower') lower = date;
        if (field === 'upper') upper = date;

        onInput(lower, upper);
    };

    return <div className="flex gap-4 flex-col items-center">
        <button
            type="button"
            className="flex gap-2 rounded bg-white/10 py-1 px-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
            onClick={ () => setShowSetupFields(!showSetupFields) }
        >
            Options
            { showSetupFields ? <EyeSlashIcon width={ 20 }/> : <EyeIcon width={ 20 }/> }
        </button>
        <div className={ (showSetupFields ? 'flex' : 'hidden') + ' justify-center items-center gap-4' }>
            <DateBoundaryInput initial={ lowerDate } onInput={ onElementInput('lower') }/>
            <div className="font-bold">&mdash;</div>
            <DateBoundaryInput initial={ upperDate } onChange={ onElementInput('upper') }/>
        </div>
    </div>
}
