import Game from '../types/game';
import Team from '../types/team';
import Move, { Roll } from '../types/move';

abstract class StrategyError {
    /**
     * A helpful message when reporting.
     */
    protected message: string;

    constructor(
        protected readonly game: Game,
        protected readonly side: Team,
        protected readonly move: Move,
        protected readonly roll: Roll
    ) { }

    toString(): string {
        return JSON.stringify(this, null, 2);
    }
}

export class PlaceNewChitError extends StrategyError {
    constructor(game: Game, side: Team, roll: Roll) {
        super(game, side, 'new', roll);

        this.message = 'A new chit tried to be placed but no awaiting chits are available.';
    }
}

export class ChitDoesNotExistError extends StrategyError {
    constructor(game: Game, side: Team, move: Move, roll: Roll) {
        super(game, side, move, roll);

        this.message = 'A chit that does not exist was instructed to move.';
    }
}

export class InvalidGameState extends StrategyError {
    constructor(game: Game, side: Team, move: Move, roll: Roll) {
        super(game, side, move, roll);

        this.message = 'A move has resulted in an invalid game state.';
    }
}
