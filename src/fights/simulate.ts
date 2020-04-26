import { pit } from './pit';
import Player from '../strategies/player';
import { range } from '../util';
import Team from '../types/team';

interface Winnings {
    player1Wins: number;
    player2Wins: number;
}

export function simulate<T extends Player>(
    Player1: new (team: Team) => T,
    Player2: new (team: Team) => T,
    iterations: number
): Winnings {
    return range(iterations).reduce((acc, _, index) => {
        const isPlayer1White = index % 2 === 0;

        const pitting = isPlayer1White ? pit(Player1, Player2) : pit(Player2, Player1);

        const didPlayerOneWin = isPlayer1White && pitting === Team.WHITE
            || (!isPlayer1White && pitting === Team.BLACK);

        return Object.assign(
            {},
            acc,
            {
                player1Wins: didPlayerOneWin ? acc.player1Wins + 1 : acc.player1Wins,
                player2Wins: didPlayerOneWin ? acc.player2Wins : acc.player2Wins + 1
            }
        );
    }, {
        player1Wins: 0,
        player2Wins: 0
    });
}
