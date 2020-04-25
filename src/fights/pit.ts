import Player from '../strategies/player';
import Team from '../types/team';
import Move, { Roll } from '../types/move';
import Game from '../types/game';
import { gameEnded, getWinningSide } from '../validators/validators';
import { startingGameState } from './constants';
import { randomUrRoll } from '../util';

/**
 * Returns a new board once the move has happened.
 * 
 * TODO this mutates which is gross but I do not have a better way to
 * change it when there is so much `if` around the team :/
 */
function changeBoard(game: Game, team: Team, move: Move, roll: Roll): Game {
    /**
     * Is the mover the white colour.
     */
    const isWhite = team === Team.WHITE;

    /**
     * The team belonging to the player moving.
     */
    const ownTeam = isWhite ? game.white : game.black;

    /**
     * The team that does not belong to the player moving.
     */
    const notOwnTeam = !isWhite ? game.white : game.black;

    /**
     * The chits of the player who has moved.
     */
    const ownChits = ownTeam.chitPositions;

    /**
     * The chits of the player who has not just moved.
     */
    const notOwnChits = notOwnTeam.chitPositions;

    // handle placing a new chit down
    if (move === 'new') {
        ownChits.push(roll);

        ownTeam.chitsAwaiting -= 1;

        return game;
    }

    // they have a chit out
    if (move + roll === 15) {
        const nextOwnChits = ownChits
            .filter(position => position !== move);

        ownTeam.chitPositions = nextOwnChits;
        ownTeam.chitsCompleted += 1;

        return game;
    }

    /**
     * Does the chit hit an opponent chit when it moves.
     */
    const chitHitsOpponent = notOwnChits.find(position => position === move + roll);

    /**
     * The chit gets removed from its current place and placed in the next place.
     */
    const nextOwnChits = ownChits
        .filter(position => position !== move)
        .concat(move + roll);

    if (chitHitsOpponent) {
        /**
         * Remove the other chit it landed on
         */
        const nextNotOwnChits = notOwnChits
            .filter(position => position !== move);

        /**
         * Up the awaiting chits
         */
        notOwnTeam.chitPositions = nextNotOwnChits;
        notOwnTeam.chitsAwaiting += 1;
    }

    ownTeam.chitPositions = nextOwnChits;

    return game;
}

/**
 * Pits two strategies against each other and returns the winner.
 *
 * @param white - the white strategy
 * @param black - the black strategy
 */
export function pit<T extends Player>(WhiteCons: new (team: Team) => T, BlackCons: new (team: Team) => T): Team {
    /**
     * Make both teams.
     */
    const white = new WhiteCons(Team.WHITE);
    const black = new BlackCons(Team.BLACK);

    /**
     * The game being tracked.
     */
    let game = startingGameState;

    /**
     * Which side is moving right now.
     */
    let sidePlaying = Team.WHITE;

    /**
     * Keep going until the game ends.
     */
    while (!gameEnded(game)) {
        /**
         * The moving player.
         */
        const movingPlayer = sidePlaying === Team.WHITE ? white : black;

        /**
         * What the player rolled.
         */
        const rolled = randomUrRoll();

        /**
         * If it was 0 then they have to miss a go without moving.
         */
        if (rolled === 0) {
            continue;
        }

        /**
         * The move performed by the strategy.
         */
        const move = movingPlayer.move(game, rolled);

        /**
         * Alter the game board based on the move.
         */
        game = changeBoard(game, sidePlaying, move, rolled);

        /**
         * Switch the side playing.
         */
        sidePlaying = sidePlaying === Team.WHITE ? Team.BLACK : Team.WHITE;

    }

    const winningSide = getWinningSide(game);

    if (winningSide === null) {
        throw new Error('The game ended but no one won.');
    }

    return winningSide;
}
