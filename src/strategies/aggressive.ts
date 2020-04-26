import Player from './player';
import Game from '../types/game';
import Move, { Roll } from '../types/move';
import { getMoveableChits, getChitsWhichCanTake } from '../validators/validators';
import { randChoice } from '../util';

/**
 * Plays a random strategy excepts it always takes when it can.
 */
class AggressiveStrategy extends Player {
    move(game: Game, roll: Roll): Move {
        const moves = getMoveableChits(game, roll, this.team);
        const attackingMoves = getChitsWhichCanTake(game, roll, this.team);

        if (attackingMoves.length > 0) {
            return randChoice(attackingMoves);
        }

        // if the only thing we can do is place a new chit then do it
        if (moves.canMoveAwaitingChit && moves.chitPositions.length === 0) {
            return 'new';
        }

        // if we can place a moving chit and move an existent one randomise it
        if (moves.canMoveAwaitingChit && moves.chitPositions.length > 0) {
            const movesAddPlaceNewOne = moves.chitPositions.concat(-1);

            const randomMove = randChoice(movesAddPlaceNewOne);

            return randomMove === -1 ? 'new' : randomMove;
        }

        // otherwise move a random chit on the board
        return randChoice(moves.chitPositions);
    }
}

export default AggressiveStrategy;
