import React, { PropsWithChildren, ReactElement, useEffect, useState } from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

import { ChallengeDate } from '../utilities/randomDate';
import { daysInMonth, WeekDay } from '../utilities/date';

type CalculationProps = {
    answer: WeekDay;
    challenge: ChallengeDate;
}

export default ({ answer, challenge }: CalculationProps): ReactElement => {
    const { el: step1, value: previous1 } = getStepOne(challenge);
    const { el: step2, value: previous2 } = getStepTwo(challenge, previous1);
    const { el: step3, value: previous3 } = getStepThree(challenge, previous2);
    const { el: step4, value: previous4 } = getStepFour(challenge, previous3);
    const { el: step5, value: previous5 } = getStepFive(challenge, previous4);
    const { el: step6, value: previous6 } = getStepSix(challenge, previous5);
    const { el: step7, value: previous7 } = getStepSeven(challenge, previous6);
    const { el: step8, value: previous8 } = getStepEight(challenge, previous7);
    const { el: step9, value: previous9 } = getStepNine(challenge, previous8);

    const [ showCalculation, setShowCalculation ] = useState(challenge.weekDay === answer);

    return <div>
        <button
            onClick={ () => setShowCalculation(!showCalculation) }
            className="w-full rounded-md bg-white/10 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
        >
            { showCalculation ? 'Hide' : 'Show' } Calculation
        </button>
        <div className={ `mt-4 flex flex-col gap-2 ${ showCalculation ? 'block' : 'hidden' }` }>
            { step1 }
            { step2 }
            { step3 }
            { step4 }
            { step5 }
            { step6 }
            { step7 }
            { step8 }
            { step9 }
        </div>
    </div>
}

type CalculationStepProps = PropsWithChildren<{
    value: number;
    stepNumber: number;
}>

const CalculationStep = ({ children, stepNumber, value }: CalculationStepProps): ReactElement => {
    return <div className="flex items-start p-4 bg-black/30 rounded-lg justify-stretch gap-4">
        <div className="flex-grow-0 font-mono">{ stepNumber }</div>
        <div className="flex-grow">{ children }</div>
        <div className="flex-grow-0 font-mono tracking-wider text-2xl">{ value }</div>
    </div>;
}

type StepOutput = {
    el: ReactElement;
    value: number;
}


const getStepOne = ({ year }: ChallengeDate): StepOutput => {
    const value = year % 100;

    const yearString = year.toString();

    const emphasized = <>
        { yearString.substring(0, yearString.length - 2) }<MonoEmph>{ yearString.substring(yearString.length - 2) }</MonoEmph>
    </>;

    return {
        el: <CalculationStep value={ value } stepNumber={ 1 }>
            Take the last two digits of the year:<br/><br/>
            { emphasized }
        </CalculationStep>,
        value,
    }
}

const getStepTwo = (_: ChallengeDate, previousValue: number): StepOutput => {
    const value = Math.floor(previousValue / 4);

    return {
        el: <CalculationStep value={ value } stepNumber={ 2 }>
            Divide by <Mono>4</Mono> and discard any remainder:<br/><br/>
            <Mono>{ previousValue }</Mono> / <Mono>4</Mono> = <MonoEmph>{ value }</MonoEmph>
        </CalculationStep>,
        value,
    }
}

const getStepThree = ({ day }: ChallengeDate, previousValue: number): StepOutput => {
    const value = previousValue + day;

    return {
        el: <CalculationStep value={ value } stepNumber={ 3 }>
            Add the day of the month:<br/><br/>
            <Mono>{ previousValue }</Mono> + <MonoEmph>{ day }</MonoEmph> = <MonoEmph>{ value }</MonoEmph>
        </CalculationStep>,
        value,
    }
}

const getStepFour = ({ month }: ChallengeDate, previousValue: number): StepOutput => {
    const monthValues = [ 1, 4, 4, 0, 2, 5, 0, 3, 6, 1, 4, 6 ] as const;
    const monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

    const value = previousValue + monthValues[month - 1];

    return {
        el: <CalculationStep value={ value } stepNumber={ 4 }>
            Add the constant value depending on the month:<br/><br/>
            <div className="grid grid-cols-3 gap-2 w-full">
                {
                    monthNames.filter(i => i !== undefined).map((name, idx) => (
                        <div key={ idx }
                             className={ `${ Number(idx) === (month - 1) ? 'bg-green-700' : 'bg-white/10' } flex justify-between py-0.5 px-3 bg-white/10 rounded` }>{ name }: <Mono>{ monthValues[idx] }</Mono>
                        </div>
                    ))
                }
            </div>
            <br/>
            <Mono>{ previousValue }</Mono> + <MonoEmph>{ monthValues[month - 1] }</MonoEmph> ({ monthNames[month - 1] })
            = <MonoEmph>{ value }</MonoEmph>
        </CalculationStep>,
        value,
    }
}

