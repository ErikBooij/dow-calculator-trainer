import React, { ReactElement } from 'react';

import { ChallengeDate } from '../utilities/randomDate';
import { WeekDay } from '../utilities/date';

import Calculation from './Calculation';

type ResultProps = {
    answer: WeekDay,
    challenge: ChallengeDate,
}

export default ({ answer, challenge }: ResultProps): ReactElement => {
    const isCorrect = answer === challenge.weekDay;
    const text = isCorrect ? 'Correct' : 'Incorrect';

    return <>
        <div
            className={ `${ isCorrect ? 'bg-green-500' : 'bg-red-500' } mx-auto rounded-lg p-4 font-bold text-center` }>
            { text }
        </div>
        <div className="mt-4">
            <Calculation answer={ answer } challenge={ challenge }/>
        </div>
    </>
}
