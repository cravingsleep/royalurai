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

        // always place a new chit if we can
        if (moves.canMoveAwaitingChit) {
            return 'new';
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

export default CreatorStrategy;
