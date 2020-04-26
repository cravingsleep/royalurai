import Game from '../types/game';
import Move, { Roll } from '../types/move';
import Team from '../types/team';

/**
 * Represents the abstract class of someone who has a
 * strategy in Ur.
 */
abstract class Player {
    constructor(
        protected readonly team: Team
    ) { }

    /**
     * Called by the strategy pitter. Given a game and a roll decide how to move.
     */
    abstract move(game: Game, roll: Roll): Move;
}

export default Player;
