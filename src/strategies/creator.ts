import Player from './player';
import Game from '../types/game';
import Move, { Roll } from '../types/move';
import { getMoveableChits } from '../validators/validators';
import { randChoice } from '../util';

/**
 * Plays a random strategy excepts it always moves a new awaiting
 * chit on if it can.
 */
class CreatorStrategy extends Player {
    move(game: Game, roll: Roll): Move {
        const moves = getMoveableChits(game, roll, this.team);

        // If we can place a new chit, place a new one.
        if (moves.canMoveAwaitingChit) {
            return 'new';
        }

        // Otherwise move a random one.
        return randChoice(moves.chitPositions);
    }
}

export default CreatorStrategy;
