import { Roll } from './types/move';

function rand(min: number, max: number): number { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function range(upto: number): number[] {
    return [...Array(upto).keys()];
}

export function randChoice<T>(arr: T[]): T {
    return arr[rand(0, arr.length - 1)];
}

/**
 * A random roll of 4 pyramids with two sides marked and two sides not.
 * 
 * So each pyramid has a 50% chance of showing a pip.
 */
export function randomUrRoll(): 0 | Roll {
    const roll = [Math.random() > 0.5, Math.random() > 0.5, Math.random() > 0.5, Math.random() > 0.5]
        .filter(Boolean)
        .length;

    if (roll !== 0 && roll !== 1 && roll !== 2 && roll !== 3 && roll !== 4) {
        throw new Error('randomUrRoll did not go right');
    }

    return roll;
}
// function randFloat(min: number, max: number): number {
//     return Math.random() < 0.5 ? ((1 - Math.random()) * (max - min) + min) : (Math.random() * (max - min) + min);
// }
