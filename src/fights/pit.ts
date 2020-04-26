import Player from '../strategies/player';
import Team from '../types/team';
import Move, { Roll } from '../types/move';
import Game from '../types/game';
import { gameEnded, getWinningSide, getMoveableChits } from '../validators/validators';
import { getStartingGameState, flowerPositions } from './constants';
import { randomUrRoll } from '../util';
import { PlaceNewChitError, ChitDoesNotExistError } from './errors';

/**
 * Combines the new game state and who plays next.
 */
interface GameAndSide {
    game: Game;
    sideToPlay: Team;
}

/**
 * Helper for switching the team.
 */
function not(team: Team): Team {
    return team === Team.WHITE ? Team.BLACK : Team.WHITE;
}

/**
 * Returns a new board once the move has happened.
 * 
 * TODO this mutates which is gross but I do not have a better way to
 * change it when there is so much `if` around the team :/
 */
function changeBoard(
    game: Game,
    team: Team,
    move: Move,
    roll: Roll
): GameAndSide {
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
        // the player has tried to play a new chit when they have none in reserves.
        if (ownTeam.chitsAwaiting === 0) {
            throw (new PlaceNewChitError(game, team, roll).toString());
        }

        ownChits.push(roll);

        ownTeam.chitsAwaiting -= 1;

        return {
            game,
            sideToPlay: not(team)
        };
    }

    // no chit exists in the position the player wanted to move
    if (!ownChits.find(position => position === move)) {
        throw (new ChitDoesNotExistError(game, team, move, roll).toString());
    }

    // they have a chit out
    if (move + roll === 15) {
        const nextOwnChits = ownChits
            .filter(position => position !== move);

        ownTeam.chitPositions = nextOwnChits;
        ownTeam.chitsCompleted += 1;

        return {
            game,
            sideToPlay: not(team)
        };
    }

    /**
     * Does the chit hit an opponent chit when it moves.
     */
    const chitHitsOpponent = notOwnChits.find(position =>
        position === move + roll
        && position > 4 // garrisons
        && position < 13 // on the way out
    );

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

    const landedOnFlower = flowerPositions.includes(move + roll);

    return {
        game,
        sideToPlay: landedOnFlower ? team : not(team)
    };
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
    let game = getStartingGameState();

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
            /**
             * Switch the side playing.
             */
            sidePlaying = sidePlaying === Team.WHITE ? Team.BLACK : Team.WHITE;

            continue;
        }

        /**
         * Get the available moves for the player with their roll.
         */
        const moves = getMoveableChits(game, rolled, sidePlaying);

        /**
         * Can they make any moves at all.
         */
        const canPlayerMakeAnyMoves = moves.chitPositions.length > 0 || moves.canMoveAwaitingChit;

        /**
         * If the player cannot make any moves then skip their go.
         */
        if (!canPlayerMakeAnyMoves) {
            /**
             * Switch the side playing.
             */
            sidePlaying = sidePlaying === Team.WHITE ? Team.BLACK : Team.WHITE;

            continue;
        }

        /**
         * The move performed by the strategy.
         */
        const move = movingPlayer.move(game, rolled);

        /**
         * Alter the game board based on the move.
         */
        const nextBoardState = changeBoard(game, sidePlaying, move, rolled);

        /**
         * Set the next state.
         */
        game = nextBoardState.game;
        sidePlaying = nextBoardState.sideToPlay;
    }

    const winningSide = getWinningSide(game);

    if (winningSide === null) {
        throw new Error('The game ended but no one won.');
    }

    return winningSide;
}
