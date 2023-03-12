import React, { useEffect, useState } from 'react';

import { ChallengeDate, randomDateWithinBounds } from '../utilities/randomDate';
import { fetch, store } from '../utilities/storage';
import { AppDate, WeekDay } from '../utilities/date';

import ChallengeSetup from './ChallengeSetup';
import Challenge from './Challenge';
import AnswerInput from './AnswerInput';
import Result from './Result';

const STRG_CURRENT_CHALLENGE = 'current-challenge';
const STRG_LOWER_DATE = 'lower-date';
const STRG_UPPER_DATE = 'upper-date';
const STRG_ANSWER = 'answer';

export default (): React.ReactElement => {
    const [ lowerDate, setLowerDate ] = useState(fetch<AppDate>(STRG_LOWER_DATE, { day: 1, month: 1, year: 1950 }));
    const [ upperDate, setUpperDate ] = useState(fetch<AppDate>(STRG_UPPER_DATE, { day: 31, month: 12, year: 2050 }));

    const getChallengeDate = () => randomDateWithinBounds({ start: lowerDate, end: upperDate });

    const [ challenge, setChallenge ] = useState(fetch<ChallengeDate>(STRG_CURRENT_CHALLENGE, getChallengeDate()));
    const [ answer, setAnswer ] = useState(fetch<WeekDay | null>(STRG_ANSWER));

    useEffect(() => {
        store(STRG_CURRENT_CHALLENGE, challenge);
        setAnswer(null);
    }, [ challenge ]);
    useEffect(() => {
        store(STRG_LOWER_DATE, lowerDate);
    }, [ lowerDate ]);
    useEffect(() => {
        store(STRG_UPPER_DATE, upperDate);
    }, [ upperDate ]);
    useEffect(() => {
        store(STRG_ANSWER, answer);
    }, [ answer ]);

    return (
        <div className="w-full p-4 pt-8 text-gray-100">
            <div className="max-w-2xl mx-auto">
                <ChallengeSetup
                    lowerDate={ lowerDate }
                    upperDate={ upperDate }
                    onInput={ (lowerDate, upperDate) => {
                        setLowerDate(lowerDate);
                        setUpperDate(upperDate);
                    } }
                />
                <div className="mt-8">
                    <Challenge challenge={ challenge } refresh={ () => setChallenge(getChallengeDate()) }/>
                </div>
                <div className="mt-8">
                    <AnswerInput challenge={ challenge } onSelect={ w => {
                        setAnswer(w)
                    } }/>
                </div>
                {
                    answer !== null
                        ? <div className="mt-8">
                            <Result challenge={ challenge } answer={ answer }/>
                        </div>
                        : null
                }
            </div>
        </div>
    )
}
