import Game from '../types/game';

/**
 * The state of a Ur board before anything has
 * happened.
 */
export const getStartingGameState = (): Game => ({
    white: {
        chitsCompleted: 0,
        chitsAwaiting: 7,
        chitPositions: []
    },
    black: {
        chitsCompleted: 0,
        chitsAwaiting: 7,
        chitPositions: []
    }
});

/**
 * The positions of the flowers on the board.
 */
export const flowerPositions = [4, 8, 14];

/**
 * The position of the safe space on the board.
 */
export const safeSpace = 8;