const getStepFive = ({ month, year }: ChallengeDate, previousValue: number): StepOutput => {
    const mutationApplies = month <= 2 && daysInMonth(year, 1) > 28;

    const value = previousValue - (mutationApplies ? 1 : 0);

    const icon = mutationApplies
        ? <CheckCircleIcon className="w-5 text-green-500 inline-block"/>
        : <XCircleIcon className="w-5 text-red-500 inline-block"/>

    return {
        el: <CalculationStep value={ value } stepNumber={ 5 }>
            Subtract 1 for <Emph>january</Emph> or <Emph>february</Emph> of a leap year:<br/><br/>
            <span className="inline-block rounded bg-black/70 py-1 px-3 text-sm">
                { icon } { mutationApplies ? 'Applies' : 'Does not apply' }
            </span>
            {
                mutationApplies
                    ? <>
                        <br/><br/>
                        <Mono>{ previousValue }</Mono> - <MonoEmph>1</MonoEmph> = <MonoEmph>{ value }</MonoEmph>
                    </>
                    : null

            }
        </CalculationStep>,
        value,
    }
}

const getStepSix = ({ year }: ChallengeDate, previousValue: number): StepOutput => {
    const yearlyMutations = {
        [1700]: 4,
        [1800]: 2,
        [1900]: 0,
        [2000]: 6,
    };

    const century = Math.floor(year / 100) * 100;
    const change = yearlyMutations[century] || 0;

    const value = previousValue + change;

    return {
        el: <CalculationStep value={ value } stepNumber={ 6 }>
            Add the constant value depending on the century:<br/><br/>
            <div className="grid grid-cols-2 gap-2 w-full">
                {
                    Object.keys(yearlyMutations).map((year) => (
                        <div key={ year }
                             className={ `${ Number(year) === century ? 'bg-green-700' : 'bg-white/10' } flex justify-between py-0.5 px-3 bg-white/10 rounded` }>{ year }: <Mono>{ yearlyMutations[year] }</Mono>
                        </div>
                    ))
                }
            </div>
            <br/>
            <Mono>{ previousValue }</Mono> + <MonoEmph>{ change }</MonoEmph> ({ century }'s)
            = <MonoEmph>{ value }</MonoEmph>
        </CalculationStep>,
        value,
    }
}

const getStepSeven = ({ year }: ChallengeDate, previousValue: number): StepOutput => {
    const yearMod = year % 100;

    const value = previousValue + yearMod;

    return {
        el: <CalculationStep value={ value } stepNumber={ 7 }>
            Add the last two digits of the year:<br/><br/>
            <Mono>{ previousValue }</Mono> + <MonoEmph><NumPad value={ yearMod }
                                                               length={ 2 }/></MonoEmph> = <MonoEmph>{ value }</MonoEmph>
        </CalculationStep>,
        value,
    }
}

const getStepEight = (_: ChallengeDate, previousValue: number): StepOutput => {
    const factor = Math.floor(previousValue / 7);
    const dayOfTheWeek = previousValue % 7;

    const value = dayOfTheWeek;

    return {
        el: <CalculationStep value={ value } stepNumber={ 8 }>
            Divide by 7 and take the remainder:<br/><br/>
            <Mono>{ previousValue }</Mono> % <Mono>7</Mono> = <MonoEmph>{ value }</MonoEmph><br/><br/>
            (<Mono>{ factor }</Mono> &times; { ' ' }
            <Mono>7</Mono> = <Mono>{ factor * 7 }</Mono> + <MonoEmph>{ value }</MonoEmph> = <Mono>{ previousValue }</Mono>)
        </CalculationStep>,
        value,
    }
}

const getStepNine = (_: ChallengeDate, previousValue: number): StepOutput => {
    const daysOfTheWeek = {
        [WeekDay.Monday]: 'Monday',
        [WeekDay.Tuesday]: 'Tuesday',
        [WeekDay.Wednesday]: 'Wednesday',
        [WeekDay.Thursday]: 'Thursday',
        [WeekDay.Friday]: 'Friday',
        [WeekDay.Saturday]: 'Saturday',
        [WeekDay.Sunday]: 'Sunday',
    };

    const value = previousValue;

    return {
        el: <CalculationStep value={ value } stepNumber={ 9 }>
            Determine the date of the week by its index:<br/><br/>
            <div className="grid grid-cols-2 gap-2 w-full">
                {
                    Object.keys(daysOfTheWeek).map((dow) => (
                        <div key={ dow }
                             className={ `${ Number(dow) === value ? 'bg-green-700' : 'bg-white/10' } flex justify-start gap-2 py-0.5 px-3 rounded` }>{ dow }: <Mono>{ daysOfTheWeek[dow] }</Mono>
                        </div>
                    ))
                }
            </div>
        </CalculationStep>,
        value,
    }
}

const Mono = ({ children }: PropsWithChildren): ReactElement => (
    <span className="font-mono">{ children }</span>
)

const Emph = ({ children }: PropsWithChildren): ReactElement => (
    <span className="underline">{ children }</span>
)

const MonoEmph = ({ children }: PropsWithChildren): ReactElement => (
    <Mono><Emph>{ children }</Emph></Mono>
)

const NumPad = ({ value, length }: { value: number, length: number }): ReactElement => (
    <>{ value.toString().padStart(length, '0') }</>
)
