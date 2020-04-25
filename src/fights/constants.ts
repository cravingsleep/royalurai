import Game from '../types/game';

/**
 * The state of a Ur board before anything has
 * happened.
 */
export const startingGameState: Game = {
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
};
