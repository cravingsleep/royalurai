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

        if (moves.chitPositions.length === 0 && !moves.canMoveAwaitingChit) {
            return 'nothing';
        }

        if (attackingMoves.length > 0) {
            const randomAttack = randChoice(attackingMoves);

            return randomAttack;
        }

        // If we can place a new chit, place a new one.
        if (moves.canMoveAwaitingChit) {
            return 'new';
        }

        // Otherwise move a random one.
        return randChoice(moves.chitPositions);
    }
}

export default AggressiveStrategy;
