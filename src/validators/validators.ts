import Game from '../types/game';
import { Roll } from '../types/move';
import Team from '../types/team';

interface ValidMoves {
    chitPositions: number[];
    canMoveAwaitingChit: boolean;
}

export function getMoveableChits(
    game: Game,
    roll: Roll,
    team: Team
): ValidMoves {
    // grab the chit positions
    const blackChitPositions = game.black.chitPositions;
    const whiteChitPositions = game.white.chitPositions;

    /**
     * The team belonging to the mover.
     */
    const ownTeam = team === Team.WHITE ? game.white : game.black;

    /**
     * Grab the strategy callers chits.
     */
    const ownTeamChits = team === Team.WHITE ? whiteChitPositions : blackChitPositions;

    /**
     * Can we move an awaiting chit onto the board.
     */
    const canMoveAwaitingChit = ownTeam.chitsAwaiting > 0 && !ownTeamChits.find(position => position === roll);

    /**
     * The position of all the chits that can make valid moves.
     */
    const moveableChits = ownTeamChits.filter(position => {
        /**
         * Where the chit ends up if we move it.
         */
        const potentialPosition = position + roll;

        /**
         * If can get to finish then it is valid, the last off point is 15
         * and it needs an exact roll.
         */
        if (potentialPosition === 15) {
            return true;
        }

        /**
         * If the chit would go over the board and not exit with the right amount of
         * moves then it cannot be moved.
         */
        if (potentialPosition > 15) {
            return false;
        }

        /**
         * Will it hit one of its own chits
         */
        const hitsOwn = ownTeamChits.find(position => position === potentialPosition);

        return !hitsOwn;
    });

    return {
        chitPositions: moveableChits,
        canMoveAwaitingChit
    };
}

export function getChitsWhichCanTake(game: Game, roll: Roll, team: Team): number[] {
    /**
     * Grab the moveable chits.
     */
    const moveableChits = getMoveableChits(game, roll, team).chitPositions;

    /**
     * Grab the chits that are not the strategy owners.
     */
    const notOwnChits = team === Team.WHITE ? game.black.chitPositions : game.white.chitPositions;

    return moveableChits.filter(position => {
        const willHitOpponent = notOwnChits.find(enemyPosition => enemyPosition === position + roll);

        return willHitOpponent;
    });
}

/**
 * Returns whether the game has ended or not.
 */
export function gameEnded(game: Game): boolean {
    return game.white.chitsCompleted === 7 || game.black.chitsCompleted === 7;
}


/**
 * Returns the winnig side of the game, `null` if no one has won.
 */
export function getWinningSide(game: Game): Team | null {
    if (game.white.chitsCompleted === 7) {
        return Team.WHITE;
    }

    if (game.black.chitsCompleted === 7) {
        return Team.BLACK;
    }

    return null;
}


/**
 * Forces a type check on a roll.
 */
export function isValidRoll(roll: number): roll is Roll {
    return roll === 1 || roll === 2 || roll === 3 || roll == 4;
}
