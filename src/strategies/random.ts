import Player from './player';
import Game from '../types/game';
import Move, { Roll } from '../types/move';
import { getMoveableChits } from '../validators/validators';
import { randChoice } from '../util';

/**
 * Plays a strategy of moving a random chit every time.
 */
class RandomStrategy extends Player {
    move(game: Game, roll: Roll): Move {
        const moves = getMoveableChits(game, roll, this.team);

        const movesAddPlaceNewOne = moves.chitPositions.concat(-1);

        const randomMove = randChoice(movesAddPlaceNewOne);

        if (randomMove === -1) {
            return 'new';
        }

        return randomMove;
    }
}

export default RandomStrategy;