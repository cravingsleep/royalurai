import Player from './player';
import Game from '../types/game';
import Move, { Roll } from '../types/move';
import { getMoveableChits } from '../validators/validators';

/**
 * Plays a strategy of always moving the furthest chit.
 */
class FurthestStrategy extends Player {
    move(game: Game, roll: Roll): Move {
        const moves = getMoveableChits(game, roll, this.team);

        // if the only thing we can do is place a new chit then do it
        if (moves.canMoveAwaitingChit && moves.chitPositions.length === 0) {
            return 'new';
        }

        const sortedPositions = moves.chitPositions.sort((a, b) => a - b);

        return sortedPositions[sortedPositions.length - 1];
    }
}

export default FurthestStrategy;
